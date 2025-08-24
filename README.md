# 🤖 OptiSense AI - Personal AI Assistant Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<div align="center">
  <h3>🚀 Live Demo: <a href="https://optisense.nileshrana.me">optisense.nileshrana.me</a></h3>
  <p><em>Your Personal AI Companions to Simplify Your Tasks</em></p>
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Overview

OptiSense AI is a modern, full-stack web application that provides users with customizable AI assistants powered by Google's Gemini AI models. Users can select from pre-built AI assistants or create their own custom ones, each with specialized instructions for different tasks like coding, writing, tutoring, and more.

### Key Highlights
- 🤖 **15+ Pre-built AI Assistants** - Code Writer, Email Writer, Personal Tutor, Fitness Coach, and more
- 🎨 **Custom Assistant Creation** - Build your own AI assistants with custom instructions
- 💬 **Real-time Chat Interface** - Smooth, responsive chat experience with typing indicators
- 🌓 **Dark/Light Mode** - Beautiful UI that adapts to user preferences
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 💳 **Integrated Payment System** - PhonePe integration for Pro subscriptions
- 🔒 **Secure Authentication** - Clerk-powered authentication with social logins
- ⚡ **Token-based Usage** - Free and Pro tiers with token management

## ✨ Features

### 🤖 AI Assistants
- **Pre-built Assistants**: 15+ specialized AI assistants including:
  - 💻 Code Writer - For programming and development tasks
  - ✉️ Email Writer - Professional email composition
  - 👨‍🏫 Personal Tutor - Educational assistance and explanations
  - 💪 Fitness Coach - Health and workout guidance
  - ✈️ Travel Planner - Trip planning and recommendations
  - 📝 Content Creator - Blog posts and social media content
  - 🔍 Bug Finder - Code debugging and error detection
  - 📊 Financial Advisor - Financial planning and advice
  - And many more...

- **Custom Assistant Creation**: 
  - Create unlimited custom AI assistants
  - Define custom instructions and personalities
  - Choose from various avatar options
  - Duplicate and modify existing assistants

### 💬 Chat Experience
- **Real-time Messaging**: Instant responses from AI assistants
- **Message History**: Persistent chat history for each assistant
- **Sample Questions**: Quick-start prompts for each assistant
- **Typing Indicators**: Visual feedback during AI response generation
- **Markdown Support**: Rich text formatting in responses

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Optimized for all screen sizes
- **Dark/Light Themes**: Toggle between themes with system preference detection
- **Mobile-First**: Touch-friendly mobile experience with overlay navigation
- **Accessibility**: Screen reader friendly with proper ARIA labels

### 💳 Payment & Subscription
- **Free Tier**: 100,000 tokens for new users
- **Pro Subscription**: Additional tokens for heavy users
- **PhonePe Integration**: Secure payment processing
- **Token Management**: Real-time token usage tracking
- **Automatic Renewal**: Seamless subscription management

### 🔒 Security & Authentication
- **Clerk Authentication**: Secure user management
- **Social Logins**: Google, GitHub, and email authentication
- **Protected Routes**: API endpoint security
- **Data Encryption**: Secure data transmission and storage

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion + Custom CSS
- **State Management**: React Context + React Hooks

### Backend
- **Runtime**: Node.js
- **API Routes**: Next.js API Routes
- **Database ORM**: Prisma
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Integration**: Google Gemini AI (2.5 Pro & Flash)

### Payment & External Services
- **Payment Gateway**: PhonePe API
- **Email Service**: Clerk (for authentication)
- **Deployment**: Vercel
- **Domain**: Custom domain with SSL

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + TypeScript
- **Database Management**: Prisma Studio
- **Version Control**: Git + GitHub

## 🎥 Demo

### 🖥️ Desktop Experience
![Desktop Interface](https://via.placeholder.com/800x400/6366f1/ffffff?text=Desktop+Interface)

### 📱 Mobile Experience
![Mobile Interface](https://via.placeholder.com/400x800/8b5cf6/ffffff?text=Mobile+Interface)

### 🤖 AI Assistants Gallery
![AI Assistants](https://via.placeholder.com/800x300/10b981/ffffff?text=AI+Assistants+Gallery)

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Clerk account for authentication
- Google AI Studio account for Gemini API
- PhonePe Merchant account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/nileXrana/Personal-AI-Assistance.git
cd Personal-AI-Assistance
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

### 4. Configure Environment Variables
See [Environment Variables](#-environment-variables) section below.

### 5. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push
```

### 6. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running! 🎉

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/optisense-ai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/signin"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/signin"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/ai-assistants"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/ai-assistants"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key_here"

# PhonePe Payment Gateway
PHONEPE_CLIENT_ID="your_phonepe_client_id"
PHONEPE_CLIENT_SECRET="your_phonepe_client_secret"
PHONEPE_CLIENT_VERSION="1.0"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### How to Get API Keys:

1. **MongoDB**: Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Clerk**: Sign up at [Clerk.com](https://clerk.com/) and create a new application
3. **Gemini AI**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. **PhonePe**: Apply for merchant account at [PhonePe Developer](https://developer.phonepe.com/)

## 🗄️ Database Setup

### Schema Overview
The application uses MongoDB with Prisma ORM. Main collections:

- **users**: User profiles, credits, and subscription info
- **userAiAssistants**: Custom AI assistants created by users
- **feedback**: User feedback and ratings

### Initialize Database
```bash
# Install Prisma CLI globally (optional)
npm install -g prisma

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (optional)
npx prisma studio
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Fork the Repository**
2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your forked repository
   - Configure environment variables
   - Deploy!

3. **Custom Domain Setup**:
   ```bash
   # Add your custom domain in Vercel dashboard
   # Configure DNS records:
   # Type: CNAME, Name: @, Value: cname.vercel-dns.com
   ```

### Environment Variables for Production
Make sure to set all environment variables in your Vercel dashboard, replacing development URLs with production ones.

## 📚 API Endpoints

### Authentication
- `POST /api/save-user` - Create/retrieve user profile
- `POST /api/updateToken` - Update user token usage

### AI Assistants
- `POST /api/selected-assistants` - Save user's selected assistants
- `POST /api/is-selected` - Get user's assistants
- `POST /api/delete-assistant` - Delete an assistant
- `POST /api/user-instruct` - Update assistant instructions

### Chat
- `POST /api/chat` - Send message to AI assistant

### Payment
- `POST /api/generate-token` - Generate PhonePe payment token
- `POST /api/payment-status` - Check payment status
- `POST /api/pro-user` - Upgrade user to Pro

### Feedback
- `POST /api/feedback` - Submit user feedback
- `POST /api/get-feedback` - Retrieve feedback list

## 📁 Project Structure

```
optisense-ai/
├── app/                          # Next.js 13+ App Router
│   ├── (main)/                   # Main application routes
│   │   ├── dashboard/            # Main dashboard
│   │   │   ├── _component/       # Dashboard components
│   │   │   │   ├── AssistantList.tsx    # Sidebar with assistants
│   │   │   │   ├── ChatUi.tsx           # Main chat interface
│   │   │   │   ├── AddNewAssistant.tsx  # Create new assistant
│   │   │   │   └── AssistantSetting.tsx # Assistant settings
│   │   │   └── page.tsx          # Dashboard main page
│   │   └── ai-assistants/        # Assistant selection page
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chat endpoints
│   │   ├── (payment)/            # Payment-related APIs
│   │   └── ...                   # Other API endpoints
│   ├── signin/                   # Authentication pages
│   ├── about-payment/            # Payment information
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn/ui components
│   └── ...                       # Custom components
├── context/                      # React Context providers
│   ├── AssistantContext.tsx      # Assistant state management
│   ├── ModelContext.tsx          # AI model selection
│   └── UserProvider.tsx          # User data management
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Database client
│   ├── geminiClient.ts           # AI client
│   └── utils.ts                  # Helper functions
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema definition
├── public/                       # Static assets
│   ├── *.png                     # Assistant avatars
│   └── ...                       # Other static files
├── services/                     # Business logic
│   └── AiAssistantsList.tsx      # Pre-built assistants data
├── src/components/magicui/       # Custom UI components
└── package.json                  # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 1. Fork the Repository
```bash
git clone https://github.com/yourusername/Personal-AI-Assistance.git
cd Personal-AI-Assistance
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
- Follow TypeScript best practices
- Maintain consistent code style
- Add comments for complex logic
- Test your changes thoroughly

### 4. Commit Your Changes
```bash
git commit -m "Add amazing feature"
```

### 5. Submit a Pull Request
- Describe your changes clearly
- Include screenshots for UI changes
- Reference any related issues

### Development Guidelines
- Use TypeScript for type safety
- Follow component composition patterns
- Implement responsive design principles
- Add error handling for API calls
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Nilesh Rana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

### Developer: Nilesh Rana

- **🌐 Website**: [optisense.nileshrana.me](https://optisense.nileshrana.me)
- **💼 LinkedIn**: [linkedin.com/in/nilexrana](https://linkedin.com/in/nilexrana)
- **📧 Email**: [nileshrana.developer@gmail.com](mailto:nileshrana.developer@gmail.com)
- **🐙 GitHub**: [github.com/nileXrana](https://github.com/nileXrana)

### Project Links
- **📊 Repository**: [github.com/nileXrana/Personal-AI-Assistance](https://github.com/nileXrana/Personal-AI-Assistance)
- **🚀 Live Demo**: [optisense.nileshrana.me](https://optisense.nileshrana.me)
- **📋 Issues**: [Report Issues](https://github.com/nileXrana/Personal-AI-Assistance/issues)
- **💡 Feature Requests**: [Request Features](https://github.com/nileXrana/Personal-AI-Assistance/discussions)

---

<div align="center">
  <p><strong>⭐ If you found this project helpful, please consider giving it a star on GitHub! ⭐</strong></p>
  <p><em>Built with ❤️ by Nilesh Rana</em></p>
</div>
