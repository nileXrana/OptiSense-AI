import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
   const user = await currentUser()
   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  
  const body = await req.json()
  for (const obj of body) {
  const existing = await prisma.userAiAssistants.findFirst({
    where: {uid: user?.id, name: obj.name},
  });
  if (!existing) {
    await prisma.userAiAssistants.create({
      data: { ...obj, uid: user?.id },
    });
  }
}
  return NextResponse.json("user assistants are saved in db")
}