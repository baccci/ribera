'use client'
import React from 'react'
import { useTextInputContext } from './hooks'
import { cn } from '@lib/tailwindClassMerge'
import { Label } from './Label'
import { Hint } from './Hint'

export interface InputWrapperProps {
  children?: React.ReactNode
}

export const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => {
  const { wrapperClassName, id, label, hint } = useTextInputContext()

  const returnJustChildren = !hint && (!label || !id)

  if (returnJustChildren) return <IconWrapper>{children}</IconWrapper>
  return (
    <div className={cn('flex flex-col gap-[6px] text-slate-700', wrapperClassName)}>
      <Label />
        <IconWrapper>
          {children}
        </IconWrapper>
      <Hint />
    </div>
  )
}

interface IconWrapperProps {
  children?: React.ReactNode
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  const { icon, showPasswordButton, error } = useTextInputContext()

  if (!icon && !showPasswordButton && !error) return <>{children}</>
  return (
    <div className='relative'>
      {children}
    </div>
  )
}
