import { AddIcon, RestIcon } from '@/components/Icons'
import useCart, { QuantifiedProduct } from '@/store/cartStore'
import React from 'react'

interface CounterProps {
  product: QuantifiedProduct
}

export const Counter: React.FC<CounterProps> = ({ product }) => {
  const { addItem, removeItem } = useCart()

  const handleAddItem = () => addItem(product)
  const handleRemoveItem = () => removeItem(product)

  return (
    <div className='flex items-center md:w-full lg:w-fit md:justify-center md:py-2 md:border-light-gray2 md:border-2 md:rounded-lg lg:border-none'>
      <button
        className='flex justify-center items-center p-3 bg-light-gray2 hover:bg-light-gray transition-colors duration-200 rounded-full md:mr-auto md:ml-3 lg:ml-0'
        onClick={handleRemoveItem}
        type='button'
      >
        <div className='h-[10px] flex items-center'>
          <RestIcon size={10} color='var(--gray)' />
        </div>
      </button>
      <span className='text-lg font-semibold px-3'>{product.quantity}</span>
      <button
        className='flex justify-center items-center p-3 bg-light-gray2 hover:bg-light-gray transition-colors duration-200 rounded-full md:ml-auto md:mr-3 lg:mr-0'
        onClick={handleAddItem}
        type='button'
      >
        <AddIcon size={10} color='var(--gray)' />
      </button>
    </div>
  )
}
