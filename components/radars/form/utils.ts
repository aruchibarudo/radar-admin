import { FieldErrors, FieldValues } from 'react-hook-form'

import {
  EditRadarFormProps,
  FormField,
  RadarFormData,
} from '@/components/radars/form/types'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import { ProbationResult, ProbationResultKey } from '@/services/radars/types'

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

export const formatSelectItem = (item: string | SelectItem) => {
  if (typeof item === 'string') {
    return { id: item, label: item }
  }

  return item
}
export const formatSelectData = (data: (string | SelectItem)[] | undefined) => {
  if (!data) {
    return []
  }

  return data.map(formatSelectItem)
}

export const getProbationResultLabel = (probationResult: ProbationResult) => {
  const labelsMap: Record<ProbationResult, string> = {
    [ProbationResultKey.FttMatches]: 'Соответствует ФТТ',
    [ProbationResultKey.FttNotMatches]: 'Не соответствует ФТТ',
  }

  return labelsMap[probationResult] ?? ''
}

export const formatProbationResult = (probationResult: ProbationResult) => {
  if (!probationResult) {
    return {
      id: '',
      label: 'Не прошло апробацию',
    }
  }

  return formatSelectItem({
    id: probationResult,
    label: getProbationResultLabel(probationResult),
  })
}
export const formatProbationResults = (data: (ProbationResult | '')[]) =>
  data.map(formatProbationResult)
export const getProbationResults = () =>
  formatProbationResults([
    '',
    ProbationResultKey.FttMatches,
    ProbationResultKey.FttNotMatches,
  ])

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
