import React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

type RadixCloseProps = RadixPopover.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>

type PopoverCloseProps = RadixCloseProps

export const PopoverClose: React.FC<PopoverCloseProps> = ({ ...rest }) => {
  return (
    <RadixPopover.Close {...rest}/>
  )
}

PopoverClose.displayName = 'PopoverClose'