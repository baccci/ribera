import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'
import { useTextInputContext } from './hooks'

interface IconProps {
  icon?: React.ReactNode
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
  const { focus } = useTextInputContext()

  const handleInputFocus = () => focus()

  if (!icon) return null
  return (
    <div className={cn('absolute h-full flex items-center ml-2')} onClick={handleInputFocus}>
      {icon}
    </div>
  )
}
