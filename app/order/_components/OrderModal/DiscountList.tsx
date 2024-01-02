import { numberToPrice } from '@/lib/numberToPrice'
import { Discount } from '@/types/order'
import React from 'react'

interface DiscountListProps {
  discounts: Discount[]
  totalPrice: number
}

export const DiscountList: React.FC<DiscountListProps> = ({ discounts, totalPrice }) => {
  return (
    <div className='pl-4 pr-2 w-full flex flex-col gap-2 mt-1'>
      Descuentos:
      {discounts.map(({ name, discountType, value }, index) => {
        const totalValue = discountType === 'percentage'
          ? totalPrice * (value / 100)
          : value
        const formattedTotalValue = numberToPrice(totalValue)

        return (
          <div key={index} className='w-full flex justify-between'>
            <div className='text-sm flex gap-11'><span>-</span> {name}</div>
            <span className='text-sm font-semibold text-green-500'>
              - {formattedTotalValue}
              {discountType === 'percentage' && <span className='font-bold ml-1'>({value}%)</span>}
            </span>
          </div>
        )
      })}
    </div>
  )
}
