import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { StoredCart } from './cartStore' 

type OrderType = 'delivery' | 'pickup' | 'dinein' | undefined
type OrderStatus = 'pending' | 'success'

export interface OrderState {
  orderType: OrderType;
  orderStatus: OrderStatus;
  orderContent: StoredCart[];
  totalPrice: number,
  table: number,
  setProducts: (products: StoredCart[]) => void;
  setTotalPrice: (totalPrice: number) => void;
  setTable: (table: number) => void;
  setOrderType: (orderType: OrderType) => void;
  setOrderStatus: (orderStatus: OrderStatus) => void;
  cleanShop: () => void;
}

const useShop = create(persist<OrderState>(
  (set, get) => ({
    orderContent: [],
    totalPrice: 0,
    table: 1,
    orderType: undefined as OrderType,
    orderStatus: 'pending' as OrderStatus,
    setProducts: (products: StoredCart[]) => set({ orderContent: products }),
    setTotalPrice: (totalPrice: number) => set({ totalPrice }),
    setTable: (table: number) => set({ table }),
    setOrderType: (orderType: OrderType) => set({ orderType }),
    setOrderStatus: (orderStatus: OrderStatus) => set({ orderStatus }),
    cleanShop: () => set({ orderContent: [], totalPrice: 0, table: 1, orderType: undefined, orderStatus: 'pending' })
  }), { name: 'old-shop' }
))

export default useShop