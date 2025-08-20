import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await prisma.userAiAssistants.findMany({
      where: { uid: user?.id },
    });

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
