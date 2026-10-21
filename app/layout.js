import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import DottedSurface from '@/components/DottedSurface';

export const metadata = {
  metadataBase: new URL('https://avinox.uz'),
  title: {
    default: 'AVINOX | Premium Custom Stainless Steel Solutions',
    template: '%s | AVINOX',
  },
  description:
    'AVINOX designs and manufactures bespoke, luxury stainless steel products (AISI 201/304) for commercial kitchens, cafes, luxury hotels, and high-end restaurants in Uzbekistan. Discover exceptional craftsmanship.',
  keywords: [
    'avinox',
    'avinox uz',
    'stainless steel',
    'nerjaveyka',
    'nerjaveyka toshkent',
    "zanglamaydigan po'lat",
    "zanglamas po'lat",
    'nerjaveykalik stollar',
    'nerjaveyka moyka',
    'oshxona jihozlari',
    'restoran jihozlari',
    'kafe jihozlari',
    'neytral jihozlar',
    'нейтральное оборудование',
    'мебель из нержавеющей стали',
    'кухонное оборудование для ресторанов',
    'производственные столы из нержавейки',
    'моечные ванны нержавейка',
    'вытяжные зонты',
    'стеллажи из нержавеющей стали',
    'AISI 304',
    'AISI 201',
    'commercial kitchen equipment uzbekistan',
    'custom stainless steel fabrication',
  ],
  authors: [{ name: 'AVINOX', url: 'https://avinox.uz' }],
  creator: 'AVINOX',
  publisher: 'AVINOX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://avinox.uz',
    languages: {
      'uz-UZ': 'https://avinox.uz',
      'ru-RU': 'https://avinox.uz',
      'en-US': 'https://avinox.uz',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/imgs/tab_logo.png', type: 'image/png', sizes: '192x192' },
      { url: '/imgs/tab_logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/imgs/tab_logo.png',
    apple: '/imgs/tab_logo.png',
  },
  openGraph: {
    title: 'AVINOX | Premium Custom Stainless Steel Solutions',
    description:
      'Премиум решения и нейтральное оборудование из нержавеющей стали (AISI 304/201) для коммерческих кухонь, ресторанов и отелей в Узбекистане.',
    url: 'https://avinox.uz/',
    siteName: 'AVINOX',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ', 'en_US'],
    type: 'website',
    images: [
      {
        url: 'https://avinox.uz/imgs/logo.png',
        width: 1200,
        height: 630,
        alt: 'AVINOX Stainless Steel Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVINOX | Premium Custom Stainless Steel Solutions',
    description:
      'Премиум решения из нержавеющей стали (AISI 304/201) для коммерческих кухонь и ресторанов.',
    images: ['https://avinox.uz/imgs/logo.png'],
  },
  verification: {
    google: 'ImopMXniS92EJ4l6tkj6GkItaOOjDz--zQk3Btkm1J4',
    yandex: 'd827686e4183d59e',
  },
  category: 'commercial equipment',
};

// Google Schema.org Structured Data (JSON-LD)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://avinox.uz/#organization',
      name: 'AVINOX',
      url: 'https://avinox.uz',
      logo: 'https://avinox.uz/imgs/logo.png',
      image: 'https://avinox.uz/imgs/logo.png',
      description:
        'Bespoke luxury stainless steel products (AISI 201/304) for commercial kitchens, cafes, luxury hotels, and restaurants.',
      telephone: ['+998-97-335-33-33', '+998-97-959-00-07'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'махаллинский сход граждан Гани Аъзамов',
        addressLocality: 'Ташкент',
        addressRegion: 'Алмазарский район',
        addressCountry: 'UZ',
      },
      sameAs: [
        'https://www.instagram.com/avinox.uz/',
        'https://t.me/avinox2025',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://avinox.uz/#website',
      url: 'https://avinox.uz',
      name: 'AVINOX',
      publisher: {
        '@id': 'https://avinox.uz/#organization',
      },
      inLanguage: ['uz', 'ru', 'en'],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="geo.region" content="UZ-TO" />
        <meta name="geo.placename" content="Tashkent" />
        <meta name="theme-color" content="#0D0D0D" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <DottedSurface />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
