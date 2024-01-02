import TextInput from '@/components/TextInput/TextInput'
import { IconWorld } from '@tabler/icons-react'
import React from 'react'

interface DeliveryOptionsProps {
  deliveryAddress: string
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>
}

export const DeliveryOption: React.FC<DeliveryOptionsProps> = ({ deliveryAddress, setDeliveryAddress }) => {
  return (
    <div>
      <TextInput 
        id='delivery-adress' 
        label='Dirección de entrega' 
        className='focus-visible:ring-yellow rounded-xl border-none' 
        wrapperClassName='my-0'
        placeholder='Av. Corrientes 1234'
        value={deliveryAddress}
        required
        aria-required
        icon={<IconWorld className='text-slate-500'/>}
        onChange={e => setDeliveryAddress(e.target.value)}
      />
    </div>
  )
}