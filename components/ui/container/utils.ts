export const spacingMap = {
  xs: 'gap-1',
  s: 'gap-2',
  m: 'gap-4',
  l: 'gap-6',
  xl: 'gap-8',
}

export const alignItemsMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const

export const justifyContentMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
} as const
