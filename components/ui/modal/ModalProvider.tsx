'use client'

import { createContext, useState } from 'react'

import { Modal } from '@consta/uikit/Modal'

import {
  ModalContextProps,
  ModalContextProviderType,
  ModalContextType,
} from '@/components/ui/modal/types'
import { H2 } from '@/components/ui/Text'
import { Children } from '@/types/nextParams'

export const ModalContext = createContext<ModalContextType>({
  setModal: () => {},
  closeModal: () => {},
})
ModalContext.displayName = 'ModalContext'

const ModalProvider = ({ children }: Children) => {
  const [modals, setModals] = useState<ModalContextProviderType[]>([])

  const setModal = ({
    title,
    content,
    modalProps,
    queued = true,
  }: ModalContextProps) => {
    const newModal = { isOpen: true, title, content, modalProps }

    if (queued) {
      setModals((prev) => [...prev, newModal])
    } else {
      setModals((prev) => [...prev.slice(0, prev.length - 1), newModal])
    }
  }

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1))
  }

  const value = { setModal, closeModal }

  return (
    <ModalContext.Provider value={value}>
      {children}

      {modals.map((modal, index) => (
        <Modal
          key={index}
          isOpen={modal.isOpen}
          onClickOutside={closeModal}
          {...modal.modalProps}
        >
          <div className="p-4">
            {modal.title && <H2>{modal.title}</H2>}

            {modal.content}
          </div>
        </Modal>
      ))}
    </ModalContext.Provider>
  )
}

export default ModalProvider
