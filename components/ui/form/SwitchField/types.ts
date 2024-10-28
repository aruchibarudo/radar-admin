import { SwitchProps } from '@consta/uikit/Switch'

export type SwitchFieldControllerProps = {
  name: string
  onChange?: SwitchProps['onChange']
  checked?: SwitchProps['checked']
} & Omit<SwitchProps, 'name' | 'onChange' | 'checked'>
