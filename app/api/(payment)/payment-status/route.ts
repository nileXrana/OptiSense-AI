import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
    try {
        // Step 1: Parse request body
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            return NextResponse.json(
                { success: false, error: "Invalid JSON in request body", details: parseError instanceof Error ? parseError.message : String(parseError) },
                { status: 400 }
            );
        }

        // Step 2: Validate required fields
        const { orderId, accessToken, merchantOrderId, email } = body;
        
        if (!merchantOrderId) {
            return NextResponse.json(
                { success: false, error: "merchantOrderId is required" },
                { status: 400 }
            );
        }
        
        if (!accessToken) {
            return NextResponse.json(
                { success: false, error: "accessToken is required" },
                { status: 400 }
            );
        }

        // Step 3: Prepare API call
        const apiUrl = `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `O-Bearer ${accessToken}`,
        };

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        // Step 4: Make API call to PhonePe
        let response;
        try {
            response = await fetch(apiUrl, requestOptions);
        } catch (fetchError) {
            return NextResponse.json(
                { success: false, error: "Failed to connect to PhonePe API", details: fetchError instanceof Error ? fetchError.message : String(fetchError) },
                { status: 500 }
            );
        }

        // Step 5: Parse PhonePe response
        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            const responseText = await response.text();
            return NextResponse.json(
                { success: false, error: "Invalid response from PhonePe", details: jsonError instanceof Error ? jsonError.message : String(jsonError), rawResponse: responseText },
                { status: 500 }
            );
        }

        // Step 6: Check if PhonePe API call was successful
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: "PhonePe API error", status: response.status, details: result },
                { status: response.status }
            );
        }

        // Step 7: Return successful response
        return NextResponse.json({
            success: true,
            message: "Payment status retrieved successfully",
            data: result,
        });

    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                error: "Unexpected server error", 
                message: error instanceof Error ? error.message : String(error),
                stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : String(error)) : undefined
            },
            { status: 500 }
        );
    }
}
