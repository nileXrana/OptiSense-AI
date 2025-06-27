import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient()
  const body = await req.json()
  // check if user already exist :
  const existingUser = await prisma.users.findUnique({
    where: { email: body.email },
  });
  if (!existingUser) {
    // Create new user
    await prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
        credits: 5000,
        picture: body.picture
      },
    });
  }
  else {
    console.log("user already exist !")
  }
  return NextResponse.json(body)
}

