import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { IconAdd } from '@consta/icons/IconAdd'
import { IconClose } from '@consta/icons/IconClose'

import { RadarFormData } from '@/components/radars/form/types'
import {
  getFormErrorMessage,
  MAX_QUADRANTS,
} from '@/components/radars/form/utils'
import Stack from '@/components/ui/container/Stack'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import { H3 } from '@/components/ui/Text'

type QuadrantFieldsProps = {
  control: Control<RadarFormData>
  errors: FieldErrors<RadarFormData>['quadrants']
}

const QuadrantFields = ({ control, errors }: QuadrantFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quadrants',
  })

  const errorMessage = getFormErrorMessage<RadarFormData>(errors)

  return (
    <Card verticalSpace="m" horizontalSpace="m">
      <H3>Квадранты</H3>
      <Grid
        gap="m"
        cols={4}
        breakpoints={{
          480: {
            cols: 2,
          },
        }}
      >
        {fields.map((field, index) => (
          <GridItem key={field.id}>
            <Stack direction="row" className="relative">
              <TextFieldController
                name={`quadrants.${index}.value`}
                label={`Квадрант ${index + 1}`}
              />

              <Button
                label="Удалить"
                iconLeft={IconClose}
                size="xs"
                onClick={() => remove(index)}
                view="ghost"
                onlyIcon
                className="absolute top-[37px]"
              />
            </Stack>
          </GridItem>
        ))}
      </Grid>

      <Button
        label="Добавить"
        iconLeft={IconAdd}
        onClick={() => append({ value: '' })}
        size="xs"
        className="mt-4"
        disabled={fields.length >= MAX_QUADRANTS}
      />

      {errorMessage && (
        <Text view="alert" className="mt-2">
          {`${errorMessage}`}
        </Text>
      )}
    </Card>
  )
}

export default QuadrantFields
