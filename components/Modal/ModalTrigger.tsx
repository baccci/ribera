import React from 'react'
import { useModalContext } from './hooks'

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement>{ 
  children: React.ReactNode, 
  className?: string,
  tabIndex?: number,
  eventKey?: string | string[],
  [key: string]: any
}

export const Trigger = ({ 
  children, 
  className, 
  tabIndex = 0,
  eventKey,
  ...other 
}: TriggerProps) => {
  const { setUncontrolledOpen } = useModalContext()
  const ref = React.useRef<HTMLDivElement>(null)

  const handleOpen = () => setUncontrolledOpen(true)

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!eventKey && (event.key === 'Enter' || event.key === ' ')) {
      return handleOpen()
    }
    
    if (typeof eventKey === 'string' && event.key === eventKey) return handleOpen()
    
    if (Array.isArray(eventKey) && eventKey.includes(event.key)) return handleOpen()
  }

  return (
    <div 
      role='button'
      tabIndex={tabIndex}
      className={className} 
      onClick={handleOpen} 
      ref={ref}
      onKeyDown={onKeyDown}
      {...other} 
    >
      {children}
    </div>
  )
}
Trigger.displayName = 'Trigger'