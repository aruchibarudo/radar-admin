import z from 'zod'

export const radarItemSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  ring: z.object({
    id: z.string(),
    label: z.string(),
  }),
  ru: z.boolean(),
  ftt_matches: z.boolean(),
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
})
