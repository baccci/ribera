'use client'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import Logo from '@/components/Logo'
import React from 'react'
import { ProductsTable } from '../ProductsTable'
import { useClientShopStore } from '@/hooks/clientShopStore'
import { SuccessToast } from '../SuccessToast'
import { IconDownload } from '@tabler/icons-react'
import { numberToPrice } from '@/lib/numberToPrice'
import { DELIVERY_MODES, DELIVERY_PRICE } from '@/constants/constants'
import { downloadTicket } from '@/services/downloadTicket'
import { useDiscounts } from '../hooks'
import { DiscountList } from './DiscountList'
import { InformativeCards } from './InformativeCards'

export const OrderModal: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const { orderContent, orderType, coupons, date, paymentMethod, billingData } = useClientShopStore()
  const deliveryPrice = orderType === DELIVERY_MODES.delivery ? DELIVERY_PRICE : 0
  const totalCart = orderContent.reduce((acc, { price: cost, quantity }) => acc + cost * quantity, 0)
  const discounts = useDiscounts(coupons, totalCart)
  const discount = discounts.reduce((acc, discount) => acc + discount.finalValue, 0)
  const deliveryFinalPrice = orderType === DELIVERY_MODES.delivery ? deliveryPrice : 0
  const totalPrice = totalCart + deliveryFinalPrice - discount
  const totalPriceFormatted = numberToPrice(totalPrice)

  const handleDownloadTicket = async () => {
    setLoading(true)
    await downloadTicket({
      products: orderContent,
      orderType,
      deliveryPrice,
      discounts,
      date
    })
      .catch(() => {
        // toast error
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal closeButton className='sm:min-w-[500px] md:min-w-[600px]'>
      <Modal.Trigger className='mt-8 md:mt-6'>
        <Button>
          Ver tu pedido
        </Button>
      </Modal.Trigger>
      <Modal.TopCloseButton className='pt-2 sm:pt-0' />
      <Modal.Icon className='mb-3 md:mb-5'>
        <div className='flex flex-col items-center justify-center w-full pt-2 sm:pt-8'>
          <Logo link={false} color='var(--yellow)' className='w-20 md:w-[100px]' />
          <span className='text-yellow font-bold italic text-xs md:text-sm md:mt-2'>TODO ESTÁ BIEN!</span>
          <div className='mt-4 md:mt-6'>
            <SuccessToast paid={paymentMethod === 'card'} />
          </div>
        </div>
      </Modal.Icon>
      <Modal.Header className='mt-4 text-xl md:text-2xl block'>
        Tu pedido
      </Modal.Header>
      <Modal.Body className='mt-2 md:mt-4 max-h-[30%] overflow-y-auto md:max-h-64 md:overflow-y-auto'>
        <ProductsTable products={orderContent} />
        <DiscountList discounts={discounts} totalPrice={totalCart} />
      </Modal.Body>
      <Modal.Footer className='flex flex-col mt-auto sm:mt-6 md:mt-8'>
        <InformativeCards
          discount={discount}
          orderType={orderType}
          deliveryPrice={deliveryPrice}
          paymentMethod={paymentMethod}
          billingData={billingData}
        />
        <div className='flex items-center justify-between md:flex-col md:items-start'>
          <div className='text-sm font-semibold text-slate-600'>
            Total
          </div>
          <div className='text-2xl font-bold'>
            {totalPriceFormatted}
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 md:ml-auto w-full md:w-auto'>
          <Button variant={'outline'} className='flex gap-2' onClick={handleDownloadTicket} loading={loading}>
            <IconDownload size={18} />
            Descargar Ticket
          </Button>
          <Modal.CloseButton className='th:hidden' variant={'default'}>
            Cerrar
          </Modal.CloseButton>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
