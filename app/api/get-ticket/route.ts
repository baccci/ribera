import { generateTicket } from '@/lib/generateTicket/generateTicket'

export async function POST(request: Request) {
  try {
    const res = await request.json()
    const ticket = await generateTicket({ ...res })

    return new Response(ticket, {
      headers:
        { 'Content-Type': 'image/png' }
    })
  } catch (error) {
    console.log(error)
    return new Response(error as string, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}