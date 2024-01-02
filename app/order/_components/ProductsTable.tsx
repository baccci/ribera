import { numberToPrice } from '@/lib/numberToPrice'
import { QuantifiedProduct } from '@/store/cartStore'
import React from 'react'

interface ProductsTableProps {
  products: QuantifiedProduct[]
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const subtotal = products.reduce((acc, { price: cost, quantity }) => acc + cost * quantity, 0)
  const formattedSubtotal = numberToPrice(subtotal)
  return (
    <table className='w-full'>
      <thead className='bg-light-gray2'>
        <tr className='text-sm md:text-base capitalize h-8'>
          <th className='rounded-s-lg pl-4 font-medium md:font-semibold' title='Cantidad'>
            cant.
          </th>
          <th className='font-medium md:font-semibold' title='Producto'>
            producto
          </th>
          <th className='font-medium md:font-semibold hidden md:table-cell' title='Descripción'>
            descripción
          </th>
          <th className='font-medium md:font-semibold truncate pr-2' title='Precio Unitario'>
            p. unitario
          </th>
          <th className='rounded-e-lg pr-4 font-medium md:font-semibold' title='Importe'>
            importe
          </th>
        </tr>
      </thead>
      <tbody className='before:content-["_."] before:text-white before:opacity-0 before:max-h-1 before:block'>
        {products.map(
          ({ quantity, name, price, description }) => (
            <tr key={description} className={'h-7'}>
              <td className='pl-4 font-semibold'>
                <div className='size-full flex items-start'>
                  {quantity}
                </div>
              </td>
              <td className='pl-4 flex items-start'>{name}</td>
              <td className='hidden md:table-cell pl-4'>{description}</td>
              <td className='pl-1'>${price}</td>
              <td className='pl-1 font-semibold'>${price * quantity}</td>
            </tr>
          )
        )}
        <tr className='h-7'>
          <td className='pl-4'>-</td>
          <td className='pl-4'>Subtotal</td>
          <td />
          <td className='font-semibold md:[visibility:hidden]'>{formattedSubtotal}</td>
          <td className='font-semibold hidden md:table-cell'>{formattedSubtotal}</td>
        </tr>
      </tbody>
    </table>
  )
}
