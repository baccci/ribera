import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface ModalIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

export const Icon: React.FC<ModalIconProps> = ({ children, className, ...other }) => {
  return (
    <div className={cn('mb-5', className)} {...other}>
      {children}
    </div>
  )
}
Icon.displayName = 'Icon'
