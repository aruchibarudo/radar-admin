import {
  ItemRadarsFormData,
  RadarItemFormData,
} from '@/components/radars/form/item/types'
import {
  formatProbationResult,
  formatSelectItem,
} from '@/components/radars/form/utils'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import {
  Radar,
  RadarItemFormQuadrant,
  RadarItemProbationResult,
} from '@/services/radars/types'

export const getRadarsList = (radars: Radar[] | undefined): SelectItem[] => {
  if (!radars) {
    return []
  }

  return radars.map(({ id, name }) => ({ id, label: name }))
}

export const formatItemRadar = ({
  radarId,
  label,
  quadrants,
  ringExists,
}: ItemRadarsFormData) => ({
  radarId,
  label,
  quadrants,
  ringExists,
})

export const defaultItemFormData = {
  name: '',
  description: '',
  ru: false,
  ring: formatSelectItem(''),
  ftt_matches: formatProbationResult(RadarItemProbationResult.FttNotMatches),
  radars: [
    formatItemRadar({
      radarId: '',
      label: '',
      quadrants: [],
      ringExists: false,
    }),
  ],
}

export const transformItemFormData = (data: RadarItemFormData) => {
  const { ftt_matches, ...formData } = data

  const ring = formData.ring.label

  const radars = formData.radars.reduce<RadarItemFormQuadrant[]>(
    (acc, item) => {
      item.quadrants.forEach((quadrant) => {
        acc.push({ id: item.radarId, quadrant: quadrant.label })
      })

      return acc
    },
    [],
  )

  const probationResult = ftt_matches
    ? RadarItemProbationResult.FttMatches
    : RadarItemProbationResult.FttNotMatches

  return {
    ...formData,
    probation_result: probationResult,
    ring,
    radars,
  }
}
