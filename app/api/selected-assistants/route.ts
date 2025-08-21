import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { assistants, userEmail } = body
  
  // Use the email from the request body or fall back to Clerk user email
  const emailToUse = userEmail
  
  for (const obj of assistants) {
    const existing = await prisma.userAiAssistants.findFirst({
      where: { uid: emailToUse, name: obj.name },
    });
    if (!existing) {
      await prisma.userAiAssistants.create({
        data: { ...obj, uid: emailToUse },
      });
    }
  }
  return NextResponse.json("user assistants are saved in db")
}