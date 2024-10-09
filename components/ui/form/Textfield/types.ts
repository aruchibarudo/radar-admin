import { TextFieldProps } from '@consta/uikit/TextField'

export type TextFieldControllerProps = {
  name: string
} & Omit<TextFieldProps<string>, 'name'>
