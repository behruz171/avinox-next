import HomeClient from '@/components/home/HomeClient';

export const metadata = {
  openGraph: {
    title: 'AVINOX | Premium Custom Stainless Steel Solutions',
    description:
      'Премиум решения и нейтральное оборудование из нержавеющей стали (AISI 304/201) для коммерческих кухонь, ресторанов и отелей в Узбекистане.',
    url: 'https://avinox.uz/',
    siteName: 'AVINOX',
    images: [
      {
        url: 'https://avinox.uz/imgs/logo.png',
        width: 1200,
        height: 630,
        alt: 'AVINOX Stainless Steel Equipment',
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
    title: 'AVINOX | Premium Custom Stainless Steel Solutions',
    description:
      'Премиум решения из нержавеющей стали (AISI 304/201) для коммерческих кухонь и ресторанов.',
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

export default function HomePage() {
  return <HomeClient />;
}
