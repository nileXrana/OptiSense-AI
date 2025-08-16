import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: Request) {
    const user = await currentUser()
    const prisma = new PrismaClient();
    const body = await req.json();
    if (!user) return null;
    try {
        const updatedUser = await prisma.users.update({
            where: { email: user?.primaryEmailAddressId || undefined }, // change type if your id is String
            data: {
                name: body.name,
                email: body.email,
            },
        });
    }
    catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }




    return NextResponse.json({ message: "POST request successful", data: body });
}