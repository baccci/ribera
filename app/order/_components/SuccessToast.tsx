import { SuccessCircleIcon } from '@/components/Icons'
import { CONFIRMATION_TOAST_BG_COLOR, CONFIRMATION_TOAST_MESSAGE } from './constants'
import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface SuccessToastProps {
  paid: boolean
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ paid }) => {
  const phrase = paid ? CONFIRMATION_TOAST_MESSAGE.paid : CONFIRMATION_TOAST_MESSAGE.unpaid
  const circleColor = paid ? undefined : CONFIRMATION_TOAST_BG_COLOR.unpaid.normal.color
  
  return (
    <div className={cn('rounded-full flex gap-2 items-center px-3 py-2 bg-light-yellow', { [CONFIRMATION_TOAST_BG_COLOR.paid.light.class]: paid })}>
      <SuccessCircleIcon size={18} color={circleColor}/>
      <p className='text-sm font-semibold'>
        {phrase}
      </p>
    </div>
  )
}
