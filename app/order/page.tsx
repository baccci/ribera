'use client'

import { SuccessCircleIcon } from '@/components/Icons'
import { useClientShopStore } from '@/hooks/clientShopStore'
import ReactCanvasConfetti from 'react-canvas-confetti'
import Balancer from 'react-wrap-balancer'
import { canvasStyles, useConfetti } from './_components/utils'
import { OrderModal } from './_components/OrderModal/OrderModal'
import { PHRASE } from './_components/constants'
import { useClearCart } from './_components/hooks'

export default function Page() {
  const { orderType } = useClientShopStore()
  useClearCart()

  const getInstance = useConfetti()
  const phrase = (orderType && PHRASE[orderType]) || PHRASE.delivery

  return (
    <div className='flex items-center justify-center mb-16 md:mb-24 md:mt-24 flex-col'>
      <h2 className='text-2xl font-medium text-[#5E5B5A] mb-1'>¡Listo!</h2>
      <h1 className='text-[40px] text-black font-bold text-center'>Tu pedido fue registrado</h1>
      <div className='mt-12 mb-16 animate-icon-show'>
        <SuccessCircleIcon />
      </div>
      <p className='text-gray2 max-w-[60ch] text-center'>
        <Balancer>
          {phrase}
        </Balancer>
      </p>
      <OrderModal />
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{ ...canvasStyles, pointerEvents: 'none', position: 'fixed' }}
      />
    </div>
  )
}