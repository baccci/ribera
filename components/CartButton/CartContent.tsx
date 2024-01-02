'use client'
import React from 'react'
import { CartList } from './CartList'
import { Button, LinkButton } from '../Button'
import { IconShoppingBag, IconTrash } from '@tabler/icons-react'
import { cn } from '@/lib/tailwindClassMerge'
import { Popover } from '../Popover/Popover'
import { useCartButtonContext } from './hooks'
import useCart from '@/store/cartStore'
import { CloseIcon } from '../Icons'

interface CartContentProps {
  popover?: boolean
  className?: string
  show?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartContent: React.FC<CartContentProps> = ({ popover, className, show = true, setShow }) => {
  const { emptyCart, items, pathname } = useCartButtonContext()
  const { clearCart, getTotalPrice } = useCart()
  const isCheckout = pathname === '/checkout'

  const totalPrice = getTotalPrice()
  const totalPriceString = totalPrice.toLocaleString('en-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  if(!show) return null
  return (
    <div 
      className={cn('rounded-xl shadow-lg p-5 md:p-2 border-gray2 border bg-white z-10', 
        className,
        { 'opacity-0 pointer-events-none': isCheckout }
      )}
    >
          <div className='mb-4 md:hidden flex justify-between items-center'>
            <h2 className='text-2xl font-medium'>Carrito</h2>
            <button 
              type="button" 
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              onClick={() => setShow?.(false)}  
            >
              <CloseIcon size={24} />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <p className={cn('hidden', { 'block p-2': emptyCart })}>
            El carrito está vacío.
          </p>
          <div className={cn({ 
            hidden: emptyCart, 
            'flex flex-col justify-between h-[calc(100%-48px)]': !popover, 
            'justify-end h-[calc(100%-88px)]': emptyCart 
          })}>
            <CartList items={items} />
            <div>    
              <h3 className='text-xl font-semibold mt-2'>Total: {totalPriceString}</h3>
              <Button
                variant={'outline'} 
                className={cn('rounded-lg flex gap-2 w-full mt-6')}
                onClick={clearCart}
              >
                <IconTrash size={20} />
                Vaciar Carrito
              </Button>
              <LinkButton
                href='/checkout' 
                className='rounded-lg flex gap-2 w-full mt-2'
              >
                <IconShoppingBag size={20} />
                Ir al Checkout
              </LinkButton>
            </div>
          </div>
          { popover && <Popover.Arrow fill='var(--gray2)' />}
        </div>
  )
}
