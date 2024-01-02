import { useDiscounts, useSummaryContext } from './hooks'
import { useClientCart } from '@/hooks/clientCartStore'
import { Discount } from '@/types/order'
import React from 'react'

export const SummaryList = () => {
  const { mode, deliveryPrice } = useSummaryContext()
  const discounts = useDiscounts()

  const { quantity, totalPrice: totalCart } = useClientCart()
  const formattedTotalCart = totalCart.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

  return (
    <ul>
      <li>
        <div className='flex justify-between'>
          <p>• Subtotal carrito ({quantity}):</p>
          <p className='font-semibold'>{formattedTotalCart}</p>
        </div>
      </li>
      {discounts.map(({ name, finalValue }: Discount, index) => {
        const formattedFinalValue = finalValue.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

        return (
          <li key={index}>
            <div className='flex justify-between'>
              <p>• Descuento {name}:</p>
              <p className='font-semibold text-green-600'>-{formattedFinalValue}</p>
            </div>
          </li>
        )
      })}
      <DeliveryItem value={deliveryPrice} show={mode === 'delivery'} />
    </ul>
  )
}

interface DeliveryItemProps {
  value: number
  show: boolean
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ value, show }) => {
  const formattedValue = value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

  if (!show) return null
  return (
    <li>
      <div className='flex justify-between'>
        <p>• Envío:</p>
        <p className='font-semibold'>{formattedValue}</p>
      </div>
    </li>
  )
}