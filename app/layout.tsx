import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Caveat, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import SiteShell from '@/components/SiteShell';
import { OG_IMAGE, SITE_NAME, SITE_TITLE, SITE_URL } from '@/data/site';
import './globals.css';

// Self-hosted at build time: no request to Google, no render-blocking
// stylesheet, and size-adjusted fallbacks so text does not jump on load.
const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--ff-display' });
const sans = Instrument_Sans({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--ff-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--ff-mono' });
const hand = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--ff-hand' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  icons: {
    icon: { url: '/assets/favicon.svg', type: 'image/svg+xml' },
    apple: { url: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, type: 'image/png', alt: SITE_TITLE }],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  themeColor: '#F2F3EF',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
