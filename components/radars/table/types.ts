import { ItemActionType } from '@/components/radars/table/actions/types'
import { Radar, RadarItem } from '@/services/radars/types'
import { Refetch } from '@/types/useQuery'

export enum ItemColumnTitles {
  id = 'ID',
  name = 'Имя',
  description = 'Описание',
  ring = 'Ринг',
  ru = 'Российский продукт',
  probation_result = 'Результат тестирования',
  quadrant = 'Квадрант',
  actions = 'Действие',
}

export type RadarItemColumn = RadarItem & { actions?: string }

export type RadarItemsProps = {
  data: Radar
} & Refetch

export type RadarItemMenuState = {
  isOpen: boolean
  data: RadarItem
  action?: ItemActionType
}
