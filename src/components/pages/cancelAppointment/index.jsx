import React from 'react';

export default function PaymentCancelled({ appointmentDetails, reason = 'cancelled' }) {
  // Default data
  const data = appointmentDetails || {
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    date: 'Monday, February 17, 2026',
    time: '10:30 AM',
    appointmentType: 'online',
    amount: '$150'
  };

  // Determine if payment failed or was cancelled
  const isFailed = reason === 'failed';
  const title = isFailed ? 'Payment Failed' : 'Payment Cancelled';
  const message = isFailed 
    ? 'Unfortunately, your payment could not be processed' 
    : 'You cancelled the payment process';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-red-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Status</p>
                <p className="text-white text-lg font-semibold">Payment Not Completed</p>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded text-white text-sm font-medium">
                {isFailed ? 'Failed' : 'Cancelled'}
              </span>
            </div>
          </div>

          {/* What Happened */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              What Happened?
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">
                    {isFailed ? 'Payment Processing Error' : 'Payment Was Cancelled'}
                  </p>
                  <p className="text-sm text-red-700">
                    {isFailed 
                      ? 'Your payment could not be processed. This might be due to insufficient funds, incorrect card details, or your bank declining the transaction.'
                      : 'You have cancelled the payment process. Your appointment was not booked and no charges were made to your account.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Details That Failed */}
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Appointment Details
            </h3>

            <div className="space-y-4">
              {/* Doctor */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl mr-3">
                  👨‍⚕️
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Doctor</p>
                  <p className="text-base font-semibold text-gray-900">{data.doctorName}</p>
                  <p className="text-sm text-gray-600">{data.doctorSpecialty}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                    📅
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="text-base font-semibold text-gray-900">{data.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                    ⏰
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Time</p>
                    <p className="text-base font-semibold text-gray-900">{data.time}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                  💳
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Amount</p>
                  <p className="text-base font-semibold text-gray-900">{data.amount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                What Can You Do?
              </h3>
              
              <ul className="space-y-2 text-sm text-gray-700">
                {isFailed ? (
                  <>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">1.</span>
                      <span>Check your card details and make sure you have sufficient funds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">2.</span>
                      <span>Try using a different payment method or card</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">3.</span>
                      <span>Contact your bank if the problem persists</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">4.</span>
                      <span>Contact our support team for assistance</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">1.</span>
                      <span>You can try booking the appointment again</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">2.</span>
                      <span>Choose a different time slot if this one doesn't work for you</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">3.</span>
                      <span>Contact support if you need help with booking</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.location.href = '/book-appointment'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">No Charges Were Made</p>
              <p className="text-sm text-gray-700">
                Your card was not charged. You can safely try again or contact support if you need assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Need Help? Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}