import { Controller } from 'react-hook-form'

import { Combobox } from '@consta/uikit/Combobox'

import { ComboboxFieldControllerProps } from '@/components/ui/form/ComboboxField/types'

const ComboboxFieldController = ({
  name,
  items,
  isMultiple,
  ...rest
}: ComboboxFieldControllerProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => {
      return (
        <>
          <Combobox
            items={items}
            {...field}
            {...rest}
            {...(error && { status: 'alert' })}
            multiple={isMultiple}
          />
        </>
      )
    }}
  />
)

export default ComboboxFieldController
