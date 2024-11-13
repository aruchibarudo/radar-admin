import { Filters } from '@consta/uikit/__internal__/src/components/Table/filtering'
import { TableTextFilter } from '@consta/uikit/Table'

import { ItemFilter } from '@/components/radars/table/filters/types'
import { RadarItemColumn } from '@/components/radars/table/types'
import { transformItemId } from '@/components/radars/table/utils'
import { RadarItem } from '@/services/radars/types'

export const getItemFilterNames = (items: RadarItem[]) =>
  items.map((item) => ({
    name: `${item.name} (${item.quadrant})`,
    value: item.name,
    key: transformItemId(item),
  }))

export const getItemFilters = (
  items: ItemFilter[],
): Filters<RadarItemColumn> => [
  {
    id: 'name',
    name: 'Имя: ',
    field: 'name',
    filterer: (cellValue, filterValues: ItemFilter[]) =>
      filterValues.some(
        (filterValue) => filterValue && filterValue.value === cellValue,
      ),
    component: {
      name: TableTextFilter,
      props: {
        withSearch: true,
        items,
      },
    },
  },
]
