import { baseApi } from './baseApi';

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ✅ Register Doctor
        registerDoctor: builder.mutation({
            query: (doctorData) => ({
                url: '/doctor/register',
                method: 'POST',
                body: doctorData,
            }),
        }),

        // ✅ Login Doctor
        loginDoctor: builder.mutation({
            query: (credentials) => ({
                url: '/doctor/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // ✅ Logout Doctor
        logoutDoctor: builder.mutation({
            query: () => ({
                url: '/doctor/logout',
                method: 'POST',
            }),
            invalidatesTags: ["DoctorSignInSignUp"]
        }),

        getUser: builder.query({
            query: () => ({
                url: "/doctor/me",
                method: "GET",
            }),
            providesTags: ["DoctorSignInSignUp"],
        }),

        getAvailability: builder.query({
            query: () => ({
                url: "/doctor/availability",
                method: "GET",
            }),
            providesTags: ["Availability"],
        }),

        // 🔹 Create / Update availability
        saveAvailability: builder.mutation({
            query: (data) => ({
                url: "/doctor/availability",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Availability", "ProfileCompletion"],
        }),

        // 🔹 Delete availability (optional)
        deleteAvailability: builder.mutation({
            query: () => ({
                url: "/doctor/availability",
                method: "DELETE",
            }),
            invalidatesTags: ["Availability"],
        }),

        initiateUpload: builder.mutation({
            query: (data) => ({
                url: "/doctor/initiate/upload",
                method: "POST",
                body: data
            }),
        }),

        completeUpload: builder.mutation({
            query: (id) => ({
                url: "/doctor/complete/upload",
                method: "POST",
                body: id
            }),
            invalidatesTags: ["ProfileCompletion"],
        }),
        updateBasicInfo: builder.mutation({
            query: (body) => ({
                url: "/doctor/basic-info",
                method: "POST",
                body,
            }),
            invalidatesTags: ["DoctorBasicInfo", "ProfileCompletion"]
        }),


        getBasicInfo: builder.query({
            query: () => ({
                url: "/doctor/basic-info",
                method: "GET",
            }),
            providesTags: ["DoctorBasicInfo"],
        }),

        getProfileCompleted: builder.query({
            query: () => ({
                url: "/doctor/profile-complete",
                method: "GET",
            }),
            providesTags: ["ProfileCompletion"],
        }),

        getProfessionalDetails: builder.query({
            query: () => ({
                url: "/doctor/professional-details",
                method: "GET",
            }),
            providesTags: ["ProfessionalDetails"],
        }),

        // ✅ Create / Update Professional Details
        updateProfessionalDetails: builder.mutation({
            query: (data) => ({
                url: "/doctor/professional-details",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["ProfessionalDetails", "ProfileCompletion"],
        }),


        getProfileCompletion: builder.query({
            query: () => ({
                url: "/doctor/profile-completion",
                method: "GET",
            }),
            providesTags: ["ProfileCompletion"],
        }),

        getProfileSummary: builder.query({
            query: () => "/doctor/profile-summary",
            providesTags: ["ProfileSummary"],
        }),

        updateProfileSummary: builder.mutation({
            query: (data) => ({
                url: "/doctor/profile-summary",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["ProfileSummary", "ProfileCompletion"],
        }),

        getDocumentViewUrl: builder.query({
            query: (purpose) => `/doctor/view-url/${purpose}`,
        }),
        getDoctorDocuments: builder.query({
            query: () => "/doctor/uploads/documents",
        }),


        getConsultationSetup: builder.query({
            query: () => "/doctor/consultation",
            providesTags: ["ConsultationSetup"],
        }),
        upsertConsultationSetup: builder.mutation({
            query: (data) => ({
                url: "/doctor/consultation",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ConsultationSetup", "ProfileCompletion"],
        }),

        getLocation: builder.query({
            query: () => "/doctor/location",
            providesTags: ["Location"],
        }),
        updateLocation: builder.mutation({
            query: (data) => ({
                url: "/doctor/location",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Location", "ProfileCompletion"],
        }),
        getAllDoctors: builder.query({
            query: (filters) => ({
                url: "/doctor/doctors",
                params: filters,
            }),
        }),
        getDoctorProfile: builder.query({
            query: (doctorId) => `/doctor/profile/${doctorId}`,
            providesTags: (result, error, doctorId) => [{ type: "Doctors", id: doctorId }],
        }),

        getDoctorAvailability: builder.query({
            query: (doctorId) => `/doctor/availability/${doctorId}`,
            providesTags: ["Availability"],
        }),

        // ✅ Get Available Slots by Date
        getAvailableSlots: builder.query({
            query: ({ doctorId, date }) =>
                `/slot/get?doctorId=${doctorId}&date=${date}`,
            providesTags: ["Slots"],
        }),

        // ✅ Book Slot
        bookSlot: builder.mutation({
            query: (slotId) => ({
                url: `/slots/book`,
                method: "POST",
                body: { slotId },
            }),
            invalidatesTags: ["Slots"], // refetch slots after booking
        }),

        // ✅ Create or Update Availability (for doctor dashboard)
        createOrUpdateAvailability: builder.mutation({
            query: ({ doctorId, days }) => ({
                url: `/availability/${doctorId}`,
                method: "PUT",
                body: { days },
            }),
            invalidatesTags: ["Availability", "Slots"],
        }),

        joinVideoCallByDoctor: builder.mutation({
            query: (appointmentId) => ({
                url: `/doctor/appointment/${appointmentId}/join-call`,
                method: "POST",
            }),
        }),
        googleLogin: builder.mutation({
            query: (token) => ({
                url: '/doctor/auth/google',
                method: 'POST',
                body: { token }, // Sending the credential from Google
            }),
            invalidatesTags: ["DoctorSignInSignUp"]
        }),

    }),
});

export const {
    useRegisterDoctorMutation,
    useLoginDoctorMutation,
    useLogoutDoctorMutation,
    useSaveAvailabilityMutation,
    useDeleteAvailabilityMutation,
    useInitiateUploadMutation,
    useCompleteUploadMutation,
    useUpdateBasicInfoMutation,
    useGetBasicInfoQuery,
    useGetProfessionalDetailsQuery,
    useUpdateProfessionalDetailsMutation,
    useGetProfileCompletionQuery,
    useGetProfileSummaryQuery,
    useUpdateProfileSummaryMutation,
    useGetDocumentViewUrlQuery,
    useGetDoctorDocumentsQuery,
    useGetConsultationSetupQuery,
    useUpsertConsultationSetupMutation,
    useGetLocationQuery,
    useUpdateLocationMutation,
    useGetProfileCompletedQuery,
    useGetUserQuery,
    useGetAllDoctorsQuery,
    useGetDoctorProfileQuery,
    useGetAvailabilityQuery,
    useGetAvailableSlotsQuery,
    useBookSlotMutation,
    useCreateOrUpdateAvailabilityMutation,
    useGetDoctorAvailabilityQuery,
    useJoinVideoCallByDoctorMutation,
    useGoogleLoginMutation
} = doctorApi;
