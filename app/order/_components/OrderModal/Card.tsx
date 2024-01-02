import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { cn } from '@/lib/tailwindClassMerge'
import React, { useMemo } from 'react'

interface CardProps {
  children: React.ReactNode
  show?: boolean
  className?: string
}

export const Card = ({ children, show = true, className }: CardProps) => {
  const title = useMemo(() => getChildrenOnDisplayName(children, 'Title'), [children])
  const value = useMemo(() => getChildrenOnDisplayName(children, 'Value'), [children])

  if (!show) return null
  return (
    <div className={cn('rounded-xl border-input border px-4 py-3', className)}>
      {title}
      {value}
    </div>
  )
}

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <div className={cn('text-sm font-semibold text-slate-600', className)}>
      {children}
    </div>
  )
}
Title.displayName = 'Title'
Card.Title = Title

interface ValueProps {
  children: React.ReactNode
  className?: string
}

export const Value: React.FC<ValueProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
Value.displayName = 'Value'
Card.Value = Value
