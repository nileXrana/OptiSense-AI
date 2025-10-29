import { MetadataRoute } from 'next'

/**
 * Dynamic sitemap route for Next.js 13+.
 * This will be served at /sitemap.xml and auto-generates the sitemap.
 * Add more URLs as your site grows. For dynamic assistant pages, fetch from DB.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://optisense.nileshrana.me'
  
  // Static routes
  const routes = [
    '',
    '/signin',
    '/ai-assistants',
    '/dashboard',
    '/assistants',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // You can dynamically fetch assistant pages from your DB:
  // const assistants = await prisma.userAiAssistants.findMany({ select: { id: true } })
  // const assistantPages = assistants.map(a => ({ url: `${baseUrl}/assistant/${a.id}`, ... }))
  
  return routes
}
