# 🤖 OptiSense AI

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<div align="center">
  <h3>🚀 <a href="https://optisense.nileshrana.me">Live Demo</a></h3>
  <p><em>Your Personal AI Companions to Simplify Your Tasks</em></p>
</div>

## ✨ Features

- 🤖 **15+ Pre-built AI Assistants** - Code Writer, Email Writer, Personal Tutor, Fitness Coach, and more
- 🎨 **Custom Assistant Creation** - Build your own AI assistants with personalized instructions
- 💬 **Real-time Chat Interface** - Smooth chat experience with Google Gemini AI
- 🌓 **Dark/Light Mode** - Beautiful responsive UI for all devices
- 💳 **Payment Integration** - PhonePe payment system for Pro subscriptions
- � **Secure Authentication** - Clerk-powered auth with social logins

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, MongoDB
- **AI**: Google Gemini 2.5 (Pro & Flash models)
- **Auth**: Clerk Authentication
- **Payment**: PhonePe API
- **Deployment**: Vercel

## � Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Clerk account
- Google AI Studio API key

### Installation

```bash
# Clone repository
git clone https://github.com/nileXrana/Personal-AI-Assistance.git
cd Personal-AI-Assistance

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="mongodb+srv://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# PhonePe Payment (Optional)
PHONEPE_CLIENT_ID="your_client_id"
PHONEPE_CLIENT_SECRET="your_client_secret"
```

##  Project Structure

```
app/
├── (main)/dashboard/     # Main dashboard with chat interface
├── api/                  # API routes (chat, auth, payment)
├── signin/              # Authentication pages
└── page.tsx             # Landing page

components/               # Reusable UI components
context/                 # React Context for state management
lib/                     # Database and utility functions
prisma/                  # Database schema
```

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nileXrana/Personal-AI-Assistance)

## 📞 Contact

**Nilesh Rana**
- 🌐 [Website](https://optisense.nileshrana.me)
- 💼 [LinkedIn](https://linkedin.com/in/nilexrana)
- 📧 [Email](mailto:nileshrana.developer@gmail.com)
- 🐙 [GitHub](https://github.com/nileXrana)

---

<div align="center">
  <p><strong>⭐ Star this repo if you find it helpful!</strong></p>
  <p><em>Built with ❤️ by Nilesh Rana</em></p>
</div>
