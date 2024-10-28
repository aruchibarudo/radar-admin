import clsx from 'clsx'

import { StackProps } from '@/components/ui/container/types'
import {
  alignItemsMap,
  justifyContentMap,
  spacingMap,
} from '@/components/ui/container/utils'

const Stack = ({
  spacing = 'm',
  direction = 'column',
  alignItems,
  justifyContent,
  children,
  className,
}: StackProps) => {
  return (
    <div
      className={clsx(
        'flex w-full',
        direction === 'row' ? 'flex-row' : 'flex-col',
        spacingMap[spacing],
        alignItems && alignItemsMap[alignItems],
        justifyContent && justifyContentMap[justifyContent],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Stack
