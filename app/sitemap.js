import productsData from '../public/products-data.json';

export default function sitemap() {
  const baseUrl = 'https://avinox.uz';

  // products-data.json ichidagi barcha mahsulotlarni avtomatik sitemap'ga qo'shish
  const products = Array.isArray(productsData) ? productsData : (productsData.products || []);
  
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ];
}