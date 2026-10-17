import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import DottedSurface from '@/components/DottedSurface';

export const metadata = {
  title: 'AVINOX | Premium Custom Stainless Steel Solutions',
  description:
    'AVINOX designs and manufactures bespoke, luxury stainless steel products (AISI 201/304) for commercial kitchens, cafes, luxury hotels, and high-end restaurants. Discover exceptional craftsmanship.',
  icons: {
    icon: '/imgs/tab_logo.png',
  },
  openGraph: {
    title: 'Avinox',
    description: 'Премиум решения из нержавеющей стали для коммерческих кухонь',
    url: 'https://avinox-roan.vercel.app/',
    siteName: 'AVINOX',
    images: [
      {
        url: 'https://avinox-roan.vercel.app/imgs/logo.png',
        width: 500,
        height: 500,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
