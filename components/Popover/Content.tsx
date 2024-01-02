import React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { cn } from '@/lib/tailwindClassMerge'

type RadixContentProps = RadixPopover.PopoverContentProps & React.RefAttributes<HTMLDivElement>

interface PopoverContentProps extends RadixContentProps{
  children: React.ReactNode
  className?: string
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ children, className, ...rest }) => {
  return (
    <RadixPopover.Content className={cn('', className)} {...rest}>
      {children}
    </RadixPopover.Content>
  )
}
PopoverContent.displayName = 'PopoverContent'