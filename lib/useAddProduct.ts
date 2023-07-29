import useCart, { StoredCart } from "store/cartStore";
import type { Product } from "pages/productos";



const useAddProduct = (code: string, product: Product) => {
  const mycart = useCart((state: any) => state.cart);
  const updateCart = useCart((state: any) => state.updateCart);
  const addToCart = useCart((state: any) => state.addToCart);

  const addProduct = () => {
    const index = mycart.findIndex((item: StoredCart) => item.code === code);
    if (index !== -1) {
      mycart[index].quantity++;
      updateCart({ product, mycart });
    } else {
      addToCart({...product, quantity: 1});
    }
  }

  return addProduct;
};

export default useAddProduct;