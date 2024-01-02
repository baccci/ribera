import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface HorizontalLineProps {
  className?: string
}

export const HorizontalLine: React.FC<HorizontalLineProps> = ({ className }) => {
  return (
    <div className={cn('h-[1px] w-full my-2 bg-line',
      className
    )}/>
  )
}
