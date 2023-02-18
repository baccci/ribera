import create from 'zustand';
import { persist } from 'zustand/middleware';

export type StoredCart = {
  code: string,
  name: string,
  cost: number,
  description: string,
  imagePath: string,
  quantity: number,
}

export interface CartState{
  total: number;
  quantity: number;
  cartContent: StoredCart[];
  addToCart: (params: StoredCart) => void;
  updateCart: ({params, mycart}: {params: StoredCart, mycart: StoredCart[]}) => void;
  clearCart: () => void;
  removeFromCart: (params: StoredCart) => void;
}


const useCart = create(
  persist(
    (set, get) => ({
      totalPrice: 0,
      quantity: 0,
      cartContent: [],
      addToCart: (params: StoredCart) => {
        set((state: any) => ({
          quantity: state.quantity + 1,
          totalPrice: state.totalPrice + params.cost,
          cartContent: [...state.cartContent, params],
        }));
      },

      updateCart: ({ product, mycart }: {product: StoredCart, mycart: StoredCart[]}) => {
        set((state: any) => ({
          quantity: state.quantity + 1,
          totalPrice: state.totalPrice + product.cost,
          cartContent: mycart,
        }));
      },

      removeOneFromCart: ({product, mycart}: {product: StoredCart, mycart: StoredCart[]}) => set((state: any) => ({
        totalPrice: state.totalPrice - product.cost,
        quantity: state.quantity - 1,
        cartContent: mycart,
      })),

      clearCart: () => set({quantity: 0, totalPrice: 0, cartContent: [] }),
      removeFromCart: (product: StoredCart) =>
        set((state: any) => ({
          totalPrice: state.totalPrice - (product.cost * product.quantity),
          quantity: state.quantity - product.quantity,
          cartContent: state.cartContent.filter(
            (item: StoredCart) => item.code !== product.code
          ),
        }))
    }),
    { name: 'cart' }
  )
);
export default useCart;