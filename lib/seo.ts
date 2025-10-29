/**
 * SEO utilities for OptiSense AI
 * Use these helpers to generate dynamic meta tags and structured data for your routes.
 */

export interface PageSEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  keywords?: string[];
  canonical?: string;
}

/**
 * Generate page-level metadata object (compatible with Next.js 13+ Metadata API).
 * Extend or override the root layout metadata on a per-page basis.
 */
export function generatePageMetadata({
  title = "OptiSense AI — Personal & Business AI Assistants",
  description = "OptiSense AI provides 50+ specialized AI assistants for coding, writing, finance, productivity and more. Fast, affordable, and tailored to professionals and teams.",
  ogImage = "https://optisense.nileshrana.me/robot.jpg",
  keywords = [],
  canonical = "https://optisense.nileshrana.me",
}: PageSEOProps) {
  return {
    title,
    description,
    keywords: [
      "OptiSense",
      "OptiSense AI",
      "AI assistants",
      "AI tools",
      "personal AI",
      "AI SaaS",
      "Google Gemini",
      "Razorpay",
      "Next.js",
      "productivity AI",
      "AI for developers",
      "content AI",
      ...keywords,
    ],
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical,
    },
  };
}

/**
 * Generate JSON-LD structured data for a Product or Service page.
 * Use this function in your page component to inject <script type="application/ld+json">
 */
export function generateProductSchema({
  name = "OptiSense AI",
  description = "50+ specialized AI assistants for coding, writing, finance, productivity and more",
  url = "https://optisense.nileshrana.me",
  price = "0",
  priceCurrency = "INR",
  image = "https://optisense.nileshrana.me/robot.jpg",
}: {
  name?: string;
  description?: string;
  url?: string;
  price?: string;
  priceCurrency?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: "OptiSense AI",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency,
      price,
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Generate JSON-LD for FAQs. Pass an array of { question, answer } objects.
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD for BreadcrumbList.
 * Pass an array of { name, url } objects.
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD for Organization.
 * Already included in app/layout.tsx; this is a helper if you want to inject on specific pages.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OptiSense AI",
    url: "https://optisense.nileshrana.me",
    logo: "https://optisense.nileshrana.me/robot.jpg",
    sameAs: [
      "https://nileshrana.me",
      "https://github.com/nileXrana",
      "https://linkedin.com/in/nilexrana",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "imp.communicate@gmail.com",
        url: "https://optisense.nileshrana.me/contact",
      },
    ],
  };
}
