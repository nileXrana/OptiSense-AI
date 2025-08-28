# Razorpay Integration for OptiSense AI

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install razorpay
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your Razorpay credentials:
   ```
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

3. **Database Schema Update**
   Run the following to update your database schema:
   ```bash
   npx prisma generate
   ```

## API Routes Created

- `POST /api/razorpay/create-order` - Creates a payment order
- `POST /api/razorpay/verify-payment` - Verifies payment signature and updates user
- `POST /api/razorpay/webhook` - Handles Razorpay webhooks

## Features

- ✅ Secure payment processing with Razorpay
- ✅ Payment signature verification
- ✅ Automatic user upgrade to Pro plan (100,000 credits)
- ✅ Token usage reset on upgrade
- ✅ Mobile-friendly payment modal
- ✅ Error handling and user feedback

## Testing

1. Use Razorpay test mode with test card numbers
2. Test card: 4111 1111 1111 1111
3. Any future expiry date and CVV

## Security Features

- Payment signature verification
- Webhook signature validation
- Server-side payment verification
- Secure environment variable handling
