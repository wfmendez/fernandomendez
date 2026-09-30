import type { Metadata } from 'next';
import Link from 'next/link';
import './not-found.css';

export const metadata: Metadata = {
  title: '404 — Page Not Found · Fernando Mendez',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="nf-page">
      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <h1>This page isn’t in the notebook.</h1>
        <p>The link you followed doesn&apos;t exist or was moved. Let&apos;s get you back to solid ground.</p>
        <Link className="nf-home" href="/">
          Back to home
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
