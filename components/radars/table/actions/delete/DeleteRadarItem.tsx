import React from 'react'

import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'

import { DeleteRadarItemProps } from '@/components/radars/table/actions/delete/types'
import Stack from '@/components/ui/container/Stack'

const DeleteRadarItem = ({ item, onDelete, onClose }: DeleteRadarItemProps) => {
  return (
    <>
      <Text as="p" className="mb-4">
        Вы действительно хотите удалить {item.name}?
      </Text>

      <Stack direction="row" justifyContent="end">
        <Button label="Да" view="primary" onClick={onDelete} />

        <Button label="Отмена" view="secondary" onClick={onClose} />
      </Stack>
    </>
  )
}

export default DeleteRadarItem
