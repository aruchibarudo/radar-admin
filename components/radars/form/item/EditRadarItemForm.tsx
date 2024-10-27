import React, { useEffect, useState } from 'react'
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
import { ItemRadarsMap, RadarsMap } from '@/components/radars/form/types'
import {
  formatSelectData,
  formatSelectItem,
} from '@/components/radars/form/utils'
import ComboboxFieldController from '@/components/ui/form/ComboboxField/ComboboxFieldController'
import SelectFieldController from '@/components/ui/form/SelectField/SelectFieldController'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import {
  getRadarItem,
  getRadars,
  updateRadarItem,
} from '@/services/radars/radarService'
import { Radar } from '@/services/radars/types'

const EditRadarItemForm = ({
  radar,
  itemId,
  addSnackbar,
}: EditRadarItemFormProps) => {
  const { data: radars } = useQuery({
    queryKey: ['radars'],
    queryFn: () => getRadars(),
  })

  const { data: item } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => getRadarItem({ id: itemId }),
  })
  const [itemRadars, setItemRadars] = useState<ItemRadarsMap>({})

  const methods = useForm<RadarItemFormData>({
    resolver: zodResolver(radarItemSchema),
  })
  const {
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
    handleSubmit,
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'radars',
  })

  useEffect(() => {
    if (!radars || !item) {
      return
    }

    const radarsMap = radars.reduce<RadarsMap>((acc, r) => {
      acc[r.id] = r

      return acc
    }, {})

    const itemRadarsMap = item.radars.reduce<ItemRadarsMap>(
      (acc, { id, quadrant }) => {
        acc[id] = acc[id] || { quadrants: [] }
        acc[id].quadrants.push(quadrant)

        return acc
      },
      {},
    )

    setItemRadars(itemRadarsMap)

    const transformedItemRadars = Object.keys(itemRadarsMap).map((radarId) => {
      return {
        radarId,
        label: radarsMap[radarId].name,
        quadrants: formatSelectData(itemRadarsMap[radarId].quadrants),
      }
    })

    reset({
      ...item,
      ring: formatSelectItem(item.ring),
      radars: transformedItemRadars,
    })
  }, [item, radars, reset])

  const handleRadarChange = (index: number, selectedRadarId?: Radar['id']) => {
    if (!selectedRadarId || !radars) {
      return
    }

    const selectedRadar = radars.find((r) => r.id === selectedRadarId)
    const activeQuadrants = itemRadars[selectedRadarId]?.quadrants
    const allQuadrants = selectedRadar?.quadrants ?? []
    const quadrants = activeQuadrants ?? allQuadrants

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
      await updateRadarItem({ id: itemId, data: transformedData })
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
