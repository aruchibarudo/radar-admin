import { RadarItem } from '@/services/radars/types'

export type DeleteRadarItemProps = {
  item: RadarItem
  onClose: () => void
  onDelete: () => void
}
