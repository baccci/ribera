import { QuantifiedProduct } from '@/store/cartStore'
import React from 'react'
import { CartItem } from './CartItem'

interface CartListProps {
 items: QuantifiedProduct[]
}

export const CartList: React.FC<CartListProps> = ({ items }) => {
  if(items?.length === 0) return null
  return (
    <div className='md:max-h-[45vh] overflow-y-auto flex flex-col gap-4 md:w-fit w-full'>
       {items?.map((item) => {
         return <CartItem key={item.code} item={item}/>
       })}
    </div>
  )
}
