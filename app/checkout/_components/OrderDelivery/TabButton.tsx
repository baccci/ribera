import { Button } from '@/components/Button'
import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface TabButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  active: boolean
}

export const TabButton: React.FC<TabButtonProps> = ({ onClick, children, active }) => {
  return (
    <Button
      onClick={onClick}
      className={cn('bg-gray2 hover:bg-gray2 rounded-full max-h-[36px] px-4 relative overflow-hidden group isolate',
        { 'bg-yellow hover:bg-yellow': active }
      )}
    >
      <div className={cn('absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-[#ff593f] opacity-[0.2] blur-md transition-all duration-300 group-hover:h-2/3 group-hover:opacity-[35%] z-0',
        { 'bg-slate-950': !active }
      )}
      />
      <div className='z-[1]'>
        {children}
      </div>
    </Button>
  )
}
