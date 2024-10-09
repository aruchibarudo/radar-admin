import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useQuery } from '@tanstack/react-query'

import { Button } from '@consta/uikit/Button'
import { IconAdd } from '@consta/icons/IconAdd'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import {
  EditRadarItemFormProps,
  RadarItemFormData,
} from '@/components/radars/form/item/types'
import { getRadarsList } from '@/components/radars/form/item/utils'
import SelectFieldController from '@/components/ui/form/SelectField/SelectFieldController'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import Stack from '@/components/ui/Stack'
import { getRadars } from '@/services/radars/radarService'

const EditRadarItemForm = ({ data }: EditRadarItemFormProps) => {
  const { data: radars } = useQuery({
    queryKey: ['radars'],
    queryFn: () => getRadars(),
    // select: (data) => getRadarsList(data),
  })

  const methods = useForm<RadarItemFormData>({
    defaultValues: data,
    values: {
      ...data,
      radars: getRadarsList(radars),
      // radars,
    },
    resolver: zodResolver(radarItemSchema),
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods

  const formSubmit = async (submitData: RadarItemFormData) => {
    const transformedData = {
      ...submitData,
    }

    try {
      console.log('submit Data', transformedData)
      // await updateRadarItem({ id: data.id, data: transformedData })
    } catch (e) {
      console.error('Update radar item error', e)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Stack className="max-w-screen-md">
          <TextFieldController name="name" label="Имя" />

          <TextFieldController
            name="description"
            label="Описание"
            type="textarea"
          />

          <TextFieldController name="ring" label="Ринг" />

          <SelectFieldController
            name="radars"
            label="Радар 1"
            items={getRadarsList(radars)}
          />

          <SelectFieldController
            name="quadrants"
            label="Квадранты радара 1"
            items={[
              { id: '1', label: 'Квадрант 1' },
              { id: '2', label: 'Квадрант 2' },
              { id: '3', label: 'Квадрант 3' },
              { id: '4', label: 'Квадрант 4' },
            ]}
          />

          <Button
            label="Добавить радар"
            iconLeft={IconAdd}
            size="xs"
            className="mt-4"
            disabled
          />
        </Stack>

        <div className="mt-4">
          <Button type="submit" label="Сохранить" disabled={isSubmitting} />
        </div>
      </form>
    </FormProvider>
  )
}

export default EditRadarItemForm
