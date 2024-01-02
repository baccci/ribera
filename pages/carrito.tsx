import { Fragment, useEffect, useMemo, useState } from 'react'
import useCart, { CartState, QuantifiedProduct } from 'store/cartStore'
import { useRouter } from 'next/router'
import useShop from 'store/old-shopStore'
import styles from 'styles/Carrito.module.css'
import Layout from '@/pagesComponents/Layout'
import Head from 'next/head'
import VerticalProductCard from '../pagesComponents/VerticalProductCard'
import Button from '@/pagesComponents/Button'

const useHydratedCart = () => {
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [mycart, setMycart] = useState<QuantifiedProduct[]>([])
  const { getQuantity, getTotalPrice, getQuantifiedItems } = useCart((state: CartState) => state)

  const _mycart = useMemo(() => getQuantifiedItems(), [getQuantifiedItems])
  const _price = getTotalPrice()
  const priceString = price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })

  const _quantity = getQuantity()

  useEffect(() => {
    setQuantity(_quantity)
    setPrice(_price)
    setMycart(_mycart)
  }, [_quantity, _price, _mycart])

  return { quantity, price, priceString, mycart }
}

const Index = () => {
  const { setOrderStatus, setOrderType, setTable } = useShop((state: any) => state)
  const router = useRouter()

  const [table, setTableNumber] = useState<number>(1)
  const { quantity, price, priceString, mycart } = useHydratedCart()

  const handleClick = () => {
    setOrderStatus('success')
    setOrderType('dinein')
    setTable(table)
    router.push('/order')
  }

  return (
    <Layout baseLayout>
      <Head>
        <title>Ribera - Carrito</title>
      </Head>
      <div className={styles.carritoWrapper}>
        <div className={styles.productos}>
          <h2 className={styles.miCarrito}>
            Mi carrito({quantity})
          </h2>
          {quantity > 0
            ? (
            <div className={styles.cartWrapper}>
              {

                mycart.map((product) => {
                  return (
                    <Fragment key={product.code}>
                      <VerticalProductCard product={product}/>
                      <hr className={styles.line} />
                    </Fragment>
                  )
                })

              }
            </div>
              )
            : <p>No tenes items en tu carrito</p>
          }
        </div>
        <div className={styles.checkout}>
          <div className={styles.checkoutBox}>
            <div className={styles.priceWrapper}>
              <p className={styles.totalText}>
                Total:
              </p>
              <div className={styles.pricesWrapper}>
                <span className={styles.withoutDiscountPrice}>
                  {priceString}
                </span>
                <p className={styles.discountPrice}>
                  ${Number(price - (price * 0.2)).toFixed(2).replace(/[.,]00$/, '')}
                </p>
              </div>
            </div>
            <hr className={styles.checkoutLine} />
            <label className={styles.checkoutLabel} htmlFor="checkoutSelect">
              Tipo de pedido
            </label>
            <select className={styles.checkoutSelect} id="checkoutSelect">
              <option value="delivery">Para consumir en el lugar</option>
            </select>
            <p className={styles.checkoutLabel}>
              Número de mesa
            </p>
            <input className={styles.checkoutInputNumber} type="number" placeholder="1" min={1} max={20} value={table} onChange={(e) => setTableNumber(Number(e.target.value))} />
            <hr className={styles.checkoutLine} />
            <p className={styles.checkoutLabel}>
              Descuentos
            </p>
            <ul className={styles.checkoutList}>
              <li className={styles.checkoutDiscount}>
                <p className={styles.checkoutDiscountItem}> &bull; Se consume en Ribera {'('}<span style={{ color: '#47B878' }}>20%</span>{')'}</p>
              </li>
              <p className={styles.checkoutDiscountNumber}>-${Number(price * 0.2).toFixed(2).replace(/[.,]00$/, '')}</p>
            </ul>
            <div className={styles.checkoutEnvioWrapper}>
              <p className={styles.checkoutLabel}>Envío</p>
              <p className={styles.checkoutLabel}>$0</p>
            </div>
          </div>
          <Button width='100%' type='button' padding='22px 0' func={() => handleClick()} disabled={quantity < 1}>Enviar Pedido</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Index