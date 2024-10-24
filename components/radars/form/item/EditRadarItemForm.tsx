import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useQuery } from '@tanstack/react-query'

import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconAdd } from '@consta/icons/IconAdd'
import { IconRemove } from '@consta/icons/IconRemove'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import {
  EditRadarItemFormProps,
  RadarItemFormData,
} from '@/components/radars/form/item/types'
import {
  getRadarsList,
  transformItemFormData,
} from '@/components/radars/form/item/utils'
import {
  formatSelectData,
  formatSelectItem,
} from '@/components/radars/form/utils'
import ComboboxFieldController from '@/components/ui/form/ComboboxField/ComboboxFieldController'
import SelectFieldController from '@/components/ui/form/SelectField/SelectFieldController'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import { getRadars, updateRadarItem } from '@/services/radars/radarService'
import { Radar } from '@/services/radars/types'

const EditRadarItemForm = ({
  radar,
  item,
  addSnackbar,
}: EditRadarItemFormProps) => {
  const { data: radars } = useQuery({
    queryKey: ['radars'],
    queryFn: () => getRadars(),
  })

  const methods = useForm<RadarItemFormData>({
    defaultValues: {
      ...item,
      ring: formatSelectItem(item.ring),
      radars: [
        {
          radarId: radar.id,
          label: radar.name,
          quadrants: formatSelectData(item.quadrants),
        },
      ],
    },
    resolver: zodResolver(radarItemSchema),
  })
  const {
    control,
    setValue,
    watch,
    formState: { isSubmitting },
    handleSubmit,
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'radars',
  })

  const handleRadarChange = (index: number, selectedRadarId?: Radar['id']) => {
    const selectedRadar = radars?.find((r) => r.id === selectedRadarId)
    const selectedRadarQuadrants = selectedRadar?.quadrants ?? []
    const quadrants =
      radar.id === selectedRadarId ? item.quadrants : selectedRadarQuadrants

    if (selectedRadar && selectedRadarId) {
      setValue(`radars.${index}.radarId`, selectedRadarId)
      setValue(`radars.${index}.label`, selectedRadar.name)
      setValue(`radars.${index}.quadrants`, formatSelectData(quadrants))
    }
  }

  const formSubmit = async (submitData: RadarItemFormData) => {
    const transformedData = transformItemFormData(submitData)

    try {
      console.log('submit Data', transformedData)
      await updateRadarItem({ id: item.id, data: transformedData })
      addSnackbar({ message: 'Элемент успешно обновлен', status: 'success' })
    } catch (e) {
      console.error('Update radar item error', e)
      addSnackbar({ message: 'Возникла ошибка', status: 'alert' })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Grid gap="m">
          <GridItem>
            <TextFieldController name="name" label="Имя" />
          </GridItem>

          <GridItem>
            <TextFieldController
              name="description"
              label="Описание"
              type="textarea"
            />
          </GridItem>

          <GridItem>
            <SelectFieldController
              name="ring"
              label="Ринг"
              items={formatSelectData(radar.rings)}
              form="round"
            />
          </GridItem>

          <GridItem>
            <Grid gap="s">
              {radars &&
                fields.map((field, index) => {
                  const radarId = watch(`radars.${index}.radarId`)

                  return (
                    <GridItem key={field.id}>
                      <Card verticalSpace="m" horizontalSpace="m">
                        <SelectFieldController
                          name={`radars.${index}`}
                          label={`Радар ${index + 1}`}
                          items={getRadarsList(radars)}
                          onChange={(selectedRadar: SelectItem | null) =>
                            handleRadarChange(index, selectedRadar?.id)
                          }
                          className="mb-2"
                        />

                        <ComboboxFieldController
                          name={`radars.${index}.quadrants`}
                          label="Квадранты"
                          items={formatSelectData(
                            radars?.find((r) => r.id === radarId)?.quadrants,
                          )}
                          isMultiple
                          className="mb-2"
                        />

                        {fields.length > 1 && (
                          <Button
                            view="ghost"
                            iconLeft={IconRemove}
                            size="xs"
                            label="Удалить"
                            onClick={() => remove(index)}
                          />
                        )}
                      </Card>
                    </GridItem>
                  )
                })}
            </Grid>
          </GridItem>

          <GridItem>
            <Button
              view="clear"
              label="Добавить радар"
              iconLeft={IconAdd}
              size="xs"
              onClick={() => append({ radarId: '', label: '', quadrants: [] })}
              disabled={fields.length === radars?.length}
            />
          </GridItem>

          <GridItem>
            <Button type="submit" label="Сохранить" disabled={isSubmitting} />
          </GridItem>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default EditRadarItemForm
