import { type SKRSContext2D, loadImage, GlobalFonts } from '@napi-rs/canvas'
import { Padding } from './Padding'
import { PRIMARY_COLOR, CONFIRMATION_RECT_BG_COLOR } from '../constants'
import path from 'node:path'
import { CONFIRMATION_TOAST_MESSAGE } from '@/app/order/_components/constants'
import { Order } from './Order'
import { numberToPrice } from '@/lib/numberToPrice'

const FONT_FAMILY_REGULAR = 'Rawson_Pro_regular'
const FONT_FAMILY_BOLD_ITALIC = 'Rawson_Pro_bold_italic'
const FONT_FAMILY_SEMIBOLD = 'Rawson_Pro_semibold'
const FONT_FAMILY_BOLD = 'Rawson_Pro_bold'
const FONT_FAMILY_MEDIUM = 'Rawson_Pro_medium'

export class Ticket {
  private y: number = 0
  private subtotalPrice: number = 0

  constructor(
    private context: SKRSContext2D,
    private width: number,
    private height: number = 600,
    private padding: Padding,
    private order: Order
  ) {
    this.context = context
    this.width = width
    this.height = height
    this.padding = padding
    this.order = order
  }

  public async render() {
    GlobalFonts.registerFromPath(path.join(process.cwd(), 'fonts', 'rawsonPro', 'RawsonPro-Regular.ttf'), FONT_FAMILY_REGULAR)
    GlobalFonts.registerFromPath(path.join(process.cwd(), 'fonts', 'rawsonPro', 'RawsonPro-BoldIt.ttf'), FONT_FAMILY_BOLD_ITALIC)
    GlobalFonts.registerFromPath(path.join(process.cwd(), 'fonts', 'rawsonPro', 'RawsonPro-SemiBold.ttf'), FONT_FAMILY_SEMIBOLD)
    GlobalFonts.registerFromPath(path.join(process.cwd(), 'fonts', 'rawsonPro', 'RawsonPro-Bold.ttf'), FONT_FAMILY_BOLD)
    GlobalFonts.registerFromPath(path.join(process.cwd(), 'fonts', 'rawsonPro', 'RawsonPro-Medium.ttf'), FONT_FAMILY_MEDIUM)

    this.context.fillStyle = '#fff'
    this.context.fillRect(0, 0, this.width, this.height)
    await this.printLogo()
    this.printSlogan()
    await this.printConfirmationRect()
    this.printDetail()
    this.printSubtotal()
    this.printTotal()
    this.printOrderNumber()
    this.printDate()
  }

  private async printLogo() {
    const imagePosition = {
      w: 100,
      h: 56,
      x: this.getMiddleX(100),
      y: this.padding.top
    }
    const logoPath = path.join(process.cwd(), 'public', 'ribera-logo.svg')
    const logo = await loadImage(logoPath)
    this.context.drawImage(logo, imagePosition.x, imagePosition.y, imagePosition.w, imagePosition.h)
    const totalY = imagePosition.y + imagePosition.h

    this.addY(totalY, 8)
  }

  private printSlogan() {
    this.context.fillStyle = PRIMARY_COLOR
    this.context.font = `bold italic 14px '${FONT_FAMILY_BOLD_ITALIC}'`
    this.context.textAlign = 'center'
    const textHeight = this.context.measureText('TODO ESTÁ BIEN!').actualBoundingBoxAscent || 20
    this.context.fillText('TODO ESTÁ BIEN!', this.getCenterX(), this.y + textHeight)

    this.addY(20, 24)
  }

  private async printConfirmationRect() {
    const type = this.order.paid ? 'paid' : 'unpaid'
    const message = CONFIRMATION_TOAST_MESSAGE[type]
    const rectColor = CONFIRMATION_RECT_BG_COLOR[type].light
    const logoPath = path.join(process.cwd(), 'public', 'check.svg')

    // rect drawing
    this.context.font = `bold 14px '${FONT_FAMILY_BOLD}'`
    const textWidth = this.context.measureText(message).width
    const rectWidth = textWidth + 24 + 18 + 8 // 24: padding, 18: icon, 8: flex gap
    const rectX = (this.context.canvas.width - rectWidth) / 2

    this.context.fillStyle = rectColor
    this.context.roundRect(rectX, this.y, rectWidth, 36, 18)
    this.context.fill()
    this.context.closePath()

    // icon drawing
    this.context.beginPath()
    this.context.fillStyle = CONFIRMATION_RECT_BG_COLOR[type].normal
    const circleWidth = 18
    const circleX = rectX + circleWidth / 2 + 12 // 12: padding
    const circleY = this.y + 18
    this.context.arc(circleX, circleY, circleWidth / 2, 0, 2 * Math.PI)
    this.context.fill()
    const icon = await loadImage(logoPath)
    const iconWidth = 10
    const iconHeight = 8
    const iconX = circleX - iconWidth / 2
    const iconY = circleY - iconHeight / 2
    this.context.drawImage(icon, iconX, iconY, iconWidth, iconHeight)
    this.context.closePath()

    // text drawing
    this.context.beginPath()
    this.context.fillStyle = '#000'
    this.context.textAlign = 'left'
    const textX = iconX + 18 + 4// 18: icon width, 4: flex gap
    const textY = this.y + 22
    this.context.fillText(message, textX, textY)
    this.context.closePath()
    this.addY(36, 36)
  }

  private printDetail() {
    // title
    this.context.beginPath()
    this.context.fillStyle = '#1d1d1b'
    this.context.font = `bold 24px '${FONT_FAMILY_BOLD}'`
    this.context.textAlign = 'left'
    const textHeight = this.context.measureText('Tu pedido').actualBoundingBoxAscent
    this.context.fillText('Tu pedido', this.padding.left, this.y + textHeight)
    this.context.closePath()
    this.addY(textHeight, 20)

    this.printTableHeader()
  }

  private printTableHeader() {
    // table header rect drawing
    this.context.beginPath()
    const tableHeaderHeight = 32
    this.context.fillStyle = '#F8F8F8'
    this.context.roundRect(this.padding.left, this.y, this.width - 64, tableHeaderHeight, 8)
    this.context.fill()
    this.context.fillStyle = '#64748b'

    // table header text drawing
    const textLeftPadding = 12
    const tableCornerPadding = textLeftPadding * 4 / 3
    let tableHeaderX = this.padding.left + tableCornerPadding
    const tableHeaderYCenter = this.y + 22
    this.context.font = `bold 16px '${FONT_FAMILY_BOLD}'`

    this.context.fillText('Cant.', tableHeaderX, tableHeaderYCenter)
    const quantityTextWidth = this.context.measureText('Cant.').width + textLeftPadding
    tableHeaderX += quantityTextWidth

    this.context.fillText('Producto', tableHeaderX, tableHeaderYCenter)

    const amountTextWidth = this.context.measureText('Importe').width
    tableHeaderX = this.width - (this.padding.right + tableCornerPadding + amountTextWidth)
    this.context.fillText('Importe', tableHeaderX, tableHeaderYCenter)

    const unitPriceTextWidth = this.context.measureText('P. Unitario').width
    tableHeaderX -= textLeftPadding + unitPriceTextWidth
    this.context.fillText('P. Unitario', tableHeaderX, tableHeaderYCenter)

    this.context.closePath()
    this.addY(tableHeaderHeight, 24)

    // table body drawing
    this.context.beginPath()
    this.context.fillStyle = '#64748b'
    const tableBodyY = this.y
    let wrappedTextHeight = 0
    let textY = 0

    const products = this.order.products
    products.forEach((product) => {
      const tableBodyTextY = tableBodyY + textY

      // wrapped text height reset
      wrappedTextHeight = 0

      let tableBodyTextX = this.padding.left + textLeftPadding * 2
      this.context.font = `normal 600 14px '${FONT_FAMILY_BOLD}'`
      this.context.fillText(product.quantity.toString(), tableBodyTextX, tableBodyTextY)

      // product name drawing
      this.context.font = `normal 400 14px '${FONT_FAMILY_REGULAR}'`
      tableBodyTextX = this.padding.left + tableCornerPadding + quantityTextWidth
      this.context.fillText(product.name, tableBodyTextX, tableBodyTextY)
      const productTextHeight = 10
      if (productTextHeight > wrappedTextHeight) wrappedTextHeight = productTextHeight

      // product amount price drawing
      this.context.font = `normal 500 14px '${FONT_FAMILY_MEDIUM}'`
      tableBodyTextX = this.width - (this.padding.right + tableCornerPadding + amountTextWidth)
      const subtotalPrice = product.price * product.quantity
      this.setTotalPrice(subtotalPrice)
      const subtotalPriceString = subtotalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      this.context.fillText(subtotalPriceString, tableBodyTextX, tableBodyTextY)

      // product unit price drawing
      this.context.font = `normal 400 14px '${FONT_FAMILY_REGULAR}'`
      tableBodyTextX -= textLeftPadding + unitPriceTextWidth
      const price = product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      this.context.fillText(price, tableBodyTextX, tableBodyTextY)

      textY += wrappedTextHeight + 8 // 8: margin
    })

    this.addY(textY, 24)
  }

  private printSubtotal() {
    this.context.font = `bold 14px '${FONT_FAMILY_BOLD}'`
    this.context.fillText('Subtotal', this.padding.left, this.y)
    const subtotal = numberToPrice(this.order.getSubtotalPrice())
    this.context.font = `bold 16px '${FONT_FAMILY_BOLD}'`
    const subtotalXPosition = this.width - (this.padding.right + this.context.measureText(subtotal).width)

    this.context.fillText(subtotal, subtotalXPosition, this.y)
    this.addY(24)

    // print discount 
    const discount = this.order.getDiscountsTotal()

    if (!discount) return
    const discountFromatted = discount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
    const discountText = `- ${discountFromatted} (${this.order.getDiscountTotalPercentage()}%)`

    const drawDiscountText = (x: number, y: number, render: boolean = true) => {
      this.context.font = `bold 16px '${FONT_FAMILY_BOLD}'`
      this.context.fillStyle = '#22c55e'
      if (render) this.context.fillText(discountText, x, y)
      const width = this.context.measureText(discountText).width
      const height = this.context.measureText(discountText).actualBoundingBoxAscent
      return { width, height }
    }

    const cardGap = 16
    const { width: discountCardWidth, height: discountCardHeight } = this.drawCard('Total descuentos', drawDiscountText, this.padding.left, this.y, new Padding(16), 12)
    this.order.orderType && this.drawCard('Delivery', numberToPrice(this.order.deliveryPrice), this.padding.left + discountCardWidth + cardGap, this.y, new Padding(16), 12)

    this.addY(discountCardHeight + cardGap * 2)
    this.context.fillStyle = '#1d1d1b'
  }

  private printTotal() {
    const extraTitleMargin = !this.getUsingCards() ? 24 : 0
    this.addY(extraTitleMargin)

    this.context.fillStyle = '#475569'
    this.context.font = `normal 600 14px '${FONT_FAMILY_BOLD}'`
    const totalTextHeight = this.context.measureText('Total').actualBoundingBoxAscent
    this.context.fillText('Total', this.padding.left, this.y)
    const textGap = 4
    this.addY(totalTextHeight + textGap)

    this.context.fillStyle = '#1d1d1b'
    this.context.font = `bold 24px '${FONT_FAMILY_BOLD}'`
    const totalAmountTextHeight = this.context.measureText('Total').actualBoundingBoxAscent
    this.addY(totalAmountTextHeight)
    const total = numberToPrice(this.order.getTotalPrice())
    this.context.fillText(total, this.padding.left, this.y)

    this.addY(24)
  }

  private printOrderNumber() {
    this.context.fillStyle = '#838297'
    this.context.font = `normal 400 14px '${FONT_FAMILY_REGULAR}'`
    this.context.fillText(`N° de pedido: #${this.order.orderNumber}`, this.padding.left, 20)
  }

  private printDate() {
    this.context.fillStyle = '#838297'
    this.context.font = `normal 400 14px '${FONT_FAMILY_REGULAR}'`

    const dateText = new Date(this.order.date).toLocaleDateString(
      'es-AR',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    )
    const dateTextWidth = this.context.measureText(dateText).width
    const dateTextX = this.width - (this.padding.right + dateTextWidth)
    this.context.fillText(dateText, dateTextX, 20)
  }

  private drawCard(
    title: string,
    value: string | ((x: number, y: number, render?: boolean) => { width: number, height: number }),
    x: number,
    y: number,
    padding: Padding = new Padding(32),
    borderRadius: number = 12
  ) {
    this.context.font = `normal 600 14px '${FONT_FAMILY_BOLD}'`
    this.context.fillStyle = '#475569'
    const textGap = 16
    const titleTextWidth = this.context.measureText(title).width
    const titleTextHeight = this.context.measureText(title).actualBoundingBoxAscent
    this.context.fillText(title, x + padding.left, y + padding.top + titleTextHeight)

    this.context.font = `normal 400 16px '${FONT_FAMILY_REGULAR}'`
    this.context.fillStyle = '#1d1d1b'

    const valueTextWidth = typeof value === 'string' ? this.context.measureText(value).width : value(0, 0, false).width
    const valueTextHeight = typeof value === 'string' ? this.context.measureText(value).actualBoundingBoxAscent : value(0, 0, false).height
    const valueTextX = x + padding.left
    const valueTextY = y + padding.top + titleTextHeight + valueTextHeight + textGap

    if (typeof value === 'string') {
      this.context.fillText(value, x + padding.left, y + padding.top + titleTextHeight + valueTextHeight + textGap)
    } else {
      value(valueTextX, valueTextY)
    }

    const cardWidth = padding.left + padding.right + Math.max(titleTextWidth, valueTextWidth)
    const cardHeight = padding.top + padding.bottom + titleTextHeight + valueTextHeight + textGap

    this.context.strokeStyle = '#E0E0F1'
    this.context.roundRect(x, y, cardWidth, cardHeight, borderRadius)
    this.context.stroke()

    return { width: cardWidth, height: cardHeight }
  }

  private getCenterX() {
    return this.width / 2
  }

  private getMiddleX(objectWidth: number) {
    return this.getCenterX() - objectWidth / 2
  }

  private setY(y: number, marginBottom?: number) {
    this.y = y
    if (marginBottom) {
      this.y += marginBottom
    }
  }

  private addY(y: number, marginBottom?: number) {
    this.setY(this.y + y, marginBottom)
  }

  private setTotalPrice(totalPrice: number) {
    if (totalPrice < 0) return
    this.subtotalPrice = totalPrice
  }

  private getUsingCards() {
    return !!this.order.getDiscountsTotal()
  }

  private testCoordinate(x: number, y: number, width: number = 10, height: number = 2) { // for testing purposes only
    const prevFillStyle = this.context.fillStyle
    this.context.fillStyle = '#1b1b1b'
    this.context.fillRect(x, y, width, height)
    this.context.fillStyle = prevFillStyle
  }
}
