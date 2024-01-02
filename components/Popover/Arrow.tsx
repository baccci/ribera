import React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

type RadixArrowProps = RadixPopover.PopoverArrowProps & React.RefAttributes<SVGSVGElement>

type PopoverArrowProps = RadixArrowProps

export const PopoverArrow: React.FC<PopoverArrowProps> = ({ ...rest }) => {
  return (
    <RadixPopover.Arrow {...rest}/>
  )
}

PopoverArrow.displayName = 'PopoverArrow'