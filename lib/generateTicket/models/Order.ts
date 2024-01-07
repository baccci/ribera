import { QuantifiedProduct } from '@/store/cartStore'
import { Discount, OrderType, PaymentMethod } from '@/types/order'

type OrderArg = {
  date?: Date,
  products: QuantifiedProduct[],
  orderType?: 'delivery' | 'pickup'
  paid?: boolean,
  discounts?: Discount[],
  orderNumber?: null | string,
  adress?: null | string,
  phone?: null | string,
  name?: null | string,
  deliveryPrice?: number
  paymentMethod?: PaymentMethod
}

export class Order {
  date: Date
  products: QuantifiedProduct[]
  paid: boolean
  discounts: Discount[] = []
  orderNumber: null | string = null
  adress: null | string = null
  phone: null | string = null
  name: null | string = null
  orderType: OrderType = 'pickup'
  deliveryPrice: number = 0
  paymentMethod: PaymentMethod = null

  constructor({
    date = new Date(),
    products,
    paid = false,
    discounts = [],
    orderNumber = '12345',
    adress = null,
    phone = null,
    name = null,
    orderType = 'pickup',
    deliveryPrice,
    paymentMethod = null
  }: OrderArg) {
    this.products = products
    this.paid = paid
    this.discounts = discounts
    this.adress = adress
    this.phone = phone
    this.name = name
    this.date = date
    this.orderNumber = orderNumber
    this.orderType = orderType
    this.deliveryPrice = deliveryPrice || 0
    this.paymentMethod = paymentMethod
  }

  getSubtotalPrice() {
    const price = this.products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    return price
  }

  getDiscountsTotal() {
    const subtotalPrice = this.getSubtotalPrice()
    const discountsTotal = this.discounts.reduce((acc, discount) => {
      if (discount.discountType === 'percentage') {
        return acc + subtotalPrice * (discount.value / 100)
      }
      return acc + discount.value
    }, 0)
    return discountsTotal
  }

  getDiscountTotalPercentage() {
    const subtotalPrice = this.getSubtotalPrice()
    const discountsTotal = this.getDiscountsTotal()
    return (discountsTotal / subtotalPrice) * 100
  }

  getTotalPrice() {
    const deliveryPrice = this.orderType === 'delivery' ? this.deliveryPrice : 0
    const subtotalPrice = this.getSubtotalPrice()
    const discountsTotal = this.getDiscountsTotal()
    const totalPrice = subtotalPrice - discountsTotal + deliveryPrice
    return totalPrice
  }
}