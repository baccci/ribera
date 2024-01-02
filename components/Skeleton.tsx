import { cn } from '@/lib/tailwindClassMerge'
import type React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean
}

export const Skeleton: React.FC<Props> = ({ className, rounded, ...props }) => {
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md'
  
  return (
    <div
      className={cn(`animate-pulse ${roundedClass} bg-muted`, className)}
      {...props}
    />
  )
}
