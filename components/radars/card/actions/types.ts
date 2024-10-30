import { Radar } from '@/services/radars/types'

export type DeleteRadarProps = {
  radar: Radar
  onClose: () => void
  onDelete: () => void
}
