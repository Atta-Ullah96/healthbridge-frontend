import { baseApi } from "./baseApi";

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createAppointment: builder.mutation({
            query: ({ doctorId, slotId, appointmentType, selectedDate }) => ({
                url: `/appointment/create`,
                method: "POST",

                // ✅ Query Params
                params: {
                    doctorId,
                    slotId,
                },

                // ✅ Body
                body: {
                    appointmentType,
                    selectedDate
                },
            }),

            invalidatesTags: ["Appointment"],
        }),

        verifyAppointment: builder.query({
            query: (sessionId) => `/appointment/verify?sessionId=${sessionId}`,
        }),




        // ✅ Get All Appointments
        getDoctorAppointments: builder.query({
            query: () => ({
                url: "/doctor/appointments/all",
                method: "GET",
            }),
            providesTags: ["DoctorAppointments"],
        }),

        // ✅ Get Confirmed Appointments
        getDoctorConfirmedAppointments: builder.query({
            query: () => ({
                url: "/doctor/appointments/confirmed",
                method: "GET",
            }),
            providesTags: ["DoctorAppointments"],
        }),

        // ✅ Accept Appointment
        acceptAppointment: builder.mutation({
            query: (appointmentId) => ({
                url: `/doctor/appointments/${appointmentId}/accept`,
                method: "PATCH",
            }),
            invalidatesTags: ["DoctorAppointments"],
        }),

        // ✅ Reject Appointment
        rejectAppointment: builder.mutation({
            query: (appointmentId) => ({
                url: `/doctor/appointments/${appointmentId}/reject`,
                method: "PATCH",
            }),
            invalidatesTags: ["DoctorAppointments"],
        }),

        // ✅ Complete Appointment
        completeAppointment: builder.mutation({
            query: (appointmentId) => ({
                url: `/doctor/appointments/${appointmentId}/complete`,
                method: "PATCH",
            }),
            invalidatesTags: ["DoctorAppointments"],
        }),


          getPatientAppointments: builder.query({
            query: () => ({
                url: "/patient/get-appointment",
                method: "GET",
            }),
            providesTags: ["PatientAppointments"],
        }),

    })

})
export const {
    useCreateAppointmentMutation,
    useVerifyAppointmentQuery,
    useGetDoctorAppointmentsQuery,
    useGetDoctorConfirmedAppointmentsQuery,
    useAcceptAppointmentMutation,
    useRejectAppointmentMutation,
    useCompleteAppointmentMutation,
    useGetPatientAppointmentsQuery
} = appointmentApi;
