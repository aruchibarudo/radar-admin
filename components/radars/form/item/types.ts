import * as z from 'zod'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import { RadarItemQuadrants } from '@/components/radars/table/types'
import { SnackbarContextProps } from '@/components/ui/snackbar/types'
import { Radar } from '@/services/radars/types'

export type BaseRadar = Omit<Radar, 'items'>

export type EditRadarItemFormProps = {
  radar: BaseRadar
  item: RadarItemQuadrants
} & SnackbarContextProps

export type RadarItemFormData = z.infer<typeof radarItemSchema>
