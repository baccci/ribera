import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import { useModalContext } from './hooks'
import { Balancer } from '../Balancer'

interface BodyProps { 
  children: React.ReactNode, 
  className?: string,
  balanceText?: boolean
}

export const Body = ({ children, className, balanceText, ...other }: BodyProps) => {
  const { bodyId } = useModalContext()

  return (
    <div 
      className={cn('text-slate-500 text-sm leading-5', className)}
      id={`ribera-body${bodyId}`}
      {...other}
    >
      <Balancer balance={balanceText}>
        {children}
      </Balancer>
    </div>
  )
}
Body.displayName = 'Body'