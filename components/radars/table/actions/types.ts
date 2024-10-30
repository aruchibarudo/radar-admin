import React, { RefObject } from 'react'

import { IconComponent } from '@consta/icons/Icon'

import { RadarItemMenuState } from '@/components/radars/table/types'
import { RadarItem } from '@/services/radars/types'

export enum ItemActionType {
  Edit = 'edit',
  Remove = 'remove',
}

export type ItemAction = {
  label: string
  action: ItemActionType
  icon: IconComponent<'span'>
}

type ItemActionHandler = (
  e: React.MouseEvent<Element> | MouseEvent,
  action?: ItemActionType,
) => void
export type ItemActionsMenuProps = {
  isOpen: boolean
  onOpen: ItemActionHandler
  onClose: ItemActionHandler
  actionItems: ItemAction[]
}

export type ItemColumnsParams = {
  items: RadarItem[]
  setMenuState: ({ data, action, isOpen }: RadarItemMenuState) => void
  menuState: ItemMenuState
}

export type ItemMenuState = {
  [key: string]: {
    isOpen: boolean
    ref: RefObject<HTMLButtonElement>
    data: RadarItem
  }
}
