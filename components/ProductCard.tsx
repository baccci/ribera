import { useState, useEffect } from 'react';
import useCart, {CartState} from 'store/cartStore';
import styles from 'styles/Productos.module.css';
import Image from 'next/image';
import AddButton from './AddButton';

const ProductCard = ({title, description, price, imagePath, addFunc, code, delFunc}: {title: string, description: string, price: number, imagePath: string, addFunc?: () => void, code?: string, delFunc?: () => void}) => {
  
  const thisProduct = useCart((state: any) => state.cartContent?.filter((item: any) => item.code === code))[0] || {quantity: 0};
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    setCount(thisProduct.quantity);
  }, [thisProduct.quantity]);

  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <Image src={`/images/${imagePath}`} alt={description} width={120} height={120}/>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.dataWrapper}>
          <h2 className={styles.productTitle}>
            {title}
          </h2>
          <p className={styles.productDescription}>
            {description}
          </p>
        </div>
        <div className={styles.cardBottom}>
          <h3 className={styles.productPrice}>
            ${price}
          </h3>
          <div className={styles.buttonWrapper}>
            <AddButton text='Agregar' addFunc={() => addFunc && addFunc()} restFunc={() => delFunc && delFunc()} count={count}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard