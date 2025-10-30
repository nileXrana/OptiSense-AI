import { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt route for Next.js 13+.
 * This will be served at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://optisense.nileshrana.me'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow private or staging routes if needed:
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
