import { TableColumn } from '@consta/uikit/Table'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconRemove } from '@consta/icons/IconRemove'

import { getProbationResultLabel } from '@/components/radars/form/utils'
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

const MAX_DESCRIPTION_LENGTH = 120

export const transformItemId = ({ id, quadrant }: RadarItem) =>
  `${id}_${quadrant}`

export const transformItems = (items: RadarItem[]): RadarItemColumn[] => {
  return items.map((item) => ({
    ...item,
    description:
      item.description.length > MAX_DESCRIPTION_LENGTH
        ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
        : item.description,
    id: transformItemId(item),
    ru: item.ru ? 'Да' : 'Нет',
    probation_result: getProbationResultLabel(item.probation_result),
    action: null,
  }))
}

const getItemColumnKeys = (item: RadarItem) => {
  const enumKeys = Object.keys(ItemColumnTitles) as Array<
    keyof typeof ItemColumnTitles
  >

  const itemKeys = Object.keys(item) as Array<keyof typeof ItemColumnTitles>

  return itemKeys.sort((a, b) => enumKeys.indexOf(a) - enumKeys.indexOf(b))
}

export const getItemColumns = ({
  items,
  setMenuState,
  menuState,
}: ItemColumnsParams) => {
  if (!items.length) {
    return []
  }

  const columnKeys = getItemColumnKeys(items[0])

  const columns = columnKeys.map((key) => ({
    title: ItemColumnTitles[key],
    accessor: key,
    sortable: key === 'name',
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
