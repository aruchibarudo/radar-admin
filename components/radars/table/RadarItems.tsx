import { useEffect, useState } from 'react'

import { Button } from '@consta/uikit/Button'
import { Table } from '@consta/uikit/Table'
import { Text } from '@consta/uikit/Text'
import { IconAdd } from '@consta/icons/IconAdd'

import EditRadarItemForm from '@/components/radars/form/item/EditRadarItemForm'
import DeleteRadarItem from '@/components/radars/table/actions/delete/DeleteRadarItem'
import {
  ItemActionType,
  ItemMenuState,
} from '@/components/radars/table/actions/types'
import {
  RadarItemMenuState,
  RadarItemsProps,
} from '@/components/radars/table/types'
import { getItemColumns, transformItems } from '@/components/radars/table/utils'
import { getRadarItemId } from '@/components/radars/utils'
import { useModal } from '@/components/ui/modal/hooks'
import { useSnackbar } from '@/components/ui/snackbar/hooks'
import { SnackbarAddProps } from '@/components/ui/snackbar/types'
import Stack from '@/components/ui/Stack'
import { H2 } from '@/components/ui/Text'
import { deleteRadarItem } from '@/services/radars/radarService'
import { RadarItem } from '@/services/radars/types'

const RadarItems = ({ data, refetch }: RadarItemsProps) => {
  const { addSnackbar } = useSnackbar()
  const { setModal, closeModal } = useModal()
  const [menuState, setMenuState] = useState<ItemMenuState>({})

  const { items, ...radar } = data

  const handleDeleteItem = async ({ id }: Pick<RadarItem, 'id'>) => {
    try {
      await deleteRadarItem({ id })
      await refetch()

      addSnackbar({ message: 'Элемент успешно удален', status: 'success' })
    } catch (e) {
      console.log('delete item:', e)

      addSnackbar({
        message: 'Возникла ошибка при удалении элемента',
        status: 'alert',
      })
    } finally {
      closeModal()
    }
  }

  const handleMenuState = ({
    isOpen,
    action,
    data: item,
  }: RadarItemMenuState) => {
    const itemId = item.id
    const baseItemId = getRadarItemId(itemId)

    setMenuState((prevState) => ({
      ...prevState,
      [itemId]: { ...prevState[itemId], isOpen, action, data: item },
    }))

    if (action === ItemActionType.Edit) {
      setModal({
        title: 'Редактирование элемента радара',
        content: (
          <EditRadarItemForm
            radar={radar}
            itemId={baseItemId}
            addSnackbar={handleSnackbar}
          />
        ),
      })
    }

    if (action === ItemActionType.Remove) {
      setModal({
        title: 'Удалить элемент',
        content: (
          <DeleteRadarItem
            item={item}
            onDelete={() => handleDeleteItem({ id: baseItemId })}
            onClose={closeModal}
          />
        ),
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
