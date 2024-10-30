import { Radar } from '@/services/radars/types'

export type RadarCardProps = {
  radar: Radar
  onDelete: (radar: Radar) => void
  onEdit: (radar: Radar) => void
}
