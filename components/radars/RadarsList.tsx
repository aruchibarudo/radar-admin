import { useRouter } from 'next/navigation'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Loader } from '@consta/uikit/Loader'

import DeleteRadar from '@/components/radars/card/actions/DeleteRadar'
import RadarCard from '@/components/radars/card/RadarCard'
import ErrorInformer from '@/components/system/ErrorInformer'
import { useModal } from '@/components/ui/modal/hooks'
import { useSnackbar } from '@/components/ui/snackbar/hooks'
import { deleteRadar, getRadars } from '@/services/radars/radarService'
import { Radar } from '@/services/radars/types'

const RadarsList = () => {
  const router = useRouter()

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['radars'],
    queryFn: () => getRadars(),
  })

  const { setModal, closeModal } = useModal()
  const { addSnackbar } = useSnackbar()

  const handleDeleteRadar = async ({ id }: Pick<Radar, 'id'>) => {
    try {
      await deleteRadar({ id })
      await refetch()

      addSnackbar({ message: 'Радар успешно удален', status: 'success' })
    } catch (e) {
      console.log('delete radar:', e)

      addSnackbar({
        message: 'Возникла ошибка при удалении радара',
        status: 'alert',
      })
    } finally {
      closeModal()
    }
  }
  const handleDeleteConfirm = (radar: Radar) => {
    setModal({
      title: 'Удалить радар',
      content: (
        <DeleteRadar
          radar={radar}
          onDelete={() => handleDeleteRadar({ id: radar.id })}
          onClose={closeModal}
        />
      ),
    })
  }

  const handleEditRadar = ({ id }: Pick<Radar, 'id'>) => {
    router.push(`/radars/${id}`)
  }

  if (isPending) {
    return <Loader />
  }

  if (error) {
    return <ErrorInformer error={error} />
  }

  return (
    <Grid cols={4} gap="s">
      {data?.map((radar) => (
        <GridItem key={radar.id}>
          <RadarCard
            radar={radar}
            onDelete={handleDeleteConfirm}
            onEdit={handleEditRadar}
          />
        </GridItem>
      ))}
    </Grid>
  )
}

export default RadarsList
