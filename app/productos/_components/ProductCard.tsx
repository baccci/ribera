import { Product } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { QuantityButton } from './QuantityButton'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { imagePath, category, name, description, price: cost } = product
  const desc = `${description}.`
  const price = cost.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  return (
    <article className='w-full md:w-[150px] lg:w-[200px] lg:h-[350px] min-w-[180px]'>
      <div className={'flex md:flex-col bg-gradient-to-r md:bg-gradient-to-b from-light-gray2 to-light-gray p-[2px] h-full rounded-xl overflow-hidden'}>
        <div className='w-full h-full flex md:flex-col'>
          <div className='w-full min-h-[155px] flex justify-center items-center relative'>
            <Image
              src={`/images/${imagePath}`}
              alt={`${category} image`}
              width={120}
              height={120}
              className='object-contain bg-transparent max-h-28 w-auto'
            />
          </div>
          <div className='w-full flex flex-col h-full px-2 md:px-4 justify-between bg-white rounded-r-[10px] md:rounded-r-none md:rounded-br-[10px] md:rounded-b-[10px]'>
            <header>
              <h2 className='mt-2 md:mb-0.5 text-xl'>{name}</h2>
              <p className='text-gray2 line-clamp-2 text-sm' title={desc}>{desc}</p>
            </header>
            <footer>
              <h3 className='text-xl font-bold text-black'>{price}</h3>
              <QuantityButton product={product} />
            </footer>
          </div>
        </div>
      </div>
    </article>
  )
}
