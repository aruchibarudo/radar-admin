import Link from 'next/link'

import truncate from 'html-truncate'

import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconRemove } from '@consta/icons/IconRemove'

import styles from './styles.module.css'

import { RadarCardProps } from '@/components/radars/card/types'
import Stack from '@/components/ui/container/Stack'
import { mdParser } from '@/utils/markdown'

const RadarCard = ({ radar, onDelete, onEdit }: RadarCardProps) => {
  const { id, name, description } = radar

  return (
    <Card verticalSpace="xs" horizontalSpace="xs" className={styles.card}>
      <Stack>
        <Link href={`/radars/${id}`}>{name}</Link>
        <div
          dangerouslySetInnerHTML={{
            __html: truncate(mdParser.render(description), 100),
          }}
        />

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
