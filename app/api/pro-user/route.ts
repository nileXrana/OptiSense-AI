import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId, email } = body;

        if (!orderId || !email) {
            return NextResponse.json(
                { success: false, error: "orderId and email are required" },
                { status: 400 }
            );
        }
        // find user by email :
        const user = await prisma.users.findUnique({
            where: { email: email },
        });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }
        if (user.tokenUsed >= user.credits) {
            const updatedUser = await prisma.users.update({
                where: { email: email },
                data: {
                    credits: 500000,
                    tokenUsed: 0,
                    orderId: orderId
                },
            });
            return NextResponse.json({
                success: true,
                message: "POST request successful",
                user: updatedUser,
            });
        } else {
            const updatedUser = await prisma.users.update({
                where: { email: email },
                data: {
                    credits: { increment: 500000 }, // add 500000 credits(PRO)
                    orderId: orderId
                },
            });
            return NextResponse.json({
                success: true,
                message: "POST request successful",
                user: updatedUser,
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "Invalid request or server error" },
            { status: 400 }
        );
    }
}
