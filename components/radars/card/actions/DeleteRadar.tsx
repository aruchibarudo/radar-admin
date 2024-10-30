import React from 'react'

import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'

import { DeleteRadarProps } from '@/components/radars/card/actions/types'
import Stack from '@/components/ui/container/Stack'

const DeleteRadar = ({ radar, onDelete, onClose }: DeleteRadarProps) => {
  return (
    <>
      <Text as="p" className="mb-4">
        Вы действительно хотите удалить {radar.name}?
      </Text>

      <Stack direction="row" justifyContent="end">
        <Button label="Да" view="primary" onClick={onDelete} />

        <Button label="Отмена" view="secondary" onClick={onClose} />
      </Stack>
    </>
  )
}

export default DeleteRadar
