'use client'
import React from 'react'
import { CartButtonContext, useCartButton } from './hooks'
import { CartMobile } from './CartMobile'
import { CartPopover } from './CartPopover'

export const CartButton: React.FC = () => {
  const cartButton = useCartButton()

  return (
    <CartButtonContext.Provider value={cartButton}>
      <CartMobile />
      <CartPopover />
    </CartButtonContext.Provider>
  )
}
