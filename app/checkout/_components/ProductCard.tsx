'use client'
import { QuantifiedProduct } from '@/store/cartStore'
import Image from 'next/image'
import React from 'react'
import { Counter } from './Counter'

interface ProductCardProps {
  product: QuantifiedProduct
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { imagePath, name, description } = product
  const totalPrice = (product.price * product.quantity).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  return (
    <div className={`flex flex-row md:flex-col lg:flex-row bg-white lg:bg-transparent 
      rounded-xl md:border-2 md:border-light-gray2 lg:border-b-4 lg:border-t-0 lg:rounded-none lg:border-x-0 lg:border-light-gray2 py-3 md:py-0 lg:py-3 
      lg:p-0 lg:pb-7 mt-0 lg:mt-5 gap-5 md:gap-2 lg:gap-5 lg:max-w-[95%] w-full lg:w-[unset]
      
      `}
    >
      <div className='min-w-[120px] lg:min-w-[150px] xl:h-[124px] bg-light-gray2 rounded-xl md:rounded-b-none lg:rounded-xl flex items-center justify-center md:py-4 lg:py-0'>
        <Image src={`/images/${imagePath}`} width={100} height={100} alt='product image' className='max-h-20 lg:max-h-[100px] object-contain' />
      </div>
      <div className='flex flex-col justify-between md:px-4 lg:px-0 md:pb-4 lg:pb-0'>
        <div className='flex flex-col gap-1 md:gap-0 lg:gap-1 max-w-[20ch]'>
          <h2 className='capitalize font-medium text-gray'>{name}</h2>
          <p className='capitalize text-[14px] text-gray2 line-clamp-2 mb-4 md:mb-2 lg:mb-4 xl:mb-0' title={description}>{description}</p>
        </div>
        <h3 className='font-bold text-xl text-black mb-4 md:mb-2 lg:mb-4 xl:hidden md:mt-6 lg:mt-0'>{totalPrice}</h3>
        <Counter product={product} />
      </div>
      <div className='ml-auto mt-auto hidden xl:block'>
        <h3 className='font-bold text-2xl text-black'>{totalPrice}</h3>
      </div>
    </div>
  )
}
