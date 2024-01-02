'use client'
import React, { useRef } from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import { createPortal } from 'react-dom'
import { useModalContext } from './hooks'
import { useClickComparison } from '@/hooks/useClickComparison'

interface OverlayProps {
  children: React.ReactNode
  className?: string
}

export const Overlay: React.FC<OverlayProps> = ({ children, className }) => {
  const {
    headerId,
    bodyId,
    open,
    canCloseFromOutside,
    closeFn,
    setUncontrolledOpen,
    blur,
    centered,
    mobileCentered
  } = useModalContext()

  const overlayRef = useRef<HTMLDivElement>(null)
  const { isClicked } = useClickComparison(overlayRef)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!isClicked) return
    if (!canCloseFromOutside) return
    if (closeFn) return closeFn()
    setUncontrolledOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      if (!canCloseFromOutside) return
      if (closeFn) return closeFn()

      setUncontrolledOpen(false)
    }
  }

  if (!open) return null

  return (
    createPortal(
      <div
        className={
          cn(
            'fixed top-0 bottom-0 left-0 right-0 bg-overlay flex z-[3] animate-overlay-show',
            { 'sm:justify-center sm:items-center': centered },
            { 'justify-center items-center': mobileCentered },
            className,
            { 'backdrop-filter backdrop-blur-sm': blur }
          )
        }
        role='dialog'
        aria-label='dialog'
        aria-labelledby={`ribera-header${headerId}`}
        aria-describedby={`ribera-body${bodyId}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={overlayRef}
      >
        {children}
      </div>
      , document.body
    )
  )
}
