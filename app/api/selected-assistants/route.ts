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
  
  let addedCount = 0
  let duplicateNames = []
  
  for (const obj of assistants) {
    const existing = await prisma.userAiAssistants.findFirst({
      where: { uid: emailToUse, name: obj.name },
    });
    if (!existing) {
      await prisma.userAiAssistants.create({
        data: { ...obj, uid: emailToUse },
      });
      addedCount++
    } else {
      duplicateNames.push(obj.name)
    }
  }
  
  if (duplicateNames.length > 0) {
    return NextResponse.json({ 
      success: false,
      error: "duplicate_name", 
      message: `Assistant with name "${duplicateNames[0]}" already exists`,
      duplicateNames 
    }, { status: 409 })
  }
  
  return NextResponse.json({ 
    success: true,
    message: "Assistant added successfully",
    addedCount 
  })
}