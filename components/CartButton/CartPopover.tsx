import { Popover } from '../Popover/Popover'
import { CartIcon } from '../Icons'
import { useCartButtonContext } from './hooks'
import { CartContent } from './CartContent'
import { CartQuantityIndicator } from './CartQuantityIndicator'
import { cn } from '@/lib/tailwindClassMerge'

export const CartPopover = () => {
  const { emptyCart, total, pathname } = useCartButtonContext()
  const isCheckout = pathname === '/checkout'

  return (
    <div className='hidden md:block'>
      <Popover modal >
        <Popover.Trigger 
          className={cn('relative text-gray w-5 md:w-6',
            { 'opacity-0 pointer-events-none': isCheckout }
          )}
        >
          <CartIcon size='100%'/>
          {!emptyCart && <CartQuantityIndicator quantity={total} />}
        </Popover.Trigger>
        <Popover.Content sideOffset={10}>
          <CartContent popover />
        </Popover.Content>
      </Popover>
    </div>
  )
}
