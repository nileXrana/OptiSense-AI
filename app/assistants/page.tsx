import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "50+ AI Assistants — OptiSense AI",
  description:
    "Browse 50+ specialized AI assistants for coding, content creation, finance, fitness, travel, and more. Build your own custom assistant or select from pre-built ones.",
  keywords: [
    "AI assistants",
    "code writer",
    "bug finder",
    "email writer",
    "finance assistant",
    "fitness coach",
    "custom AI",
  ],
  canonical: "https://optisense.nileshrana.me/assistants",
  ogImage: "https://optisense.nileshrana.me/robot.jpg",
});

export default function AssistantsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        50+ Pre-built AI Assistants
      </h1>
      <p className="text-muted-foreground mb-6">
        Select from our library of purpose-built assistants or create your own
        custom assistant tailored to your needs.
      </p>
      {/* Your UI goes here. This is just a demo server component page. */}
      <p className="text-sm text-muted-foreground">
        This is a server-component example page demonstrating page-level SEO
        metadata. Replace this content with your actual assistant list UI or
        redirect to /ai-assistants.
      </p>
    </div>
  );
}
