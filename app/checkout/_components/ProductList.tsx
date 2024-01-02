'use client'
import { QuantifiedProduct } from '@/store/cartStore'
import React from 'react'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  quantifiedProducts: QuantifiedProduct[]
}

export const ProductList: React.FC<ProductListProps> = ({ quantifiedProducts }) => {

  if (quantifiedProducts.length === 0) return <p className='text-gray2 mt-4'>El carrito está vacío.</p>
  return (
    <div className='mt-4 block md:flex md:flex-col md:gap-4 lg:block'>
      {quantifiedProducts.map(product =>
        <ProductCard product={product} key={product.code} />
      )}
    </div>
  )
}
