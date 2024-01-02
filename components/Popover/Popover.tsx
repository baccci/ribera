import React, { useMemo } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { PopoverContext, usePopover } from './hooks'
import { PopoverTrigger } from './Trigger'
import { PopoverContent } from './Content'
import { PopoverArrow } from './Arrow'
import { PopoverClose } from './CloseButton'

export interface PopoverProps extends RadixPopover.PopoverProps {
  children: React.ReactNode
}

export const Popover = ({ children, ...props }: PopoverProps) => {
  const popover = usePopover(props)

  const trigger = useMemo(() => getChildrenOnDisplayName(children, 'PopoverTrigger'), [children])
  const content = useMemo(() => getChildrenOnDisplayName(children, 'PopoverContent'), [children])

  return (
    <PopoverContext.Provider value={popover} {...props}>
      <RadixPopover.Root>
        {trigger}
        <RadixPopover.Portal>
          <RadixPopover.Content>
            {content}
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </PopoverContext.Provider>
  )
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Arrow = PopoverArrow
Popover.Close = PopoverClose