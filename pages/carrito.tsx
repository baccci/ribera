import { useEffect, useState } from 'react'
import useCart, { StoredCart } from 'store/cartStore';
import { useRouter } from 'next/router';
import useShop from 'store/shopStore';
import styles from 'styles/Carrito.module.css';
import Layout from 'components/Layout';
import Head from 'next/head';
import VerticalProductCard from '../components/VerticalProductCard';
import type { Product } from 'pages/productos';
import Button from 'components/Button';

const Index = () => {
  const { cartContent: mycart, quantity, cartContent, totalPrice, removeOneFromCart, updateCart, addToCart } = useCart((state: any) => state);
  const { setOrderStatus, setOrderType, setTable, setProducts, setTotalPrice} = useShop((state: any) => state);
  const router = useRouter();

  const addProduct = (code: string, product: Product) => {
    const index = mycart.findIndex((item: StoredCart) => item.code === code);
    if (index !== -1) {
      mycart[index].quantity++;
      updateCart({ product, mycart });
    } else {
      addToCart({...product, quantity: 1});
    }
  };

  const deleteProduct = (code: string, product: Product) => {
    const index = mycart.findIndex((item: StoredCart) => item.code === code);
    if (index !== -1) {
      if(mycart[index].quantity >= 1) {
        mycart[index].quantity--;
        return removeOneFromCart({ product, mycart });
      }
    }
  }

  const [cart, setCart] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [table, setTableNumber] = useState<number>(1);

  useEffect(() => {
    setCart(cartContent?.filter((item: StoredCart) => item.quantity > 0));
    setTotal(totalPrice);
    setTotalQuantity(quantity);
  }, [cartContent, totalPrice, quantity]);

  const handleClick = () => {
    setProducts(cart);
    setTotalPrice(total);
    setOrderStatus('success');
    setOrderType('dinein');
    setTable(table);
    router.push('/order');
  }

  return (
    <Layout baseLayout>
      <Head>
        <title>Ribera - Carrito</title>
      </Head>
      <div className={styles.carritoWrapper}>
        <div className={styles.productos}>
          <h2 className={styles.miCarrito}>
            Mi carrito({totalQuantity})
          </h2>
          {cart.length > 0 ? (
            <div className={styles.cartWrapper}>
              {
                
                cart.map((product: StoredCart) => {
                  const { code, cost, description, imagePath, name} = product;
                  return (
                    <>
                      <VerticalProductCard {...{code, price: cost, description, imagePath, name}} 
                      addFunc={() => addProduct(code, product)} key={description} restFunc={() => deleteProduct(code, product)}/>
                      <hr className={styles.line}/>
                    </>
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
                  ${total}
                </span>
                <p className={styles.discountPrice}>
                  ${Number(total - (total * .2)).toFixed(2).replace(/[.,]00$/, "")}
                </p>
              </div>
            </div>
            <hr className={styles.checkoutLine}/>
            <label className={styles.checkoutLabel} htmlFor="checkoutSelect">
              Tipo de pedido
            </label>
            <select className={styles.checkoutSelect} id="checkoutSelect">
              <option value="delivery">Para consumir en el lugar</option>
            </select>
            <p className={styles.checkoutLabel}>
              Número de mesa
            </p>
            <input className={styles.checkoutInputNumber} type="number" placeholder="1" min={1} max={20} value={table} onChange={(e) => setTableNumber(Number(e.target.value))}/>
            <hr className={styles.checkoutLine}/>
            <p className={styles.checkoutLabel}>
              Descuentos
            </p>
            <ul className={styles.checkoutList}>
              <li className={styles.checkoutDiscount}>
                <p className={styles.checkoutDiscountItem}>	&bull; Se consume en Ribera {'('}<span style={{color: '#47B878'}}>20%</span>{')'}</p>
              </li>
              <p className={styles.checkoutDiscountNumber}>-${Number(total * 0.2).toFixed(2).replace(/[.,]00$/, "")}</p>
            </ul>
            <div className={styles.checkoutEnvioWrapper}>
              <p className={styles.checkoutLabel}>Envío</p>
              <p className={styles.checkoutLabel}>$0</p>
            </div>
          </div>
          <Button width='100%' type='button' padding='22px 0' func={() => handleClick()} disabled={totalQuantity < 1}>Enviar Pedido</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Index