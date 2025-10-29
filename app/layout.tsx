
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@/context/UserProvider';
import { Toaster } from "sonner";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://optisense.nileshrana.me"),
  title: {
    default: "OptiSense AI — Personal & Business AI Assistants",
    template: "%s | OptiSense AI",
  },
  description:
    "OptiSense AI provides 50+ specialized AI assistants for coding, writing, finance, productivity and more. Fast, affordable, and tailored to professionals and teams.",
  keywords: [
    "OptiSense", "OptiSense AI", "AI assistants", "AI tools", "personal AI", "AI SaaS", "Google Gemini", "Razorpay", "Clerk auth", "Next.js", "productivity AI", "AI for developers", "content AI", "AI marketplace",
  ],
  authors: [
    { name: "Nilesh Rana", url: "https://nileshrana.me" },
  ],
  creator: "Nilesh Rana",
  publisher: "OptiSense AI",
  openGraph: {
    title: "OptiSense AI — Personal & Business AI Assistants",
    description:
      "50+ purpose-built AI assistants, custom assistant builder, pay-as-you-go credits. Built with Google Gemini, Next.js and Prisma.",
    url: "https://optisense.nileshrana.me",
    siteName: "OptiSense AI",
    images: [
      {
        url: "https://optisense.nileshrana.me/robot.jpg",
        width: 1200,
        height: 630,
        alt: "OptiSense AI assistants",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiSense AI — Personal & Business AI Assistants",
    description:
      "50+ purpose-built assistants & custom assistant builder. Low-cost, India-first payments via Razorpay.",
    images: ["/robot.jpg"],
    creator: "@nilexrana",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://optisense.nileshrana.me",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  // Helpful robots hints; advanced crawler directives can be added in public/robots.txt
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://optisense.nileshrana.me/#organization",
        "name": "OptiSense AI",
        "url": "https://optisense.nileshrana.me",
        "logo": "https://optisense.nileshrana.me/robot.jpg",
        "sameAs": [
          "https://nileshrana.me",
          "https://github.com/nileXrana",
          "https://linkedin.com/in/nilexrana"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "imp.communicate@gmail.com",
            "url": "https://optisense.nileshrana.me/contact"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://optisense.nileshrana.me/#website",
        "url": "https://optisense.nileshrana.me",
        "name": "OptiSense AI",
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://optisense.nileshrana.me/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://optisense.nileshrana.me/#app",
        "name": "OptiSense AI",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "url": "https://optisense.nileshrana.me",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
      }
    ]
  };
  return (
    <ClerkProvider>
      <UserProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          {/* Structured data for rich results */}
          <Script id="structured-data" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
          {/* PhonePe Checkout Script */}
          <Script 
            src="https://mercury.phonepe.com/web/bundle/checkout.js"
            strategy="beforeInteractive"
          />
      
      </body>
    </html>
    </UserProvider>
    </ClerkProvider>
  );
}
