import { Controller } from 'react-hook-form'

import { Switch } from '@consta/uikit/Switch'

import { SwitchFieldControllerProps } from '@/components/ui/form/SwitchField/types'

const SwitchFieldController = ({
  name,
  ...rest
}: SwitchFieldControllerProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => {
      return (
        <Switch
          checked={field.value}
          {...field}
          {...rest}
          {...(error && { status: 'alert' })}
        />
      )
    }}
  />
)

export default SwitchFieldController
