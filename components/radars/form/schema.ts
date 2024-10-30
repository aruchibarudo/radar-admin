import z from 'zod'

import { MAX_QUADRANTS, MAX_RINGS } from '@/components/radars/form/utils'

export const radarSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  rings: z
    .object({
      value: z.string().trim().min(1, 'Обязательное поле'),
    })
    .array()
    .min(1, 'Ринг не может быть пустым')
    .refine((rings) => rings.length === MAX_RINGS, {
      message: `Должно быть ${MAX_RINGS} ринга`,
    }),
  quadrants: z
    .object({
      value: z.string().trim().min(1, 'Обязательное поле'),
    })
    .array()
    .min(1, 'Квадрант не может быть пустым')
    .refine((quadrants) => quadrants.length === MAX_QUADRANTS, {
      message: `Должно быть ${MAX_QUADRANTS} квадранта`,
    }),
})
