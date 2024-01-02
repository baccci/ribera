import { NextApiResponse } from 'next'
import { yellow, red } from 'colorette'
import generateHTML from '@/lib/genTicketHTML-old'
import nodeHtmlToImage from 'node-html-to-image'

export default async function ticket(req: any, res: NextApiResponse) {
  console.log(yellow('GET /ticket'))
  try {
    console.log(req.headers.params)
    const params = JSON.parse(req.headers.params)
    const { orderContent, totalPrice, table } = params
    const html = generateHTML(orderContent, totalPrice, table)
    const image = await nodeHtmlToImage({
      html
    })
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(image, 'binary')
  } catch (err) {
    console.log(red(`Error on GET /products: ${err}`))
    res.status(500).json({ message: 'Error' })
  }
}