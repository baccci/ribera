import React from 'react'
import { DELIVERY_MODES } from '@/constants/constants'
import { useSummaryContext } from '../hooks'
import { DeliveryOption } from './DeliveryOptions'
import { PickUpOption } from './PickUpOption'
import { TabButton } from './TabButton'

export const OrderDelivery: React.FC = () => {
  const { mode, setMode, deliveryAddress, setDeliveryAddress } = useSummaryContext()
  const deliveryMode = mode === DELIVERY_MODES.delivery

  const Option = {
    [DELIVERY_MODES.delivery]: <DeliveryOption
      deliveryAddress={deliveryAddress}
      setDeliveryAddress={setDeliveryAddress}
    />,
    [DELIVERY_MODES.pickup]: <PickUpOption />
  }[mode]

  return (
    <div className='flex flex-col'>
      <h3>¿Donde querés recibir tu pedido?</h3>
      <div className='flex gap-2 mt-1.5 mb-4'>
        <TabButton
          active={deliveryMode}
          onClick={() => setMode(DELIVERY_MODES.delivery)}
        >
          Delivery
        </TabButton>
        <TabButton
          active={!deliveryMode}
          onClick={() => setMode(DELIVERY_MODES.pickup)}
        >
          En local
        </TabButton>
      </div>
      {Option}
    </div>
  )
}
