import { SelectProps } from '@consta/uikit/Select'

export type SelectItem = {
  id: string
  label: string
}

export type SelectFieldControllerProps = {
  name: string
} & Omit<SelectProps<SelectItem>, 'name'>
