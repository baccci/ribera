import type React from 'react'

interface CartQuantityIndicatorProps {
  quantity: number
}

export const CartQuantityIndicator: React.FC<CartQuantityIndicatorProps> = ({ quantity }) => {
  return (
    <span
      className={`absolute bottom-[-2px] right-[-4px] rounded-full px-[5px] box-border
    bg-red-500 text-white text-[12px] font-bold flex items-center justify-center user-select-none`}
    >
      {quantity}
    </span>
  )
}