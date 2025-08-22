import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate that userEmail is provided
    if (!body.userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }
    
    const data = await prisma.userAiAssistants.findMany({
      where: { uid: body.userEmail },
    });

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in /api/is-selected:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
