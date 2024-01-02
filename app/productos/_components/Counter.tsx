import React from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'

interface CounterProps {
  quantity: number
  handleAddOne: () => void
  handleRemoveOne: () => void
}

export const Counter: React.FC<CounterProps> = ({ quantity, handleAddOne, handleRemoveOne }) => {
  return (
    <div className='border-2 border-light-gray2 mb-2 md:mb-4 mt-2 w-full hover:bg-light-gray2 flex justify-evenly'>
      <button className='w-1/3 bg-transparent hover:bg-light-gray2 rounded-full' onClick={handleRemoveOne}>
        <IconMinus size={20} />
      </button>
      <div className='w-1/3'>
        {quantity}
      </div>
      <button className='w-1/3 bg-transparent hover:bg-light-gray2 rounded-full' onClick={handleAddOne}>
        <IconPlus size={20} />
      </button>
    </div>
  )
}
