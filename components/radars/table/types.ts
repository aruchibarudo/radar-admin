import { ItemActionType } from '@/components/radars/table/actions/types'
import { RadarItem } from '@/services/radars/types'

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

export type RadarItemColumn = RadarItem & { actions: string }

export type RadarItemsProps = {
  data: RadarItemColumn[]
}

export type RadarItemMenuState = {
  isOpen: boolean
  data: RadarItem
  action?: ItemActionType
}
