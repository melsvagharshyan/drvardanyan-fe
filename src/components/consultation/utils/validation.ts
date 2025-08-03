import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().trim().min(1, 'Имя обязательно'),
  phoneNumber: z.string().trim().min(1, 'Номер телефона обязателен'),
  convenientTime: z.string().trim().min(1, 'Укажите удобное время визита'),
})

export type TFormValues = z.infer<typeof formSchema>
