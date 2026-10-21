import { Suspense } from 'react';
import ProductDetailPageClient from '@/components/product/ProductDetailPageClient';
import allProducts from '@/lib/products-data.json';

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
      title: 'Product Not Found',
    };
  }

  const rawImage = product.image || product.poster || '';
  const cleanImg = rawImage.replace(/^\/+/, '').replace(/\\/g, '/');
  const imageUrl = `https://avinox.uz/${cleanImg}`;
  const productUrl = `https://avinox.uz/product/${product.id}`;

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.title} | AVINOX`,
      description: product.description,
      url: productUrl,
      siteName: 'AVINOX',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      videos: [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | AVINOX`,
      description: product.description,
      images: [imageUrl],
      players: [],
    },
  };
}

async function ProductDetailContent({ params }) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  const cleanImg = product
    ? (product.image || product.poster || '').replace(/^\/+/, '').replace(/\\/g, '/')
    : '';
  const imageUrl = `https://avinox.uz/${cleanImg}`;
  const productUrl = product ? `https://avinox.uz/product/${product.id}` : '';

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: imageUrl,
        description: product.description,
        sku: product.id,
        brand: {
          '@type': 'Brand',
          name: 'AVINOX',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'UZS',
          availability: 'https://schema.org/InStock',
          url: productUrl,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailPageClient id={id} />
    </>
  );
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense fallback={null}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
