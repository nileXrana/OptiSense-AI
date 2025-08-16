import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma';
import { currentUser } from "@clerk/nextjs/server"
import crypto from "crypto";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fix email extraction
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }

        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        console.log("Payment verification request:", { razorpay_order_id, razorpay_payment_id, email });

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required payment verification fields"
                },
                { status: 400 }
            );
        }

        // Verify Razorpay signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        console.log("Signature verification:", { expectedSignature, razorpay_signature });

        if (expectedSignature === razorpay_signature) {
            // Payment is verified, update user's account
            console.log("Payment verified, updating user account for:", email);

            const USER = await prisma.users.findFirst({
                where: {
                    email: email
                },
            });

            if (!USER) {
                console.error("User not found in database:", email);
                return NextResponse.json(
                    {
                        success: false,
                        message: "User not found"
                    },
                    { status: 404 }
                );
            }

            console.log("Current user data:", USER);

            // Update user with order ID and credits
            const updated = await prisma.users.update({
                where: { email: email },
                data: { 
                    orderId: razorpay_order_id,
                    tokenUsed: 0,
                    credits: 500000
                },
            });

            console.log("User updated successfully:", updated);

            return NextResponse.json({
                success: true,
                message: "Payment verified ✅"
            });
        } else {
            console.log("Signature verification failed");
            return NextResponse.json(
                {
                    success: false,
                    message: "Payment verification failed ❌"
                },
                { status: 400 }
            );
        }

    } catch (error: any) {
        console.error("Payment verification error:", error);
        console.error("Error stack:", error.stack);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error during payment verification",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    return NextResponse.json(
        { success: false, message: "Method Not Allowed" },
        { status: 405 }
    );
}
