import clsx from 'clsx'

import { Children } from '@/types/nextParams'

type StackProps = Children & {
  spacing?: number
  direction?: 'row' | 'column'
  className?: string
}

const Stack = ({
  spacing = 16,
  direction = 'column',
  children,
  className,
}: StackProps) => {
  const style = {
    flexDirection: direction,
    gap: `${spacing}px`,
  }

  return (
    <div className={clsx('flex', className)} style={style}>
      {children}
    </div>
  )
}

export default Stack
