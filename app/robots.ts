import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/callback', '/buy'],
      },
    ],
    sitemap: 'https://investigationflow.com/sitemap.xml',
  }
}
