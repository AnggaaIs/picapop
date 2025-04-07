import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/templates/', '/privacy-policy'],
        disallow: ['/api/', '/getstarted/', '/photosession/'],
      },
    ],
    sitemap: 'https://picapop.my.id/sitemap.xml',
  }
}