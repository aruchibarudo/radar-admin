import Link from 'next/link'

import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'

import { Radar } from '@/services/radars/types'

const RadarCard = ({ id, name, description }: Radar) => {
  return (
    <Card verticalSpace="xs" horizontalSpace="xs">
      <Link href={`/radars/${id}`} className="mb-2 block">
        {name}
      </Link>
      <Text as="p">{description}</Text>
    </Card>
  )
}

export default RadarCard
