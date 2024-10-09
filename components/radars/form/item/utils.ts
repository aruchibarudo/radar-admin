import { SelectItem } from '@/components/ui/form/SelectField/types'
import { Radar } from '@/services/radars/types'

export const getRadarsList = (radars: Radar[] | undefined): SelectItem[] => {
  if (!radars) {
    return []
  }

  return radars.map(({ id, name }) => ({ id, label: name }))
}
