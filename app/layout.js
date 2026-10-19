import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import DottedSurface from '@/components/DottedSurface';

export const metadata = {
  title: 'AVINOX | Premium Custom Stainless Steel Solutions',
  description:
    'AVINOX designs and manufactures bespoke, luxury stainless steel products (AISI 201/304) for commercial kitchens, cafes, luxury hotels, and high-end restaurants. Discover exceptional craftsmanship.',
  icons: {
    icon: '/imgs/tab_logo.png',
    shortcut: '/imgs/tab_logo.png',
    apple: '/imgs/tab_logo.png',
  },
  openGraph: {
    title: 'Avinox',
    description: 'Премиум решения из нержавеющей стали для коммерческих кухонь',
    url: 'https://avinox.uz/',
    siteName: 'AVINOX',
    type: 'website',
    images: [
      {
        url: 'https://avinox.uz/imgs/logo.png',
        width: 1200,
        height: 630,
        alt: 'AVINOX Logo',
      },
    ],
    videos: [
      {
        url: 'https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4',
        secureUrl: 'https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4',
        type: 'video/mp4',
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: 'player',
    title: 'Avinox',
    description: 'Премиум решения из нержавеющей стали для коммерческих кухонь',
    images: ['https://avinox.uz/imgs/logo.png'],
    players: [
      {
        playerUrl: 'https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4',
        streamUrl: 'https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4',
        width: 1920,
        height: 1080,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/imgs/tab_logo.png" type="image/png" />
        <meta property="og:video" content="https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4" />
        <meta property="og:video:secure_url" content="https://avinox.uz/videos/Avinox_logo_animation_revealing_1080p_20261019101451.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1920" />
        <meta property="og:video:height" content="1080" />
        <meta property="og:image" content="https://avinox.uz/imgs/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <DottedSurface />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
