import z from 'zod'

export const radarSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  rings: z
    .object({
      value: z.string().min(1, 'Обязательное поле'),
    })
    .array()
    .min(1, 'Ринг не может быть пустым')
    .refine((rings) => rings.length === 4, {
      message: 'Должно быть 4 ринга',
    }),
  quadrants: z
    .object({
      value: z.string().min(1, 'Обязательное поле'),
    })
    .array()
    .min(1, 'Квадрант не может быть пустым')
    .refine((rings) => rings.length === 4, {
      message: 'Должно быть 4 квадранта',
    }),
})
