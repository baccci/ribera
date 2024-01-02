import { cn } from '@/lib/tailwindClassMerge'
import React, { DetailedHTMLProps } from 'react'

interface TabContentProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string
  className?: string
  [key: string]: any
}

export const TabContent: React.FC<TabContentProps> = ({ children, value, className, ...other }) => {
  return (
    <div className={cn('w-full mt-4', className)} {...other}>
      {children}
    </div>
  )
}
TabContent.displayName = 'TabContent'