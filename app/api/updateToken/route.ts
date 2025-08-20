import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    
    try {
        const body = await req.json();
        
        // Validate required fields
        if (!body.email || body.tokenCount === undefined || body.tokenCount === null) {
            return NextResponse.json({ 
                error: "Missing required fields: email and tokenCount",
                received: {
                    email: body.email,
                    tokenCount: body.tokenCount,
                    hasEmail: !!body.email,
                    hasTokenCount: body.tokenCount !== undefined && body.tokenCount !== null
                }
            }, { status: 400 });
        }

        // Ensure tokenCount is a number
        const tokenCount = parseInt(body.tokenCount);
        if (isNaN(tokenCount) || tokenCount < 0) {
            return NextResponse.json({ 
                error: "tokenCount must be a valid positive number or zero",
                received: body.tokenCount,
                parsed: tokenCount
            }, { status: 400 });
        }

        // Use a simple approach - get user, calculate new value, update
        try {
            // First, get the current user data
            const existingUser = await prisma.users.findFirst({
                where: { email: body.email }
            });

            if (!existingUser) {
                return NextResponse.json({ 
                    error: "User not found" 
                }, { status: 404 });
            }

            // Calculate new token count
            const newTokenUsed = existingUser.tokenUsed + tokenCount;

            // Update with the new value
            const updatedUser = await prisma.users.updateMany({
                where: { email: body.email },
                data: {
                    tokenUsed: newTokenUsed
                },
            });

            // Get the updated user to return current values
            const finalUser = await prisma.users.findFirst({
                where: { email: body.email }
            });

            if (!finalUser) {
                throw new Error("User not found after update");
            }

            // Check if token limit exceeded
            const tokenExceeded = finalUser.tokenUsed >= finalUser.credits;
            
            return NextResponse.json({ 
                message: "Token update successful", 
                tE: tokenExceeded,
                tokenUsed: finalUser.tokenUsed,
                credits: finalUser.credits
            });

        } catch (dbError) {
            console.error("Database operation failed:", dbError);
            throw dbError; // Re-throw to be caught by outer catch
        }

    } catch (error) {
        console.error("Error in updateToken API:", error);
        return NextResponse.json({ 
            error: "Failed to update tokens", 
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}