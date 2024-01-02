import React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { cn } from '@/lib/tailwindClassMerge'

type RadixTriggerProps = RadixPopover.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>

interface PopoverTriggerProps extends RadixTriggerProps{
  children: React.ReactNode
  className?: string
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, className, ...rest }) => {
  return (
    <RadixPopover.Trigger className={cn('', className)} {...{ rest }}>
      {children}
    </RadixPopover.Trigger>
  )
}
PopoverTrigger.displayName = 'PopoverTrigger'