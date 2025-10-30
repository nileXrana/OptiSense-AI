import { MetadataRoute } from 'next'

/**
 * Dynamic sitemap route for Next.js 13+.
 * This will be served at /sitemap.xml and auto-generates the sitemap.
 * Add more URLs as your site grows. For dynamic assistant pages, fetch from DB.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://optisense.nileshrana.me'
  const currentDate = new Date()
  
  // Static routes with proper priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-assistants`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/assistants`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // You can dynamically fetch assistant pages from your DB:
  // const assistants = await prisma.userAiAssistants.findMany({ select: { id: true } })
  // const assistantPages: MetadataRoute.Sitemap = assistants.map(a => ({
  //   url: `${baseUrl}/assistant/${a.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }))
  // return [...staticRoutes, ...assistantPages]
  
  return staticRoutes
}
