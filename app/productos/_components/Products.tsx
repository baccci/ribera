'use client'
import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { filterBySearchString } from './utils/filterBySearchString'
import { filterByCategory } from './utils/filterByCategory'
import type { Product } from '@/types/types'
import { ProductCard } from './ProductCard'

interface ProductsProps {
  products: Product[]
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  const searchParams = useSearchParams()
  const search = searchParams?.get('search') || ''
  const categoryRaw = searchParams?.get('category') || ''
  const category = categoryRaw.toLocaleLowerCase() === 'todo' ? undefined : categoryRaw

  const searchFilteredProducts = useMemo(() => filterBySearchString(products, search), [products, search])
  const categoryFilteredProducts = useMemo(() => filterByCategory(searchFilteredProducts, category), [category, searchFilteredProducts])

  const hasProducts = categoryFilteredProducts?.length > 0 ? 'has' : 'empty'

  const ProductsView = {
    has: <ProductsList products={categoryFilteredProducts} />,
    empty: <EmptyProductsMessage />
  }[hasProducts]

  return (
    <>
      {ProductsView}
    </>
  )
}

const ProductsList: React.FC<ProductsProps> = ({ products }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2 md:gap-8 grid-flow-row mt-7 mb-20 md:mb-32'>
      {products?.map(product => {
        return <ProductCard product={product} key={product.code} />
      })}
    </section>
  )
}

const EmptyProductsMessage: React.FC = () => {
  return (
    <div className='flex flex-col gap-2 mt-7'>
      <h2 className='text-2xl font-bold'>No hay productos</h2>
      <p className='text-gray-500'>No hay productos que coincidan con tu búsqueda.</p>
    </div>
  )
}