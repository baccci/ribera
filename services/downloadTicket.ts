import { QuantifiedProduct } from '@/store/cartStore'
import { Discount, OrderType } from '@/types/order'
import { saveAs } from 'file-saver'

// In this example the order data is coming from the client, but it rather should come from the database 
// using the order ID

export type DownloadTicketArgs = {
  products: QuantifiedProduct[]
  orderType: OrderType
  deliveryPrice?: number
  discounts: Discount[]
  address?: string
  date?: Date | null
}

export async function downloadTicket({
  products,
  orderType,
  deliveryPrice,
  discounts,
  address,
  date
}: DownloadTicketArgs): Promise<void> {
  try {
    const response = await fetch('/api/get-ticket', {
      method: 'POST',
      body: JSON.stringify({
        products,
        orderType,
        deliveryPrice,
        discounts,
        address,
        date
      })
    })

    console.log({ response })

    const blob = await response.blob()
    saveAs(blob, 'ticket.png')
  } catch (error) {
    console.log(error)
    throw error
  }
}