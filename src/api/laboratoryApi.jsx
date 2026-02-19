import { baseApi } from './baseApi';

export const labOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabOrders: builder.query({
      query: () => '/lab/orders',
      providesTags: ['Lab'],
    }),

    updateLabResult: builder.mutation({
      query: (data) => ({
        url: '/lab/result',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Lab'],
    }),
  }),
});

export const {
  useGetLabOrdersQuery,
  useUpdateLabResultMutation,
} = labOwnerApi;
