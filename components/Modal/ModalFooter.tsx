import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> { 
  children: React.ReactNode, 
  className?: string,
  [key: string]: any 
}

export const Footer = ({ children, className, ...other }: FooterProps) => {
  
  return (
    <div className={cn('flex gap-2 mt-8', className)} {...other}>
      {children}
    </div>
  )
}
Footer.displayName = 'Footer'