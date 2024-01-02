'use client'
import { LinkButton } from '@/components/Button'
import { IconShoppingBag } from '@tabler/icons-react'
import { cn } from '@/lib/tailwindClassMerge'
import { useClientCart } from '@/hooks/clientCartStore'

export const CheckoutButton = () => {
  const { quantity, totalPrice } = useClientCart()
  const formattedPrice = totalPrice.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
  const productsQuantity = `${quantity} ` + (quantity === 1 ? 'artículo' : 'artículos')

  return (
    <div className={cn('md:rounded-xl z-[1] shadow-lg p-5 pt-2 md:p-2 border-gray2 md:border bg-white w-full md:w-auto fixed bottom-0 left-0 md:bottom-6 md:left-[unset] md:right-6',
      { hidden: quantity === 0 }
    )}>
      <div className='flex justify-between md:block'>
        <p className='text-gray'>{productsQuantity}</p>
        <h3 className='font-semibold md:font-bold text-lg md:text-xl'>Total: {formattedPrice}</h3>
      </div>
      <LinkButton href='/checkout' className='w-full md:w-40 rounded-lg flex gap-2 mt-2'>
        <IconShoppingBag size={20} />
        Ir al Checkout
      </LinkButton>
    </div>
  )
}
