import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name } = await req.json();
    // Find the assistant with matching id and uid
    const assistant = await prisma.userAiAssistants.findFirst({
      where: {
        name: name,
        uid: user.id,
      },
    })
    if (!assistant) {
      return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
    }
    // Delete using _id (if your schema has _id)
    await prisma.userAiAssistants.delete({
      where: { ID: assistant.ID },
    });
    return NextResponse.json({ message: "Assistant deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete assistant" }, { status: 500 });
  }
}
