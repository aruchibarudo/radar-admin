import { useEffect, useState } from 'react'

import { Button } from '@consta/uikit/Button'
import { Table } from '@consta/uikit/Table'
import { Text } from '@consta/uikit/Text'
import { IconAdd } from '@consta/icons/IconAdd'

import EditRadarItemForm from '@/components/radars/form/item/EditRadarItemForm'
import {
  ItemActionType,
  ItemMenuState,
} from '@/components/radars/table/actions/types'
import {
  RadarItemMenuState,
  RadarItemsProps,
} from '@/components/radars/table/types'
import { getItemColumns } from '@/components/radars/table/utils'
import { useModal } from '@/components/ui/modal/hooks'
import Stack from '@/components/ui/Stack'
import { H2 } from '@/components/ui/Text'

const RadarItems = ({ data }: RadarItemsProps) => {
  const { setModal } = useModal()
  const [menuState, setMenuState] = useState<ItemMenuState>({})

  const handleMenuState = ({ isOpen, action, data }: RadarItemMenuState) => {
    const rowId = data.id
    setMenuState((prevState) => ({
      ...prevState,
      [rowId]: { ...prevState[rowId], isOpen, action, data },
    }))

    if (action === ItemActionType.Edit) {
      setModal({
        title: 'Редактирование элемента радара',
        // content: data.description,
        content: <EditRadarItemForm data={data} />,
      })
    }

    if (action === ItemActionType.Remove) {
      setModal({
        title: 'Удалить элемент',
        content: `Вы действительно хотите удалить ${data.name}?`,
      })
    }
  }

  useEffect(() => {
    console.log('menuState', menuState)
  }, [menuState])

  const columns = getItemColumns({
    items: data,
    setMenuState: handleMenuState,
    menuState: menuState,
  })

  return (
    <>
      <H2>Элементы радара</H2>
      {data.length ? (
        <Table rows={data} columns={columns} />
      ) : (
        <Stack direction="row" className="items-center">
          <Text as="p">Элементы отсутствуют</Text>
          <Button label="Добавить" view="clear" iconLeft={IconAdd} />
        </Stack>
      )}
    </>
  )
}

export default RadarItems
