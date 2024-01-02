'use client'
import React from 'react'
import { Button } from '@/components/Button'
import useCart from '@/store/cartStore'
import type { Product } from '@/types/types'
import { useProductQuantity } from './hooks'
import { IconMinus, IconPlus } from '@tabler/icons-react'

interface QuantityButtonProps {
  product: Product
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({ product }) => {
  const { addItem, removeItem } = useCart()

  const { quantity } = useProductQuantity(product)

  const handleAddOne = () => {
    addItem(product)
  }

  const handleRemoveOne = () => {
    removeItem(product)
  }

  if (quantity === 0) {
    return (
      <Button 
        variant={'outline'} 
        className='border-2 border-light-gray mb-2 md:mb-4 mt-2 w-full hover:bg-light-gray rounded-lg'
        onClick={handleAddOne}  
      >
        Agregar
      </Button>
    )
  } 

  return (
    <div className='border-2 border-light-gray mb-2 md:mb-4 mt-2 w-full flex px-3 justify-between items-center rounded-lg h-11'>
      <button className='p-1 bg-transparent hover:bg-light-gray rounded-full' onClick={handleRemoveOne}>
        <IconMinus size={20} strokeWidth={3} className='text-slate-500'/>
      </button>
      <div className='font-bold'>
        {quantity}
      </div>
      <button className='p-1 bg-transparent hover:bg-light-gray rounded-full' onClick={handleAddOne}>
        <IconPlus size={20} strokeWidth={3} className='text-slate-500'/>
      </button>
    </div>
  )
}
