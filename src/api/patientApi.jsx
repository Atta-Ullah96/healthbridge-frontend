import { baseApi } from "./baseApi";


export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerPatient: builder.mutation({
      query: (patientData) => ({
        url: "/patient/register",
        method: "POST",
        body: patientData,
      }),
      invalidatesTags: ["Patient"],
    }),
    getCurrentPatient: builder.query({
      query: () => "/patient/me",
      providesTags: ["Patient"],
    }),

    bookAppointment: builder.mutation({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointment'],
    }),

    getMyAppointments: builder.query({
      query: () => '/appointments/my',
      providesTags: ['Appointment'],
    }),

    joinVideoCallByPatient: builder.mutation({
      query: (appointmentId) => ({
        url: `/patient/appointment/${appointmentId}/join-call`,
        method: "POST",
      }),
    }),

  }),
});

export const {
  useRegisterPatientMutation,
  useBookAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetCurrentPatientQuery,
  useJoinVideoCallByPatientMutation
} = patientApi;
