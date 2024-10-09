import React from 'react'

import { Text } from '@consta/uikit/Text'

import { Children } from '@/types/nextParams'

export const H1 = ({ children }: Children) => {
  return (
    <Text as="h1" size="3xl">
      {children}
    </Text>
  )
}

export const H2 = ({ children }: Children) => {
  return (
    <Text as="h2" size="2xl">
      {children}
    </Text>
  )
}

export const H3 = ({ children }: Children) => {
  return (
    <Text as="h3" size="xl">
      {children}
    </Text>
  )
}
