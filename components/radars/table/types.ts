import { ItemActionType } from '@/components/radars/table/actions/types'
import { Radar, RadarItem } from '@/services/radars/types'
import { Refetch } from '@/types/useQuery'

export enum ItemColumnTitles {
  id = 'ID',
  name = 'Имя',
  description = 'Описание',
  ring = 'Ринг',
  quadrant = 'Квадрант',
  ru = 'Отечественное решение',
  probation_result = 'Результат тестирования',
  actions = 'Действие',
}

export type RadarItemColumn = Omit<RadarItem, 'ru' | 'probation_result'> & {
  actions?: string
  ru: string
  probation_result: string
}

export type RadarItemsProps = {
  data: Omit<Radar, 'items'> & {
    items: RadarItem[]
  }
} & Refetch

export type RadarItemMenuState = {
  isOpen: boolean
  data: RadarItemColumn
  action?: ItemActionType
}
