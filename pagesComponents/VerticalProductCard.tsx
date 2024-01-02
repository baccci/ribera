import { useEffect, useState } from 'react'
import Image from 'next/image'
import AddButton from './AddButton'
import useCart, { CartState } from 'store/cartStore'
import { Product } from '@/types/types'

interface VerticalProductCardProps {
  product: Product
}

const VerticalProductCard = ({ product }: VerticalProductCardProps) => {
  const { imagePath, description, name, price: cost } = product
  const { getProductQuantity, removeItem, addItem } = useCart()
  const quantity = getProductQuantity(product)
  const price = (cost * quantity)?.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  return (
    <div className='cardWrapper'>
      <div className='card'>
        <div className='cardImage'>
          <Image src={`/images/${imagePath}`} alt={description} width={100} height={100} style={{ objectFit: 'contain' }} />
        </div>
        <div className='cardBody'>
          <div className='cardData'>
            <h3 className='cardTitle'>
              {name}
            </h3>
            <p className='cardDescription'>
              {description}
            </p>
          </div>
          <AddButton text='Agregar' addFunc={() => addItem(product)} restFunc={() => removeItem(product)} count={quantity} border={false} />
          <h2 className='price'>
            {price}
          </h2>
        </div>
      </div>
      <style jsx>
        {`
          .price{
            font-size: 25px;
            font-weight: 700;
            color: var(--gray);
            margin: 0;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          .cardDescription{
            font-size: 14px;
            color: var(--light-gray);
            margin: 0;
          }
          .cardTitle{
            font-size: 16px;
            font-weight: 500;
            color: var(--gray);
            margin: 0;
            padding: 0;
            margin-bottom: 10px;
          }
          .cardBody{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            width: 100%;
            min-height: 124px;
          }
          .cardData{
            display: flex;
            flex-direction: column;
          }
          .cardImage{
            width: 150px;
            height: 124px;
            min-width: 150px;
            min-height: 124px;
            background: linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(245,245,245,1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          }
          .card{
            display: flex;
            align-items: center;
            gap: 20px;
            width: 100%;
          }
          .cardWrapper {
            display: flex;
            align-items: center;
            padding: 20px 20px 20px 10px;
            height: 172px;
            width: 500px;
            transition: background 0.2s ease-out;
            border-radius: 10px;
            position: relative;
            left: -10px;
          }
          .cardWrapper:hover {
            background: #fcfcfc;
          }
        `}
      </style>
    </div>
  )
}

export default VerticalProductCard