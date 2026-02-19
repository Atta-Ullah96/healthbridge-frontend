import { useState } from 'react';
import { useGetAvailableSlotsQuery, useGetDoctorAvailabilityQuery } from '../../api/doctorApi';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCurrentPatientQuery, useRegisterPatientMutation } from '../../api/patientApi';
import { useCreateAppointmentMutation } from '../../api/appointmentApi';

export default function BookAppointment() {
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;
  console.log(formattedDate);

  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''

  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { id: doctorId } = useParams()
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { data: availabilityData } = useGetDoctorAvailabilityQuery(doctorId)
  const availableDays =
    availabilityData?.data?.days
      ?.filter(day => day.isAvailable && day.timeSlots.length > 0)
      ?.map(day => day.day) || [];
  const { data: availableSlots } =
    useGetAvailableSlotsQuery(
      formattedDate
        ? { doctorId, date: formattedDate }
        : skipToken
    );

  const [registerPatient] = useRegisterPatientMutation();
  const [createAppointment] = useCreateAppointmentMutation();
  const { data, isLoading } = useGetCurrentPatientQuery();
  const patient = data?.patient;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      // 1️⃣ Register patient (or login if exists backend handles)
      if (!patient) {
        await registerPatient({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }).unwrap();
      }


      // 2️⃣ Create appointment + Stripe session
      const response = await createAppointment({
        doctorId,
        slotId: selectedTime,
        appointmentType,
        selectedDate

      }).unwrap();

      // 3️⃣ Redirect to Stripe
      window.location.href = response.checkoutUrl;

    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Something went wrong");
    }
  };


  const isFormValid = () => {
    if(patient){

      return appointmentType && selectedDate && selectedTime 
    }else{
      return appointmentType && selectedDate && selectedTime &&
      formData.fullName && formData.email && formData.phone;
    }
  };



  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Book an Appointment</h1>
          <p style={styles.subtitle}>Fill in the details below to schedule your consultation</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.content}>
            {/* Left Column */}
            <div style={styles.leftColumn}>
              {/* Appointment Type */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Consultation Type</h2>
                <div style={styles.typeContainer}>
                  <div
                    onClick={() => setAppointmentType('online')}
                    style={{
                      ...styles.typeOption,
                      ...(appointmentType === 'online' ? styles.typeOptionActive : {})
                    }}
                  >
                    <div style={styles.typeIconWrapper}>
                      <span style={styles.typeEmoji}>💻</span>
                    </div>
                    <div>
                      <div style={styles.typeTitle}>Online</div>
                      <div style={styles.typeDesc}>Video consultation</div>
                    </div>
                    <div style={styles.radioOuter}>
                      {appointmentType === 'online' && <div style={styles.radioInner}></div>}
                    </div>
                  </div>

                  <div
                    onClick={() => setAppointmentType('physical')}
                    style={{
                      ...styles.typeOption,
                      ...(appointmentType === 'physical' ? styles.typeOptionActive : {})
                    }}
                  >
                    <div style={styles.typeIconWrapper}>
                      <span style={styles.typeEmoji}>🏥</span>
                    </div>
                    <div>
                      <div style={styles.typeTitle}>In-Person</div>
                      <div style={styles.typeDesc}>Visit clinic</div>
                    </div>
                    <div style={styles.radioOuter}>
                      {appointmentType === 'physical' && <div style={styles.radioInner}></div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Select Date</h2>
                <div style={styles.dateGrid}>
                  {getNextDays().map((date, idx) => {
                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "long"
                    });
                    const isAvailable = availableDays.includes(dayName);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isAvailable) return;
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        style={{
                          ...styles.dateCard,
                          ...(isSelected ? styles.dateCardActive : {}),
                          ...(!isAvailable
                            ? { opacity: 0.4, cursor: "not-allowed" }
                            : {}),
                        }}
                      >
                        <div style={styles.dateWeekday}>
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div style={styles.dateNumber}>{date.getDate()}</div>
                        <div style={styles.dateMonth}>
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div style={styles.section}>
                  <h2 style={styles.sectionTitle}>Select Time</h2>

                  <div style={styles.timeGrid}>
                    {availableSlots?.slots?.length === 0 && (
                      <p>No slots available</p>
                    )}

                    {availableSlots?.slots?.map((slot) => {
                      const isSelected = selectedTime === slot._id;

                      return (
                        <button
                          key={slot._id}
                          type="button"
                          onClick={() => setSelectedTime(slot._id)}
                          style={{
                            ...styles.timeSlot,
                            ...(isSelected ? styles.timeSlotActive : {})
                          }}
                        >
                          {slot.startTime} - {slot.endTime}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column */}
            <div style={styles.rightColumn}>
              {/* Patient Information */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Your Information</h2>
                {patient && (
                  <p style={{ marginBottom: "15px", color: "green" }}>
                    Booking as {patient.name}
                  </p>
                )}


                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="John Doe"
                    disabled={!!patient}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="john@example.com"
                    disabled={!!patient}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="+921111111111"
                    disabled={!!patient}
                  />
                </div>





              </div>

              {/* Summary Box */}
              {(appointmentType || selectedDate || selectedTime) && (
                <div style={styles.summaryBox}>
                  <h3 style={styles.summaryTitle}>Appointment Details</h3>
                  {appointmentType && (
                    <div style={styles.summaryRow}>
                      <span style={styles.summaryLabel}>Type:</span>
                      <span style={styles.summaryValue}>
                        {appointmentType === 'online' ? '💻 Online' : '🏥 In-Person'}
                      </span>
                    </div>
                  )}
                  {selectedDate && (
                    <div style={styles.summaryRow}>
                      <span style={styles.summaryLabel}>Date:</span>
                      <span style={styles.summaryValue}>
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  {selectedTime && (
                    <div style={styles.summaryRow}>
                      <span style={styles.summaryLabel}>Time:</span>
                      <span style={styles.summaryValue}>{selectedTime}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid()}
                style={{
                  ...styles.submitBtn,
                  ...(isFormValid() ? {} : styles.submitBtnDisabled)
                }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.successCheckmark}>✓</div>
            <h2 style={styles.successTitle}>Appointment Booked!</h2>
            <p style={styles.successText}>
              Your appointment has been confirmed for{' '}
              <strong>
                {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </strong>{' '}
              at <strong>{selectedTime}</strong>
            </p>
            <p style={styles.successSubtext}>
              A confirmation has been sent to {formData.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #ebf4f8 0%, #f7fbfd 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  mainTitle: {
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: '700',
    color: '#1a5a7d',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#5b8fa8',
  },
  form: {
    width: '100%',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(26, 90, 125, 0.08)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a5a7d',
    marginBottom: '16px',
  },
  typeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  typeOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    border: '2px solid #e0eef5',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: '#fafcfd',
  },
  typeOptionActive: {
    borderColor: '#3b82f6',
    background: '#eff6ff',
    transform: 'translateX(4px)',
  },
  typeIconWrapper: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #4a9fd8 0%, #3b82f6 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  typeEmoji: {
    fontSize: '24px',
  },
  typeTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a5a7d',
    marginBottom: '2px',
  },
  typeDesc: {
    fontSize: '13px',
    color: '#5b8fa8',
  },
  radioOuter: {
    width: '20px',
    height: '20px',
    border: '2px solid #cbd5e1',
    borderRadius: '50%',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioInner: {
    width: '10px',
    height: '10px',
    background: '#3b82f6',
    borderRadius: '50%',
  },
  dateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
    gap: '10px',
  },
  dateCard: {
    padding: '14px 10px',
    border: '2px solid #e0eef5',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'white',
  },
  dateCardActive: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderColor: '#3b82f6',
    color: 'white',
    transform: 'scale(1.05)',
  },
  dateWeekday: {
    fontSize: '11px',
    fontWeight: '600',
    marginBottom: '4px',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  dateNumber: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '2px',
  },
  dateMonth: {
    fontSize: '11px',
    opacity: 0.8,
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '8px',
  },
  timeSlot: {
    padding: '12px 8px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    background: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#334155',
    transition: 'all 0.2s ease',
  },
  timeSlotActive: {
    background: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white',
    transform: 'scale(1.05)',
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  summaryBox: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '12px',
    padding: '20px',
    border: '2px solid #bae6fd',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a5a7d',
    marginBottom: '16px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #bae6fd',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#5b8fa8',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: '14px',
    color: '#1a5a7d',
    fontWeight: '600',
    textAlign: 'right',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  submitBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
  },
  successCheckmark: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    color: 'white',
    margin: '0 auto 20px',
  },
  successTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a5a7d',
    marginBottom: '12px',
  },
  successText: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  successSubtext: {
    fontSize: '14px',
    color: '#64748b',
  },
};

// Add CSS for hover effects and responsive behavior
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  input:focus, textarea:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  
  button[type="button"]:hover:not(:disabled) {
    transform: scale(1.02);
  }
  
  button[type="submit"]:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
  }
  
  @media (max-width: 768px) {
    .content {
      grid-template-columns: 1fr !important;
    }
  }
  
  @media (max-width: 480px) {
    .dateGrid {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important;
    }
    
    .timeGrid {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) !important;
    }
  }
`;
document.head.appendChild(styleSheet);