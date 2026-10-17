import ProductDetailPageClient from '@/components/product/ProductDetailPageClient';
import allProducts from '@/lib/products-data.json';
import { BASE_URL } from '@/lib/config';

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found | AVINOX',
    };
  }

  const imageUrl = `${BASE_URL}${product.image.replace(/\\/g, '/')}`;

  return {
    title: `${product.title} | AVINOX`,
    description: product.description,
    openGraph: {
      title: `${product.title} | AVINOX`,
      description: product.description,
      url: `${BASE_URL}product/${product.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return <ProductDetailPageClient id={id} />;
}
