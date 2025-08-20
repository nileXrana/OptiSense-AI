import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" }, // latest first
    });
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}
