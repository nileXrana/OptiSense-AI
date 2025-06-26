import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const user = await currentUser();
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
        // picture: user.imageUrl,
        credits: 5000,
      },
    });
  }
  else {
    console.log("user already exist !")
  }

  return NextResponse.json({ message: 'User data received at backend' })
}

