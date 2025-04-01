import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://picapop.my.id',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://picapop.my.id/templates',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }
  ]
}