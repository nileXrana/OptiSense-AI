import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
   const user = await currentUser()
   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const prisma = new PrismaClient()
  const body = await req.json()
  // add each assistant to db with user id :
  const addedItems = await prisma.userAiAssistants.createMany({
    data: body.map((item: any) => ({
      ...item,
      uid: user?.id
    }))
  })
  return NextResponse.json("user assistants are saved in db")
}