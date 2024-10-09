import { ReactNode } from 'react'

export type PageParams<T extends string = string> = {
  params: Record<T, string>
}

export type Children = { children: ReactNode }
