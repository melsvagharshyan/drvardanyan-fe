export type TRecommendationImage = {
  url?: string
  public_id?: string
}

export type TRecommendation = {
  _id: string
  fullName: string
  recommendation: string
  approved: boolean
  stars: number
  image?: TRecommendationImage
}

export type RecommendationListResponse = TRecommendation[]
