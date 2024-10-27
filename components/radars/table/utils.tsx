import { TableColumn } from '@consta/uikit/Table'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconRemove } from '@consta/icons/IconRemove'

import ItemActionsMenu from '@/components/radars/table/actions/ItemActionsMenu'
import {
  ItemActionType,
  ItemColumnsParams,
} from '@/components/radars/table/actions/types'
import {
  ItemColumnTitles,
  RadarItemColumn,
} from '@/components/radars/table/types'
import { RadarItem } from '@/services/radars/types'

export const transformItemId = ({ id, quadrant }: RadarItem) =>
  `${id}_${quadrant}`

export const transformItems = (items: RadarItem[]) => {
  return items.map((item) => ({
    ...item,
    id: transformItemId(item),
    action: null,
  }))
}

export const getItemColumns = ({
  items,
  setMenuState,
  menuState,
}: ItemColumnsParams) => {
  if (!items.length) {
    return []
  }

  const firstItem = items[0]
  const keys = Object.keys(firstItem) as Array<keyof typeof ItemColumnTitles>

  const columns = keys.map((key) => ({
    title: ItemColumnTitles[key],
    accessor: key,
  })) as TableColumn<RadarItemColumn>[]

  columns.push({
    title: ItemColumnTitles.actions,
    accessor: 'actions',
    renderCell: (row) => {
      const rowState = menuState[row.id]
      return (
        <ItemActionsMenu
          isOpen={rowState?.isOpen || false}
          onOpen={(e, action) =>
            setMenuState({ data: row, action, isOpen: true })
          }
          onClose={(e, action) => {
            setMenuState({ data: row, action, isOpen: false })
          }}
          actionItems={[
            {
              label: 'Редактировать',
              action: ItemActionType.Edit,
              icon: IconEdit,
            },
            {
              label: 'Удалить',
              action: ItemActionType.Remove,
              icon: IconRemove,
            },
          ]}
        />
      )
    },
  })

  return columns
}
