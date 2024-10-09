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

export const getItemColumns = ({
  items,
  setMenuState,
  menuState,
}: ItemColumnsParams): TableColumn<RadarItemColumn>[] => {
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
      return (
        <ItemActionsMenu
          isOpen={menuState[row.id]?.isOpen || false}
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
