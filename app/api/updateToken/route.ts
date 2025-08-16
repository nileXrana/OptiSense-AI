import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma';

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const body = await req.json();

    try {
        // update tokenUsed :
        const updatedUser = await prisma.users.update({
            where: { email: body.email }, // change type if your id is String
            data: {
                tokenUsed: {
                    increment: body.tokenCount
                }
            },
        });
        
        // send status of tokenExceeded :
        if(updatedUser.tokenUsed >= updatedUser.credits){
            return NextResponse.json({ message: "POST request successful", tE: true });
        }else{
            return NextResponse.json({ message: "POST request successful", tE: false });
        }

    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}