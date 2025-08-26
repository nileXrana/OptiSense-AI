// REST API route handling multiple HTTP methods in Next.js :
import { access } from "fs";
import { NextRequest, NextResponse } from "next/server";
function generateMerchantOrderId() {
    return "order_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}


// ✅ GET request
export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "GET request nileshOP" });
}

// ✅ POST request
export async function POST(req: NextRequest) {
    try {
        // 1. generate access token from phonepe api :
        const params = new URLSearchParams();
        params.append("client_id", process.env.PHONEPE_CLIENT_ID!);
        params.append("client_secret", process.env.PHONEPE_CLIENT_SECRET!);
        params.append("client_version", process.env.PHONEPE_CLIENT_VERSION!);
        params.append("grant_type", "client_credentials");
        const res = await fetch('https://api.phonepe.com/apis/identity-manager/v1/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        const obj = await res.json(); // has access_token
        console.log(obj)

        // 2. create payment :
        if (obj.access_token) {
            const merchantOrderId = generateMerchantOrderId();
            const paymentRes = await fetch('https://api.phonepe.com/apis/pg/checkout/v2/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `O-Bearer ${obj.access_token}`,
                },
                body: JSON.stringify({
                    merchantOrderId: merchantOrderId,
                    amount: 1000, // amount in paise
                    paymentFlow: {
                        type: "PG_CHECKOUT",
                        message: "OptiSense AI Premium",
                        merchantUrls: {
                            redirectUrl: "https://optisense.nileshrana.me/dashboard"
                        }
                    },
                }),
            });
            const paymentObj = await paymentRes.json();
            console.log(paymentObj)
            
            // return the checkout URL to the client :
            const checkoutUrl = paymentObj.redirectUrl
            console.log(checkoutUrl)
            if (checkoutUrl) {
                return NextResponse.json({ 
                    success: true,
                    redirectUrl: checkoutUrl,
                    accessToken: obj.access_token,
                    orderId: paymentObj.orderId,
                    merchantOrderId: merchantOrderId
                });
            } else {
                console.error('No checkout URL found in payment response');
                return NextResponse.json({ 
                    error: "No checkout URL found", 
                    paymentResponse: paymentObj 
                }, { status: 400 });
            }

        }


        return NextResponse.json({ message: "POST request successful", data: res });
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
