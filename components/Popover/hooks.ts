import React from 'react'
import { PopoverProps } from './Popover'

type Popover = Omit<PopoverProps, 'children'>

export const usePopover = (props: Popover) => {
  return props
}

type PopoverContextType = ReturnType<typeof usePopover> | null

export const PopoverContext = React.createContext<PopoverContextType>(null)

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext)

  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component')
  }

  return context
}