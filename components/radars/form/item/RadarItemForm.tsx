import dynamic from 'next/dynamic'

import React, { useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useQuery } from '@tanstack/react-query'

import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { IconAdd } from '@consta/icons/IconAdd'
import { IconRemove } from '@consta/icons/IconRemove'

import { radarItemSchema } from '@/components/radars/form/item/schema'
import {
  EditRadarItemFormProps,
  RadarItemFormData,
} from '@/components/radars/form/item/types'
import {
  defaultItemFormData as defaultValues,
  formatItemRadar,
  getRadarsList,
  transformItemFormData,
} from '@/components/radars/form/item/utils'
import { ItemRadarsMap, RadarsMap } from '@/components/radars/form/types'
import {
  formatProbationResult,
  formatSelectData,
  formatSelectItem,
} from '@/components/radars/form/utils'
import ComboboxFieldController from '@/components/ui/form/ComboboxField/ComboboxFieldController'
import SelectFieldController from '@/components/ui/form/SelectField/SelectFieldController'
import { SelectItem } from '@/components/ui/form/SelectField/types'
import SwitchFieldController from '@/components/ui/form/SwitchField/SwitchFieldController'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import {
  createRadarItem,
  getRadarItem,
  getRadars,
  updateRadarItem,
} from '@/services/radars/radarService'
import { Radar } from '@/services/radars/types'

const DynamicQuillEditor = dynamic(
  () => import('@/components/ui/form/QuillEditor/QuillEditor'),
  {
    ssr: false,
  },
)

const RadarItemForm = ({
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
    queryFn: () => getRadarItem({ id: itemId! }),
    enabled: !!itemId,
  })
  const [itemRadars, setItemRadars] = useState<ItemRadarsMap>({})

  const methods = useForm<RadarItemFormData>({
    resolver: zodResolver(radarItemSchema),
    defaultValues,
  })
  const {
    control,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'radars',
  })

  const [description, setDescription] = useState('')

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

    const formattedItemRadars = Object.keys(itemRadarsMap).map((radarId) =>
      formatItemRadar({
        radarId,
        label: radarsMap[radarId].name,
        quadrants: formatSelectData(itemRadarsMap[radarId].quadrants),
        ringExists: radarsMap[radarId].rings.includes(item.ring),
      }),
    )

    const { probation_result } = item
    reset({
      ...item,
      ring: formatSelectItem(item.ring),
      ftt_matches: formatProbationResult(probation_result),
      radars: formattedItemRadars,
    })
  }, [item, radars, reset])

  const selectedRing = watch('ring')

  const handleRadarChange = (index: number, selectedRadarId?: Radar['id']) => {
    if (!selectedRadarId || !radars) {
      return
    }

    const selectedRadar = radars.find((r) => r.id === selectedRadarId)
    const activeQuadrants = itemRadars[selectedRadarId]?.quadrants
    const allQuadrants = selectedRadar?.quadrants ?? []
    const quadrants = activeQuadrants ?? allQuadrants

    const ringExists = Boolean(
      selectedRadar?.rings.includes(selectedRing.label),
    )
    clearErrors(`radars.${index}.ringExists`)

    if (selectedRadar && selectedRadarId) {
      setValue(`radars.${index}.radarId`, selectedRadarId)
      setValue(`radars.${index}.label`, selectedRadar.name)
      setValue(`radars.${index}.quadrants`, formatSelectData(quadrants))
      setValue(`radars.${index}.ringExists`, ringExists)
    }
  }

  const formSubmit = async (submitData: RadarItemFormData) => {
    const transformedData = transformItemFormData({
      ...submitData,
      description,
    })

    try {
      if (itemId) {
        await updateRadarItem({ id: itemId, data: transformedData })
        addSnackbar({ message: 'Элемент успешно обновлен', status: 'success' })
      } else {
        // probably we need bulk creation here
        await createRadarItem({ id: radar.id, data: transformedData })
        addSnackbar({ message: 'Элемент успешно создан', status: 'success' })
      }
    } catch (e) {
      console.error('Ошибка:', e)
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
            <Controller
              name="description"
              control={control}
              render={({ field: { value } }) => (
                <DynamicQuillEditor onChange={setDescription} value={value} />
              )}
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
            <SwitchFieldController name="ru" label="Отечественное решение" />
          </GridItem>

          <GridItem>
            <SwitchFieldController
              name="ftt_matches"
              label="Соответствует ФТТ"
            />
          </GridItem>

          <GridItem>
            <Grid gap="s">
              {radars &&
                fields.map((field, index) => {
                  const radarId = watch(`radars.${index}.radarId`)
                  const ringExistsError =
                    selectedRing.label &&
                    radarId &&
                    errors.radars?.[index]?.ringExists

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

                        {ringExistsError && (
                          <Text view="alert">
                            Ринг &quot;{selectedRing.label}&quot; отсутствует в
                            данном радаре
                          </Text>
                        )}

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
              onClick={() =>
                append({
                  radarId: '',
                  label: '',
                  quadrants: [],
                  ringExists: true,
                })
              }
              disabled={fields.length === radars?.length}
            />
          </GridItem>

          <GridItem>
            <Button
              type="submit"
              label={itemId ? 'Сохранить' : 'Создать'}
              disabled={isSubmitting}
            />
          </GridItem>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default RadarItemForm
