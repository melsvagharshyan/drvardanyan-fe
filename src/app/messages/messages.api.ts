import { api } from '../api'

const base = '/messages'

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitConsultation: build.mutation<
      void,
      { name: string; phoneNumber: string; convenientTime: string }
    >({
      query: (body) => ({
        url: `${base}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSubmitConsultationMutation } = userApi
