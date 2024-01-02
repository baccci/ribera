'use client'

import React, { useId, useMemo } from 'react'
import { ModalContext, useModal } from './hooks'
import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { Overlay, Body, Footer, Header, Icon, Trigger } from '.'
import { cn } from '@/lib/tailwindClassMerge'
import { TopCloseButton } from './TopCloseButton'
import { FocusTrap } from './Root'
import { CloseButton } from './CloseButton'

export interface ModalProps {
  children: React.ReactNode
  closeButton?: boolean
  closeFn?: () => void
  canCloseFromOutside?: boolean
  open?: boolean
  className?: string
  blur?: boolean
  disableFocusTrap?: boolean
  disableScroll?: boolean
  centered?: boolean
  mobileCentered?: boolean
}

export const Modal = ({
  canCloseFromOutside = true,
  blur = true,
  closeFn,
  disableFocusTrap,
  disableScroll = true,
  centered = true,
  mobileCentered = false,
  ...props
}: ModalProps) => {
  const { children, className } = props
  const headerId = useId()
  const bodyId = useId()

  const icon = useMemo(() => getChildrenOnDisplayName(children, 'Icon'), [children])
  const trigger = useMemo(() => getChildrenOnDisplayName(children, 'Trigger'), [children])
  const header = useMemo(() => getChildrenOnDisplayName(children, 'Header'), [children])
  const body = useMemo(() => getChildrenOnDisplayName(children, 'Body'), [children])
  const footer = useMemo(() => getChildrenOnDisplayName(children, 'Footer'), [children])
  const close = useMemo(() => getChildrenOnDisplayName(children, 'TopCloseButton'), [children])

  const usingIcon = icon?.length > 0

  const modal = useModal({
    headerId,
    bodyId,
    canCloseFromOutside,
    blur,
    usingIcon,
    closeFn,
    disableScroll,
    centered,
    mobileCentered,
    ...props
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  return (
    <ModalContext.Provider value={modal}>
      {trigger && trigger}
      <Overlay>
        <FocusTrap disableFocusTrap={disableFocusTrap}>
          <div
            className={
              cn(`sm:rounded-2xl bg-white flex flex-col p-5 sm:p-8 sm:justify-normal sm:relative 
                overflow-x-hidden sm:max-w-lg animate-card-show
                fixed top-0 bottom-0 left-0 right-0`,
                { 'justify-center': mobileCentered },
                className)
            }
            onClick={handleClick}
          >
            {close && close}
            {icon && icon}
            {header && header}
            {body && body}
            {footer && footer}
          </div>
        </FocusTrap>
      </Overlay>
    </ModalContext.Provider>
  )
}

Modal.Trigger = Trigger
Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer
Modal.Icon = Icon
Modal.CloseButton = CloseButton
Modal.TopCloseButton = TopCloseButton
