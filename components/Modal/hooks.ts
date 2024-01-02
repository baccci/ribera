import React, { useEffect, useState } from 'react'
import type { ModalProps } from './Modal'

interface ModalHookProps extends Omit<ModalProps, 'className'> {
  headerId: string,
  bodyId: string,
  usingIcon?: boolean,
}

export const useModal = (props: ModalHookProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = props.open ?? uncontrolledOpen

  useDisableDocumentScroll(props.disableScroll, open)

  return { open, setUncontrolledOpen, ...props }
}

type ModalContextType = ReturnType<typeof useModal>

export const ModalContext = React.createContext<ModalContextType | null>(null)

export const useModalContext = () => {
  const context = React.useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }

  return context
}

export const useDisableDocumentScroll = (disableScroll?: boolean, open?: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (disableScroll && open) {
      document.body.style.overflow = 'hidden'
      return
    }

    document.body.style.overflow = 'auto'
  }, [disableScroll, open])
}