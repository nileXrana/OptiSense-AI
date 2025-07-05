import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient()
  const user = await currentUser();
  try {
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { instruction, id } = await req.json();
    // const updatedAssistant = await prisma.userAiAssistants.update({
    //   where: {
    //     id: id,
    //     uid: user.id,
    //   },
    //   data: {
    //     userInstruction: instruction,
    //   },
    // });
    const assistant = await prisma.userAiAssistants.findFirst({
  where: {
    id: id,         // numeric id
    uid: user.id,   // user’s Clerk uid
  },
});
if (!assistant) {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
const updated = await prisma.userAiAssistants.update({
  where: {
    ID: assistant.ID,  // use _id from found assistant
  },
  data: {
    userInstruction: instruction,
  },
});

    return NextResponse.json(assistant);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }


  return NextResponse.json("user assistants are saved in db")
}