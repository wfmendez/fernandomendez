import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import SiteShell from '@/components/SiteShell';
import { OG_IMAGE, SITE_NAME, SITE_TITLE, SITE_URL } from '@/data/site';
import './globals.css';

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
    apple: '/assets/favicon.svg',
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Display, text, log metadata and handwritten notes. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
