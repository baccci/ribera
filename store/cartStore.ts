import { Product } from '@/types/types'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { quantifyProducts } from './utils/quantifyProducts'

export type CartDetail = {
  [code: string]: Product[]
}

export type QuantifiedProduct = Product & { quantity: number }

export interface CartState {
  cartContent: CartDetail
  addItem: (product: Product) => void
  removeItem: (product: Product) => void
  getProductQuantity: (product: Product) => number
  getQuantity: () => number
  getItems: () => CartDetail
  getQuantifiedItems: () => QuantifiedProduct[]
  getTotalPrice: () => number
  clearCart: () => void
}

const useCart = create(
  persist<CartState>(
    (set, get) => ({
      cartContent: {},

      addItem: (product: Product) => {
        const { code } = product
        const cartContent = get().cartContent

        if (cartContent[code]) {
          cartContent[code].push(product)
        } else {
          cartContent[code] = [product]
        }

        set({ cartContent })
      },

      removeItem: (product: Product | QuantifiedProduct) => {
        const { code } = product
        const cartContent = get().cartContent

        if (cartContent[code]) {
          cartContent[code].pop()
        }

        set({ cartContent })
      },

      getProductQuantity: (product: Product | QuantifiedProduct) => {
        const { code } = product
        const cartContent = get().cartContent

        if (cartContent[code]) return cartContent[code].length
        return 0
      },

      getQuantity: () => {
        const cartContent = get().cartContent
        const cartCodes = Object.keys(cartContent)

        return cartCodes.reduce((acc, code) => {
          return acc + (cartContent[code].length || 0)
        }, 0)
      },

      getItems: () => {
        return get().cartContent
      },

      getTotalPrice: () => {
        const cartContent = get().cartContent
        const cartCodes = Object.keys(cartContent)

        return cartCodes.reduce((acc, code) => {
          const product = cartContent[code][0]
          if (!product) return acc

          const quantity = cartContent[code].length
          return (acc + product?.price * quantity) || 0
        }, 0)
      },

      getQuantifiedItems: () => {
        const cartContent = structuredClone(get().cartContent)

        return quantifyProducts(cartContent)
      },

      clearCart: () => {
        set({ cartContent: {} })
      }

    }),
    { name: 'cart' }
  )
)
export default useCart