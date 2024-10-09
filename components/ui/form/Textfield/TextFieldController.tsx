import { Controller } from 'react-hook-form'

import { TextField } from '@consta/uikit/TextField'

import { TextFieldControllerProps } from '@/components/ui/form/Textfield/types'

const TextFieldController = ({ name, ...rest }: TextFieldControllerProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => {
      const value = field.value ?? ''
      return (
        <>
          <TextField
            {...field}
            value={value}
            {...rest}
            {...(error && { status: 'alert' })}
          />
          {/* error && <Text view="alert">{error.message}</Text> */}
        </>
      )
    }}
  />
)

export default TextFieldController
