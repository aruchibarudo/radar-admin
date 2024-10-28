import { FormField } from '@/components/radars/form/types'
import { RadarItemProbationResult } from '@/services/radars/types'

export const MAX_RINGS = 4
export const MAX_QUADRANTS = 4

export const formatFieldsToObjects = (fields: string[]) =>
  fields.map((field) => ({ value: field }))
export const formatFieldsToArray = (fields: FormField[]) =>
  fields.map(({ value }) => value)

export const formatSelectItem = (label: string) => ({ id: label, label })
export const formatSelectData = (data: string[] | undefined) => {
  if (!data) {
    return []
  }

  return data.map(formatSelectItem)
}

export const formatProbationResult = (
  probationResult: RadarItemProbationResult,
) => probationResult === RadarItemProbationResult.FttMatches
