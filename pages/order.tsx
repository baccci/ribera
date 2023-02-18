import { useEffect, useState, useRef, useCallback } from "react";
import useShop from "store/shopStore"
import { useRouter } from "next/router";
import styles from "styles/Order.module.css";
import Layout from 'components/Layout';
import ReactCanvasConfetti from 'react-canvas-confetti';
import Logo from "components/Logo";
import Button from "components/Button";
import XButton from "components/XButton";
import useCart from "store/cartStore";
import { saveAs } from 'file-saver';

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 4,
};

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 20,
    spread: 300,
    ticks: 200,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

const Order = () => {
  const { orderContent, totalPrice, orderType, orderStatus, table } = useShop((state: any) => state);
  const { clearCart } = useCart((state: any) => state);
  const [orderState, setOrderStatus] = useState<string>('pending');
  const [orderTypeState, setOrderType] = useState<string>('dinein');
  const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();

  const phraseObject = {
    delivery: 'Tu pedido está siendo preparado y será enviado a la dirección que nos proporcionaste cuando esté listo.',
    pickup: 'Tu pedido está siendo preparado y estará listo para que lo retires en aproximadamente 45 minutos.',
    dinein: 'Tu pedido pronto será preparado y llevado a la mesa por un/a mozo/a',
  } as {[key: string]: string};

  const refAnimationInstance: any = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.3, 0.6));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextTickAnimation();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [nextTickAnimation]);

  useEffect(() => {
    setOrderStatus(orderStatus);
    setOrderType(orderType);
    if(orderStatus !== 'success') {
      router.push('/');
    }
    clearCart();
  }, [orderStatus, router, orderType, clearCart]);

  const handleClickOrderButton = () => {
    setModal(true);
  }

  const handleModalClick = (e?: React.MouseEvent<HTMLDivElement>) => {
    e && e.stopPropagation();
    setModal(false);
  }

  const [loading, setLoading] = useState(false);

  const handleTicketButtonClick = async () => {
   setLoading(true);
    fetch(`http://localhost:3000/api/ticket`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'image/png',
        'responseType': 'arraybuffer',
        'params': JSON.stringify({orderContent, totalPrice, orderType, table})
      }
    }).then(async (res) => {

        const blob = await res.blob();
        saveAs(blob, 'ticket.png');
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <Layout baseLayout>
      <div>
        {orderState === 'success' && (
          <div className={styles.orderWrapper}>
            <div className={styles.order}>
              <h2 className={styles.readyPhrase}>¡Listo!</h2>
              <h1 className={styles.title}>Tu pedido fue enviado</h1>
              <div className={styles.circleWrapper}>
              <SucessCircle />
              </div>
              <p className={styles.info}>{phraseObject[orderTypeState]}</p>
              <button type="button" className={styles.orderButton} onClick={() => handleClickOrderButton()}>
                Ver tu pedido
              </button>
            </div>
          </div>
        )}
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={{...canvasStyles, pointerEvents: 'none', position: 'fixed'}} />
      {modal && (
        <div className={styles.modalWrapper} onClick={handleModalClick}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalClose}>
              <XButton func={handleModalClick}/>
            </div>
            <div className={styles.logoWrapper}>
              <Logo />
              <h2 className={styles.slogan}>TODO ESTÁ BIEN!</h2>
            </div>
            <p className={styles.ticketTitle}>Tu pedido</p>
            <table className={styles.ticketTable}>
              <thead>
                <tr className={styles.ticketTable_head}>
                  <th>cant</th>
                  <th>producto</th>
                  <th>descripción</th>
                  <th>precio unitario</th>
                  <th>importe</th>
                </tr>
              </thead>
              <tbody>
                {orderContent.map(({quantity, name, cost, description}: any) => (
                  <tr className={styles.ticketTable_row} key={description}>
                    <td>{quantity}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>${cost}</td>
                    <td>${cost * quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.itemsWrapper}>
                <div className={styles.bottom}>
                  <div className={styles.key}>
                    <p>Mesa</p>
                    <p>Envío</p>
                    <p>Descuento</p>
                    <h2 className={styles.total}>Total</h2>
                  </div>
                  <div className={styles.value}>
                    <p>{table}</p>
                    <p>$0</p>
                    <p>-${totalPrice * 0.2}</p>
                    <h2 className={styles.totalPrice}>${totalPrice * 0.8}</h2>
                  </div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button func={() => handleTicketButtonClick()} loading={loading}>Descargar Ticket</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Order

const SucessCircle = () => {
  return(
    <svg width="74" height="74" viewBox="0 0 74 74">
      <g transform="translate(-33.957 -27.695)">
        <path d="M107.957,64.7a37,37,0,1,1-37-37,37,37,0,0,1,37,37" transform="translate(0 0)" fill="#48a776" />
        <path d="M54.183,63.966,40.25,50.033l4.185-4.185L54.183,55.6,74.29,35.488l4.185,4.185Z" transform="translate(12.334 15.274)" fill="#fff" />
      </g>
    </svg>
  )
}

