import { z } from 'zod'

export const recommendationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'recommendation_modal.errors.fullName.required')
    .max(40, 'recommendation_modal.errors.fullName.max'),
  recommendation: z
    .string()
    .trim()
    .min(1, 'recommendation_modal.errors.recommendation.required')
    .max(300, 'recommendation_modal.errors.recommendation.max'),
  stars: z.number().min(1, 'recommendation_modal.errors.stars.required'),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        file === undefined || file instanceof File || (typeof file === 'object' && 'name' in file),
      {
        message: 'form.invalidImage',
      },
    ),
})

export type RecommendationFormSchema = z.infer<typeof recommendationFormSchema>
