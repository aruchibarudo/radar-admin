import { useContext } from 'react'

import { ModalContext } from '@/components/ui/modal/ModalProvider'
import { ModalContextType } from '@/components/ui/modal/types'

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}
