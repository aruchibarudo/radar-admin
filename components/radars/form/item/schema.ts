import z from 'zod'

export const radarItemSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  ring: z.string().min(4),
  ru: z.boolean(),
  probation_result: z.string(),
  radars: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array()
    .nullish(),
})
