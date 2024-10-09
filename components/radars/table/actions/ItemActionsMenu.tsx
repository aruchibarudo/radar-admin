import { useRef } from 'react'

import { Button } from '@consta/uikit/Button'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconKebab } from '@consta/icons/IconKebab'

import { ItemActionsMenuProps } from '@/components/radars/table/actions/types'

const ItemActionsMenu = ({
  isOpen,
  onOpen,
  onClose,
  actionItems,
}: ItemActionsMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button
        type="button"
        ref={buttonRef}
        size="xs"
        view="clear"
        iconLeft={IconKebab}
        onlyIcon
        onClick={onOpen}
      />

      <ContextMenu
        isOpen={isOpen}
        anchorRef={buttonRef}
        size="s"
        offset={4}
        items={actionItems}
        getItemLabel={(item) => item.label}
        getItemLeftIcon={(item) => item.icon}
        getItemOnClick={(item) => {
          return (e) => onClose(e, item.action)
        }}
        direction="downRight"
        possibleDirections={['upLeft', 'downLeft', 'downRight']}
        onClickOutside={onClose}
      />
    </>
  )
}

export default ItemActionsMenu
