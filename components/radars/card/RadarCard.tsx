import Link from 'next/link'

import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconRemove } from '@consta/icons/IconRemove'

import { RadarCardProps } from '@/components/radars/card/types'
import Stack from '@/components/ui/container/Stack'

const RadarCard = ({ radar, onDelete, onEdit }: RadarCardProps) => {
  const { id, name, description } = radar

  return (
    <Card verticalSpace="xs" horizontalSpace="xs">
      <Stack>
        <Link href={`/radars/${id}`}>{name}</Link>
        <Text as="p">{description}</Text>

        <Stack direction="row" spacing="s">
          <Button
            label="Редактировать"
            iconLeft={IconEdit}
            size="xs"
            onClick={() => onEdit(radar)}
          />
          <Button
            label="Удалить"
            iconLeft={IconRemove}
            size="xs"
            view="ghost"
            onClick={() => onDelete(radar)}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

export default RadarCard
