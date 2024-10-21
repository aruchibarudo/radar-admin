import { ComboboxProps } from '@consta/uikit/Combobox'

import { SelectItem } from '@/components/ui/form/SelectField/types'

export type ComboboxFieldControllerProps = {
  name: string
  isMultiple?: boolean
} & Omit<ComboboxProps<SelectItem>, 'name' | 'onChange'>
