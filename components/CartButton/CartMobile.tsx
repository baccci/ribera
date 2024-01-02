'use client'
import { useState } from 'react'
import { CartIcon } from '../Icons'
import { CartContent } from './CartContent'
import { CartQuantityIndicator } from './CartQuantityIndicator'
import { useCartButtonContext, useDocumentScroll } from './hooks'
import { cn } from '@/lib/tailwindClassMerge'

export const CartMobile = () => {
  const [show, setShow] = useState(false)
  const { emptyCart, total, pathname } = useCartButtonContext()
  const isCheckout = pathname === '/checkout'
  useDocumentScroll(!show)

  const toggleShow = () => setShow(!show)
  
  return (
    <div 
      className={cn('flex items-center justify-center md:hidden relative text-gray w-5 md:w-6',
        { 'opacity-0 pointer-events-none': isCheckout }
      )}
    >
      <button onClick={toggleShow}>
        <CartIcon size='100%' />
        {!emptyCart && <CartQuantityIndicator quantity={total} />}
      </button>
      <CartContent
        show={show}
        setShow={setShow}
        className={`text-black fixed left-0 top-0 z-[11] w-full rounded-none border-0
          shadow-none h-full bg-white
        `}
      />
    </div>

  )
}
