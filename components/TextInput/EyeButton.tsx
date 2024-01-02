'use client'
import React from 'react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

interface EyeButtonProps {
  type: 'text' | 'password' | 'email' | 'number'
  showPasswordButton?: boolean
  setType?: React.Dispatch<React.SetStateAction<'text' | 'password' | 'email' | 'number'>>
}

export const EyeButton: React.FC<EyeButtonProps> = ({
  type,
  showPasswordButton,
  setType
}) => {

  const handleClick = () => {
    if(!setType) return
    setType(currentState => {
      if(currentState === 'password') return 'text'
      if(currentState === 'text') return 'password'
      return currentState
    })
  }

  const props = {
    size: 20,
    onClick: handleClick
  }

  const Icon = {
    text: <IconEyeClosed {...props}/>,
    password: <IconEye {...props}/>,
    email: null,
    number: null
  }[type]

  if(!showPasswordButton) return null
  return (
    <div className={`rounded-md text-slate-500 p-1
      transition-colors cursor-pointer hover:bg-slate-100 select-none`}
    >
      {Icon}
    </div>
  )
}
