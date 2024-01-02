import { type CanvasRenderingContext2D } from 'canvas'
import { Padding } from './Padding'
import { Order } from './Order'

export function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
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

export function calculateCanvasHeight(order: Order, padding: Padding) {
  const baseHeight = padding.top + padding.bottom + 390
  const productsQuantity = order.products.length
  const detailLineHeight = 16
  const detailTotalHeight = detailLineHeight * productsQuantity
  const cardsHeight = order.getDiscountsTotal() ? 68 : 0

  return baseHeight + detailTotalHeight + cardsHeight
}