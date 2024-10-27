import * as z from 'zod'

import { radarSchema } from '@/components/radars/form/schema'
import { Radar } from '@/services/radars/types'
import { Refetch } from '@/types/useQuery'

export type EditRadarFormProps = {
  data: Radar
} & Refetch

export type RadarFormData = z.infer<typeof radarSchema>

export type FormField = { value: string }

export type RadarsMap = Record<Radar['id'], Radar>

export type ItemRadarsMap = Record<Radar['id'], Pick<Radar, 'quadrants'>>
