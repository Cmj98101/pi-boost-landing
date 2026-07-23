import { MetadataRoute } from 'next'
import { TUTORIALS } from '@/lib/tutorials'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url

  const tutorialEntries: MetadataRoute.Sitemap = TUTORIALS.map((tutorial) => ({
    url: `${baseUrl}/learn/${tutorial.slug}`,
    lastModified: new Date(tutorial.publishDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...tutorialEntries,
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/investigation-video-editor-alternative`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/v3-video-editor-alternative`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/imovie-alternative`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wondershare-alternative`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
