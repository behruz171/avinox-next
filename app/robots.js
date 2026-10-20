export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // API yo'llarini Google'dan yashiramiz
    },
    sitemap: 'https://avinox.uz/sitemap.xml',
  }
}