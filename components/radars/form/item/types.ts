import * as z from 'zod'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import { RadarItem } from '@/services/radars/types'

// export type EditRadarItemFormProps = { data: UpdateRadarItemParams }
export type EditRadarItemFormProps = { data: RadarItem }

export type RadarItemFormData = z.infer<typeof radarItemSchema>
