import React from 'react'
interface RightIconsProps {
  children?: React.ReactNode
}

export const RightIcons: React.FC<RightIconsProps> = ({ children }) => {
  return (
    <div className=' absolute right-2 top-0 flex h-full items-center gap-1'>
      {children}
    </div>
  )
}
