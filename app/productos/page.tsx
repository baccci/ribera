import { SearchInput } from './_components/SearchInput'
import { CategoriesFilter } from './_components/CategoriesFilter'
import getProducts from '@/services/getProducts'
import { Products } from './_components/Products'
import { CheckoutButton } from './_components/CheckoutButton'
import { Suspense } from 'react'
import { ProductsSkeleton } from './_components/ProductsSkeleton'

export const revalidate = 3600 // revalidate the data at most every hour

export const metadata = {
  title: 'Ribera - Productos'
}

export default async function Page() {
  const products = await getProducts()
  return (
    <div className='md:my-14'>
      <SearchInput />
      <CategoriesFilter />
      <Suspense fallback={<ProductsSkeleton />}>
        <Products products={products} />
      </Suspense>
      <CheckoutButton />
    </div>
  )
}