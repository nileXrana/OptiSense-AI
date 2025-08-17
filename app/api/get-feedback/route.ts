import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" }, // latest first
    });
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}
