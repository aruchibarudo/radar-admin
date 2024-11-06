import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@consta/uikit/Button'
import { Switch } from '@consta/uikit/Switch'

import QuadrantFields from '@/components/radars/form/QuadrantFields'
import RingFields from '@/components/radars/form/RingFields'
import { radarSchema } from '@/components/radars/form/schema'
import {
  EditRadarFormProps,
  RadarFormData,
} from '@/components/radars/form/types'
import {
  getDefaultRadarFormData,
  transformRadarFormData,
} from '@/components/radars/form/utils'
import Stack from '@/components/ui/container/Stack'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import { useSnackbar } from '@/components/ui/snackbar/hooks'
import { createRadar, updateRadar } from '@/services/radars/radarService'

const DynamicQuillEditor = dynamic(
  () => import('@/components/ui/form/QuillEditor/QuillEditor'),
  {
    ssr: false,
  },
)

const RadarForm = ({ data }: EditRadarFormProps) => {
  const router = useRouter()
  const [isFormVisible, setIsFormVisible] = useState(true)
  const { addSnackbar } = useSnackbar()

  const methods = useForm<RadarFormData>({
    defaultValues: getDefaultRadarFormData(data),
    resolver: zodResolver(radarSchema),
  })
  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = methods

  const [description, setDescription] = useState(data?.description ?? '')

  const formSubmit = async (submitData: RadarFormData) => {
    const transformedData = transformRadarFormData({
      ...submitData,
      description,
    })

    try {
      if (data) {
        await updateRadar({ id: data.id, data: transformedData })
        addSnackbar({ message: 'Радар успешно обновлен', status: 'success' })
      } else {
        const newRadar = await createRadar({ data: transformedData })
        addSnackbar({ message: 'Радар успешно создан', status: 'success' })
        router.push(`/radars/${newRadar.id}`)
      }
    } catch (e) {
      console.error('Form Error', e)
      addSnackbar({ message: 'Возникла ошибка', status: 'alert' })
    }
  }

  const handleSwitchForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  const switchLabel = isFormVisible ? 'Развернуть' : 'Свернуть'
  const submitLabel = data ? 'Сохранить' : 'Создать'

  return (
    <Stack>
      <Switch
        label={`${switchLabel} форму`}
        checked={isFormVisible}
        onChange={handleSwitchForm}
      />

      {isFormVisible && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <Stack className="max-w-screen-md">
              <TextFieldController name="name" label="Имя" />

              <div>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value } }) => (
                    <DynamicQuillEditor
                      onChange={setDescription}
                      value={value}
                      label="Описание"
                    />
                  )}
                />
              </div>

              <RingFields control={control} errors={errors.rings} />

              <QuadrantFields control={control} errors={errors.quadrants} />
            </Stack>

            <div className="mt-4">
              <Button
                type="submit"
                label={submitLabel}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </Stack>
  )
}

export default RadarForm
