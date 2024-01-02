'use client'
import React from 'react'
import { useModalContext } from './hooks'
import { XButton } from '../XButton'
import { cn } from '@/lib/tailwindClassMerge'

interface TopCloseButtonProps {
  className?: string
}

export const TopCloseButton: React.FC<TopCloseButtonProps> = ({ className }) => {
  const { closeFn, setUncontrolledOpen } = useModalContext()
  const closeFunction = () => closeFn || (setUncontrolledOpen(false))

  return (
    <div className='relative'>
      <div className={cn('absolute right-0 top-0 cursor-pointer', className)} role='button' aria-label='Close modal'>
        <XButton func={closeFunction} />
      </div>
    </div>
  )
}
TopCloseButton.displayName = 'TopCloseButton'
