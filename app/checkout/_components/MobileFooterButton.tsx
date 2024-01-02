import { useClientCart } from '@/hooks/clientCartStore'
import { cn } from '@/lib/tailwindClassMerge'
import { useMobileSearchParams } from './hooks'
import { LinkShadedButton } from '@/components/ShadedButton'

export const MobileFooterButton = () => {
  const mobileSearchParams = useMobileSearchParams()

  const { totalPrice } = useClientCart()
  const formattedTotalPrice = totalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

  return (
    <div
      className={cn('fixed bottom-0 left-0 right-0 bg-white p-4 flex flex-col gap-2 md:hidden z-[1]',
        { hidden: mobileSearchParams === 'checkout' }
      )}
    >
      <div className='flex justify-between'>
        Subtotal carrito: <span className='font-semibold'>{formattedTotalPrice}</span>
      </div>
      <LinkShadedButton className='w-full p-6 text-base' href='/checkout?mobile=checkout'>
        Continuar con el pago
      </LinkShadedButton>
    </div>
  )
}
