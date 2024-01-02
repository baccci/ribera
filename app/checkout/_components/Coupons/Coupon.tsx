import { XButton } from '@/components/XButton'
import { IconShoppingBagDiscount } from '@tabler/icons-react'
import React from 'react'

interface CouponProps {
  name: string
  type: string
  value: number
}

export const Coupon: React.FC<CouponProps> = ({ name, value, type }) => {
  const discountValue = type === 'percentage' 
    ? `${value}%`
    : value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }) 

  return (
    <div className='bg-white w-full py-2.5 px-3 rounded-xl flex gap-2  items-center group'>
      <IconShoppingBagDiscount className='text-slate-500'/> {name} ({discountValue})
      <div className='ml-auto sm:opacity-0 sm:group-hover:animate-show focus-within:opacity-100'>
        <XButton className='[--size:24px]' size={12}/>
      </div>
    </div>
  )
}
