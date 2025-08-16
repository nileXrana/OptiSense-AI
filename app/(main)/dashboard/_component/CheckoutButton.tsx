import { Button } from "@/components/ui/button";
import { WalletCardsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutButtonProps {
  amount: number;
}

export default function CheckoutButton({ amount }: CheckoutButtonProps) {

  const router = useRouter();

  const startPayment = async () => {
    // 1. Create order from backend
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const order = await res.json();

    // 2. Open Razorpay popup
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Personal AI Assistant",
      description: "Subscription Payment",
      order_id: order.id,
      handler: async function (response: any) {
        // 3. Verify payment
        const verifyRes = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const verify = await verifyRes.json();
        if(verify.success){
            router.refresh()
            alert(verify.message);
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Button
        onClick={startPayment}
        className="px-4 py-2 bg-blue-600 w-full cursor-pointer text-white rounded-lg"
      > <WalletCardsIcon />
        Upgrade To Pro
      </Button>
    </>
  );
}
