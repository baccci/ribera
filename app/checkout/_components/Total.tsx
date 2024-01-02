import { useClientCart } from '@/hooks/clientCartStore'
import { cn } from '@/lib/tailwindClassMerge'
import { useDiscounts, useSummaryContext, useTotalPrice } from './hooks'
import { DELIVERY_MODES } from '@/constants/constants'

export const Total = () => {
  const { totalPrice: totalCart, quantity } = useClientCart()
  const { mode, deliveryPrice } = useSummaryContext()

  const discounts = useDiscounts()
  const hasDiscounts = discounts.length > 0

  const priceWithoutDiscounts = totalCart +
    (mode === DELIVERY_MODES.delivery ? deliveryPrice : 0)

  const formattedTotalWithoutDiscounts = priceWithoutDiscounts
    .toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

  const totalPrice = useTotalPrice({ mode, deliveryPrice })
  const formattedTotalPrice = totalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

  return (
    <div className={cn('flex justify-between items-center mt-2', { hidden: quantity === 0 })}>
      <h3 className='text-lg font-bold'>Total:</h3>
      <h2 data-total={formattedTotalWithoutDiscounts} className={cn(
        'text-2xl lg:text-3xl font-bold text-black',
        { 'before:content-[attr(data-total)] before:text-lg before:text-slate-500 before:line-through before:mr-2': hasDiscounts }
      )}>
        {formattedTotalPrice}
      </h2>
    </div>
  )
}
