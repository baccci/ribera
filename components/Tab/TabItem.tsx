import React, { type DetailedHTMLProps, MouseEventHandler } from 'react'
import { useTabContext } from './hooks'
import { cn } from '@/lib/tailwindClassMerge'

interface TabItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  value: string
  children?: React.ReactNode
  className?: string
}

export const TabItem: React.FC<TabItemProps> = ({ value, children, className, onClick, ...other }) => {
  const { activeTab, setActiveTab } = useTabContext()
  const dataState = activeTab === value ? 'active' : 'inactive'

  const handleSetActiveTab = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    setActiveTab(value)
    onClick?.(e as React.MouseEvent<HTMLButtonElement>)
  }

  return (
    <button
      data-state={dataState}
      role='tab'
      type='button'
      aria-selected={dataState === 'active'}
      className={cn(`py-1.5 px-2.5 rounded-lg data-[state=active]:bg-white text-[16px] text-slate-500 font-medium
        data-[state=active]:shadow-sm data-[state=active]:text-slate-800
        transition-all duration-200 hover:bg-white 
      `, className)}
      onClick={handleSetActiveTab}
      value={value}
      {...other}
    >
      {children || value}
    </button>
  )
}
TabItem.displayName = 'TabItem'