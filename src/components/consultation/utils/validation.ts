import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().trim().min(1, 'Имя обязательно'),
  phoneNumber: z.string().trim().min(1, 'Номер телефона обязателен'),
  service: z.enum(['consultation', 'treatment', 'extraction', 'prosthetics'], {
    required_error: 'Выберите услугу',
  }),
  date: z.string().trim().min(1, 'Выберите дату'),
  time: z.string().trim().min(1, 'Выберите время'),
})

export type TFormValues = z.infer<typeof formSchema>
