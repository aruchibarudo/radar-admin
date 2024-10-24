import { RadarItemFormData } from '@/components/radars/form/item/types'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import { Radar, RadarItemFormQuadrant } from '@/services/radars/types'

export const getRadarsList = (radars: Radar[] | undefined): SelectItem[] => {
  if (!radars) {
    return []
  }

  return radars.map(({ id, name }) => ({ id, label: name }))
}

export const transformItemFormData = (data: RadarItemFormData) => {
  const ring = data.ring.label

  const radars = data.radars.reduce<RadarItemFormQuadrant[]>((acc, item) => {
    item.quadrants.forEach((quadrant) => {
      acc.push({ id: item.radarId, quadrant: quadrant.label })
    })

    return acc
  }, [])

  return {
    ...data,
    ring,
    radars,
  }
}
