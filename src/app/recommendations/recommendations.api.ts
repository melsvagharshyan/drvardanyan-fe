import { api } from '../api'
import { RecommendationListResponse } from '../types/recommendations.types'

const base = '/feedbacks'

const recommendationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createRecommendations: build.mutation<void, any>({
      query: (body) => ({
        url: `${base}`,
        method: 'POST',
        body,
      }),
    }),
    getRecommendations: build.query<RecommendationListResponse, void>({
      query: () => ({
        url: `${base}/approved`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useCreateRecommendationsMutation, useGetRecommendationsQuery } = recommendationsApi
