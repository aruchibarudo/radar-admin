import { FieldErrors, FieldValues } from 'react-hook-form'

import {
  EditRadarFormProps,
  FormField,
  RadarFormData,
} from '@/components/radars/form/types'
import { RadarItemProbationResult } from '@/services/radars/types'

export const MAX_RINGS = 4
export const MAX_QUADRANTS = 4

export const getFormErrorMessage = <T extends FieldValues>(
  errors?: FieldErrors<T>,
) => {
  if (!errors) {
    return null
  }

  return errors.root?.message ?? errors.message
}
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

const defaultRadarFormData = {
  name: '',
  description: '',
  rings: formatFieldsToObjects([]),
  quadrants: formatFieldsToObjects([]),
}
export const getDefaultRadarFormData = (data: EditRadarFormProps['data']) => {
  if (data) {
    return {
      ...data,
      rings: formatFieldsToObjects(data.rings),
      quadrants: formatFieldsToObjects(data.quadrants),
    }
  }

  return defaultRadarFormData
}

export const transformRadarFormData = (data: RadarFormData) => ({
  ...data,
  rings: formatFieldsToArray(data.rings),
  quadrants: formatFieldsToArray(data.quadrants),
})
