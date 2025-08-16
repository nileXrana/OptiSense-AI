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
  setrefresh: (value: boolean) => void;
}

export default function CheckoutButton({ amount,setrefresh }: CheckoutButtonProps) {

  const router = useRouter();

  const startPayment = async () => {
    try {
      // 1. Create order from backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error('Failed to create order');
      }

      const order = await res.json();

      if (order.error) {
        alert('Error creating order: ' + order.error);
        return;
      }

      // 2. Open Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Personal AI Assistant",
        description: "Pro Plan Subscription - 500,000 Tokens",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment
            const verifyRes = await fetch("/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verify = await verifyRes.json();
            if (verify.success) {
              alert(verify.message);
              window.location.reload(); // jaruri hai :
            } else {
              alert("Payment verification failed: " + verify.message);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
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
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Button
        onClick={startPayment}
        className="px-4 py-2 bg-blue-600 w-full hover:bg-blue-700 cursor-pointer text-white rounded-lg"
      > <WalletCardsIcon />
        Upgrade To Pro
      </Button>
    </>
  );
}
