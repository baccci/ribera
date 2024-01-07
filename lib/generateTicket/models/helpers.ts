import { type SKRSContext2D } from '@napi-rs/canvas'
import { Padding } from './Padding'
import { Order } from './Order'

export function wrapText(context: SKRSContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const words = text.split(' ')
  let line = ''
  let totalHeight = 0

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = context.measureText(testLine)
    const testWidth = metrics.width

    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = words[n] + ' '
      y += lineHeight
      totalHeight += lineHeight
    } else {
      line = testLine
    }
  }

  context.fillText(line, x, y)
  totalHeight += lineHeight

  return totalHeight
}

export function calculateCanvasHeight(order: Order, padding: Padding, detailLineHeight: number = 16) {
  const baseHeight = padding.top + padding.bottom + 390
  const productsQuantity = order.products.length
  const detailTotalHeight = detailLineHeight * productsQuantity
  const cardsHeight = order.getDiscountsTotal() ? 68 : 0
  const discountsHeight = order.discounts.length
    ? (order.discounts.length + 2) * detailLineHeight
    : 0

  return baseHeight + detailTotalHeight + cardsHeight + discountsHeight
}