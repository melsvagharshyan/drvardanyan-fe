import { api } from '../api'

const base = '/appointments'

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitConsultation: build.mutation<
      void,
      {
        name: string
        phoneNumber: string
        service: 'consultation' | 'treatment' | 'extraction' | 'prosthetics'
        start: string
        tzOffset: number
      }
    >({
      query: (body) => {
        const url = `${base}`
        console.log('Submit consultation URL:', url)
        return {
          url,
          method: 'POST',
          body,
        }
      },
    }),
    getAvailability: build.query<
      { availableSlots: string[]; busySlots: string[]; workingSlots: string[] },
      { date: string; service: 'consultation' | 'treatment' | 'extraction' | 'prosthetics' }
    >({
      query: ({ date, service }) => {
        const tzOffset = new Date().getTimezoneOffset() // minutes
        const url = `${base}/availability?date=${encodeURIComponent(date)}&service=${service}&tzOffset=${tzOffset}`
        console.log('Get availability URL:', url)
        return {
          url,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useSubmitConsultationMutation, useGetAvailabilityQuery } = userApi
