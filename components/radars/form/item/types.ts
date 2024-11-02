import * as z from 'zod'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import { SnackbarContextProps } from '@/components/ui/snackbar/types'
import { Radar, RadarItem } from '@/services/radars/types'

export type BaseRadar = Omit<Radar, 'items'>

export type EditRadarItemFormProps = {
  radar: BaseRadar
  itemId?: RadarItem['id']
} & SnackbarContextProps

export type RadarItemFormData = z.infer<typeof radarItemSchema>

export type ItemRadarsFormData = {
  radarId: Radar['id']
  label: string
  quadrants: SelectItem[]
  ringExists: boolean
}
