import z from 'zod'

export const radarItemSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim(),
  ring: z.object({
    id: z.string(),
    label: z.string().trim().min(1),
  }),
  ru: z.boolean(),
  probation_result: z.object({
    id: z.string(),
    label: z.string().trim().min(1),
  }),
  radars: z
    .object({
      radarId: z.string(),
      label: z.string().trim().min(1),
      ringExists: z.literal<boolean>(true),
      quadrants: z
        .object({
          id: z.string(),
          label: z.string().trim().min(1),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1, 'Квадрант не может быть пустым'),
})
