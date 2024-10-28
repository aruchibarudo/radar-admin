import { Children } from '@/types/nextParams'

export type StackProps = Children & {
  spacing?: 'xs' | 's' | 'm' | 'l' | 'xl'
  direction?: 'row' | 'column'
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  className?: string
}
