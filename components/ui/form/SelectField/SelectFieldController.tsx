import { Controller } from 'react-hook-form'

import { Select } from '@consta/uikit/Select'

import { SelectFieldControllerProps } from '@/components/ui/form/SelectField/types'

const SelectFieldController = ({
  name,
  items,
  ...rest
}: SelectFieldControllerProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => {
      return (
        <>
          <Select
            items={items}
            {...field}
            {...rest}
            {...(error && { status: 'alert' })}
          />
        </>
      )
    }}
  />
)

export default SelectFieldController
