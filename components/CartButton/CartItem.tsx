'use client'
import React from 'react'
import useCart, { QuantifiedProduct } from '@/store/cartStore'
import Image from 'next/image'
import { AddIcon, RestIcon } from '../Icons'

interface ItemElementProps {
  item: QuantifiedProduct
}

export const CartItem: React.FC<ItemElementProps> = ({ item }) => {
  const { addItem, removeItem } = useCart()

  const cost = item.price * item.quantity
  const price = cost.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  const handleAddItem = () => addItem(item)
  const handleRemoveItem = () => removeItem(item)

  return (
    <div className='flex md:max-w-[20rem] min-w-[18rem] w-full'>
      <div className='bg-light-gray rounded-lg py-1 min-w-[40%] flex justify-center items-center'>
        <Image src={`/images/${item.imagePath}`} alt={`${item.category} image`} width={100} height={100} className='object-contain bg-transparent max-h-20 w-auto' />
      </div>
      <div className='px-2 overflow-x-hidden flex flex-col w-full'>
        <div className='whitespace-nowrap text-ellipsis'>
          {item.name}
        </div>
        <p className='text-gray2 text-[14px] truncate' title={item.description}>
          {item.description}
        </p>
        <div className='flex overflow-hidden mt-auto mb-1 items-center justify-between'>
          <div className='flex items-center'>
            <button
              onClick={handleRemoveItem}
              className='font-bold text-2xl text-gray transition-colors duration-200 mr-2 w-6 h-6 bg-light-gray2 rounded-full flex items-center justify-center hover:bg-light-gray'
            >
              <RestIcon />
            </button>
            <span className='text-lg'>{item.quantity}</span>
            <button
              onClick={handleAddItem}
              className='font-bold text-2xl text-gray transition-colors duration-200 ml-2 w-6 h-6 bg-light-gray2 rounded-full flex items-center justify-center hover:bg-light-gray'
            >
              <AddIcon />
            </button>
          </div>
          <div className='truncate font-bold' title={price}>
            {price}
          </div>
        </div>
      </div>
    </div>
  )
}
