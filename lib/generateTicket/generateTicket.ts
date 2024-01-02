import { createCanvas } from 'canvas'
import { Ticket } from './models/Ticket'
import { Padding } from './models/Padding'
import { Order } from './models/Order'
import { calculateCanvasHeight } from './models/helpers'
import { DownloadTicketArgs } from '@/services/downloadTicket'

type generateTicketArgs = Partial<DownloadTicketArgs>

export async function generateTicket({
  products,
  orderType,
  deliveryPrice,
  discounts,
  address,
  date
}: generateTicketArgs) {
  const order = new Order({
    products: products || [],
    orderType,
    discounts,
    adress: address,
    date: date || new Date(),
    deliveryPrice
  })
  const canvasPadding = new Padding(64, 32, 32, 32)
  const canvasHeight = calculateCanvasHeight(order, canvasPadding)
  const canvasWidth = 450

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const context = canvas.getContext('2d')

  const ticket = new Ticket(context, canvasWidth, canvasHeight, canvasPadding, order)
  await ticket.render()

  const buffer = canvas.toBuffer('image/png')
  return buffer
}