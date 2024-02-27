import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { InstallPwaProvider } from '@/features/shared/ui/pwa/InstallPwaProvider';

export const viewport: Viewport = {
  colorScheme: 'only light',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFFFFF',
  width: 'device-width',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://opentask.app'),
  title: 'OpenTask',
  description: 'Free and Open Source Task Manager.',
  applicationName: 'OpenTask',
  manifest: 'https://opentask.app/manifest.json',
  authors: [{ name: 'Flavio Silva', url: 'https://flsilva.com' }],
  creator: 'Flavio Silva',
  publisher: 'https://flsilva.com',
  formatDetection: { telephone: false },
  alternates: { canonical: 'https://opentask.app' },
  generator: 'Next.js',
  keywords: [
    'open',
    'task',
    'manager',
    'free',
    'open-source',
    'react',
    'next',
    'app-router',
    'tailwindcss',
    'supabase',
    'prisma',
  ],
  openGraph: {
    type: 'website',
    title: 'OpenTask',
    description: 'Free and Open Source Task Manager.',
    siteName: 'OpenTask',
    url: 'https://opentask.app',
    images: [{ url: 'https://opentask.app/tweet-card.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://opentask.app',
    title: 'OpenTask',
    description: 'Free and Open Source Task Manager.',
    images: [{ url: 'https://opentask.app/tweet-card.png' }],
    creator: '@flsilva7',
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ rel: 'apple-touch-icon', sizes: '180x180', url: '/pwa-images/apple-icon-180.png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'OpenTask',
    statusBarStyle: 'default',
    startupImage: [
      {
        url: '/pwa-images/apple-splash-2048-2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1668-2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1536-2048.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1668-2224.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1620-2160.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1290-2796.jpg',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1179-2556.jpg',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1284-2778.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1170-2532.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1125-2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1242-2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-828-1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-1242-2208.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-750-1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/pwa-images/apple-splash-640-1136.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} flex flex-col h-full`}>
        <InstallPwaProvider>{children}</InstallPwaProvider>
        <GoogleTagManager gtmId="GTM-MGWRXKWC" />
      </body>
    </html>
  );
}
