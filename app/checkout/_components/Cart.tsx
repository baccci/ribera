'use client'
import { ProductList } from './ProductList'
import { MobileFooterButton } from './MobileFooterButton'
import { useClientCart } from '@/hooks/clientCartStore'
import { useMobileSearchParams } from './hooks'
import { cn } from '@/lib/tailwindClassMerge'

export const Cart = () => {
  const { quantity, quantifiedItems } = useClientCart()
  const mobileSearchParams = useMobileSearchParams()

  return (
    <div className={cn('sm:block', { hidden: mobileSearchParams === 'checkout' })}>
      <h1 className='text-lg font-bold'>Mi carrito ({quantity})</h1>
      <ProductList quantifiedProducts={quantifiedItems} />
      <MobileFooterButton />
    </div>
  )
}
