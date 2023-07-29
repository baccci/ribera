import React from 'react'

const Cart = () => {
  return (
    <>
      <CartSVG/>
    </>
  )
}

export default Cart

const CartSVG = () => {
  return(
    <svg width="24.14" height="28" viewBox="0 0 27.293 31">
      <g transform="translate(1.577 1.5)">
        <path d="M23.585,4.218H1.6L.526,25.638H24.664Z" transform="translate(-0.526 2.362)" fill="none" stroke="#3d3d3d" strokeMiterlimit="10" strokeWidth="3" />
        <path d="M16.712,7.08a6.527,6.527,0,1,0-13.054,0" transform="translate(1.885 -0.5)" fill="none" stroke="#3d3d3d" strokeMiterlimit="10" strokeWidth="3" />
      </g>
      <style jsx>
        {`svg{cursor: pointer}`}
      </style>
    </svg>
  )
}