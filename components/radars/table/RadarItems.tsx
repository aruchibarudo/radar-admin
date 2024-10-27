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
import { getItemColumns, transformItems } from '@/components/radars/table/utils'
import { useModal } from '@/components/ui/modal/hooks'
import { useSnackbar } from '@/components/ui/snackbar/hooks'
import { SnackbarAddProps } from '@/components/ui/snackbar/types'
import Stack from '@/components/ui/Stack'
import { H2 } from '@/components/ui/Text'

const RadarItems = ({ data, refetch }: RadarItemsProps) => {
  const { addSnackbar } = useSnackbar()
  const { setModal, closeModal } = useModal()
  const [menuState, setMenuState] = useState<ItemMenuState>({})

  const { items, ...radar } = data

  const handleMenuState = ({
    isOpen,
    action,
    data: item,
  }: RadarItemMenuState) => {
    const itemId = item.id
    setMenuState((prevState) => ({
      ...prevState,
      [itemId]: { ...prevState[itemId], isOpen, action, data: item },
    }))

    const [baseId] = itemId.split('_')

    if (action === ItemActionType.Edit) {
      setModal({
        title: 'Редактирование элемента радара',
        content: (
          <EditRadarItemForm
            radar={radar}
            itemId={baseId}
            addSnackbar={handleSnackbar}
          />
        ),
      })
    }

    if (action === ItemActionType.Remove) {
      setModal({
        title: 'Удалить элемент',
        content: `Вы действительно хотите удалить ${data.name}?`,
      })
    }
  }

  const handleSnackbar = async ({ message, status }: SnackbarAddProps) => {
    addSnackbar({ message, status })
    closeModal()
    await refetch()
  }

  useEffect(() => {
    console.log('menuState', menuState)
  }, [menuState])

  const columns = getItemColumns({
    items,
    setMenuState: handleMenuState,
    menuState,
  })

  return (
    <>
      <H2>Элементы радара</H2>
      {items.length ? (
        <Table rows={transformItems(items)} columns={columns} />
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
