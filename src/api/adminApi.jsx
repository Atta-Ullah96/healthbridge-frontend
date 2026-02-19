import { baseApi } from "./baseApi";


export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),

    getDoctors: builder.query({
      query: () => '/admin/doctors',
      providesTags: ['Doctor'],
    }),

    createDoctor: builder.mutation({
      query: (data) => ({
        url: '/admin/doctor',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Doctor'],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetDoctorsQuery,
  useCreateDoctorMutation,
} = adminApi;
