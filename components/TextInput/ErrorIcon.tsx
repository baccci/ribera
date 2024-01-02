import React from 'react'
import { IconSquareRoundedX } from '@tabler/icons-react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ErrorIconProps {
  error?: string | null
  errorDisplay?: 'tooltip' | 'text' | 'bottom' | 'none'
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ error, errorDisplay }) => {

  if (!error) return null
  return (
    <div className='flex items-center'>
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen={errorDisplay === 'tooltip'}>
          <Tooltip.Trigger asChild>
            <IconSquareRoundedX className='text-red-500' />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className='z-10 verflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'>
              {error}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}
