import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GaNextScriptNavigation } from './shared/ga';

export const metadata: Metadata = {
  title: 'OpenTask.app',
  description: 'Free and Open Source Task Manager.',
  applicationName: 'OpenTask.app',
  appleWebApp: { capable: true, title: 'OpenTask.app', statusBarStyle: 'default' },
  manifest: 'https://opentask.app/manifest.json',
  authors: [{ name: 'Flavio Silva', url: 'https://flsilva.com' }],
  creator: 'Flavio Silva',
  publisher: 'https://flsilva.com',
  formatDetection: { telephone: false },
  themeColor: '#FFFFFF',
  colorScheme: 'only light',
  alternates: { canonical: 'https://opentask.app' },
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
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
    title: 'OpenTask.app',
    description: 'Free and Open Source Task Manager.',
    siteName: 'OpenTask.app',
    url: 'https://opentask.app',
    images: [{ url: 'https://opentask.app/logo-text-512x512.png' }],
  },
  twitter: {
    card: 'summary',
    site: 'https://opentask.app',
    title: 'OpenTask.app',
    description: 'Free and Open Source Task Manager.',
    images: [{ url: 'https://opentask.app/logo-text-512x512.png' }],
    creator: '@flsilva7',
  },
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '196x196', url: '/pwa-images/favicon-196.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/pwa-images/apple-icon-180.png' },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-2048-2732.jpg',
      media:
        '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1668-2388.jpg',
      media:
        '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1536-2048.jpg',
      media:
        '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1668-2224.jpg',
      media:
        '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1620-2160.jpg',
      media:
        '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1290-2796.jpg',
      media:
        '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1179-2556.jpg',
      media:
        '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1284-2778.jpg',
      media:
        '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1170-2532.jpg',
      media:
        '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1125-2436.jpg',
      media:
        '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1242-2688.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-828-1792.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-1242-2208.jpg',
      media:
        '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-750-1334.jpg',
      media:
        '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/pwa-images/apple-splash-640-1136.jpg',
      media:
        '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
  ],
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        {children}
        <GaNextScriptNavigation gaId="G-C6TYTB01NE" />
      </body>
    </html>
  );
}
