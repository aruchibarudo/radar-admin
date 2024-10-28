import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
  formatFieldsToArray,
  formatFieldsToObjects,
} from '@/components/radars/form/utils'
import RadarItems from '@/components/radars/table/RadarItems'
import Stack from '@/components/ui/container/Stack'
import TextFieldController from '@/components/ui/form/Textfield/TextFieldController'
import { useSnackbar } from '@/components/ui/snackbar/hooks'
import { updateRadar } from '@/services/radars/radarService'

const EditRadarForm = ({ data, refetch }: EditRadarFormProps) => {
  const [isFormVisible, setIsFormVisible] = useState(true)
  const { addSnackbar } = useSnackbar()

  const methods = useForm<RadarFormData>({
    defaultValues: {
      ...data,
      rings: formatFieldsToObjects(data.rings),
      quadrants: formatFieldsToObjects(data.quadrants),
    },
    resolver: zodResolver(radarSchema),
  })
  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = methods

  const formSubmit = async (submitData: RadarFormData) => {
    const transformedData = {
      ...submitData,
      rings: formatFieldsToArray(submitData.rings),
      quadrants: formatFieldsToArray(submitData.quadrants),
    }

    try {
      await updateRadar({ id: data.id, data: transformedData })
      addSnackbar({ message: 'Радар успешно обновлен', status: 'success' })
    } catch (e) {
      console.error('Update radar error', e)
      addSnackbar({ message: 'Возникла ошибка', status: 'alert' })
    }
  }

  const handleSwitchForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  const switchLabel = isFormVisible ? 'Развернуть' : 'Свернуть'

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

              <TextFieldController name="description" label="Описание" />

              <RingFields control={control} errors={errors.rings} />

              <QuadrantFields control={control} errors={errors.quadrants} />
            </Stack>

            <div className="mt-4">
              <Button type="submit" label="Сохранить" disabled={isSubmitting} />
            </div>
          </form>
        </FormProvider>
      )}

      <RadarItems data={data} refetch={refetch} />
    </Stack>
  )
}

export default EditRadarForm
