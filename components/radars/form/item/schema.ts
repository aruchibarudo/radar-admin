import z from 'zod'

import { RadarItemProbationResult } from '@/services/radars/types'

export const radarItemSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  ring: z.string().min(4),
  ru: z.boolean(),
  probation_result: z.nativeEnum(RadarItemProbationResult),
  radars: z
    .object({
      radarId: z.string(),
      label: z.string(),
      quadrants: z
        .object({
          id: z.string(),
          label: z.string(),
        })
        .array(),
    })
    .array()
    .min(1, 'Квадрант не может быть пустым'),
  quadrants: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    }),
  ),
})
