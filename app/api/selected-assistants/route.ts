import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
   const user = await currentUser()
   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const prisma = new PrismaClient()
  const body = await req.json()
  for (const obj of body) {
  const existing = await prisma.userAiAssistants.findFirst({
    where: { id: obj.id, uid: user?.id },
  });
  if (!existing) {
    await prisma.userAiAssistants.create({
      data: { ...obj, uid: user?.id },
    });
  }
}
  return NextResponse.json("user assistants are saved in db")
}