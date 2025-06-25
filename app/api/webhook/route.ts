import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("Webhook triggered 🚀")
  console.log(body)
  return NextResponse.json({ message: 'User saved' })
}

