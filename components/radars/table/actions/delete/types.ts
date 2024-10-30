import { RadarItemColumn } from '@/components/radars/table/types'

export type DeleteRadarItemProps = {
  item: RadarItemColumn
  onClose: () => void
  onDelete: () => void
}
