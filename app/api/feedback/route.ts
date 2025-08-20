import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const feedback = await request.json();
    await prisma.feedback.create({
        data: feedback
    });

    return NextResponse.json({ message: 'Feedback submitted successfully!' });
}
