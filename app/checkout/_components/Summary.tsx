'use client'
import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import { HorizontalLine } from '@/components/HorizontalLine'
import { useClientCart } from '@/hooks/clientCartStore'
import { SummaryList } from './SummaryList'
import { OrderDelivery } from './OrderDelivery/OrderDelivery'
import { Payment } from './Payment/Payment'
import { Coupons } from './Coupons/Coupons'
import { OrderButton } from './OrderButton'
import { Total } from './Total'
import { useMobileSearchParams } from './hooks'
import Link from 'next/link'
import { IconChevronLeft } from '@tabler/icons-react'

export const Summary: React.FC = () => {
  const { quantity } = useClientCart()
  const mobileSearchParams = useMobileSearchParams()

  return (
    <div
      className={cn('hidden md:block lg:min-w-[350px] sm:mt-4 lg:mt-0'
        , { block: mobileSearchParams === 'checkout' }
      )}
    >
      <div className={cn('hidden mb-4', { 'block sm:hidden': mobileSearchParams === 'checkout' })}>
        <Link className='text-gray' href='/checkout'>
          <div className='flex gap-1 items-center'>
            <IconChevronLeft size={16} className='relative top-[1px]' /> Volver atras
          </div>
        </Link>
      </div>
      <div className='bg-light-gray2 rounded-xl p-6 h-fit text-gray'>
        <h2 className='text-xl font-bold '>Resumen de la compra</h2>
        <HorizontalLine />
        <div className='flex flex-col gap-5 sm:my-4'>
          <Payment />
          <Coupons />
          <OrderDelivery />
          <HorizontalLine />
          <SummaryList />
          <Total />
        </div>
      </div>
      <div className={cn('mt-4', { hidden: quantity === 0 })}>
        <OrderButton />
      </div>
    </div >
  )
}
