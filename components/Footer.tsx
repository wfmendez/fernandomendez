import Link from 'next/link';
import CurrentYear from './CurrentYear';
import Logo from './Logo';
import { GITHUB_URL } from '@/data/site';

const REPO_URL = `${GITHUB_URL}/fernandomendez`;
const sha = process.env.BUILD_SHA ?? '';
const built = process.env.BUILD_DATE
  ? new Date(process.env.BUILD_DATE).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  : '';

type Props = {
  // When set, the brand links there (e.g. back to home).
  brandHref?: string;
  // In-page anchor for the "Back to top" link; omitted hides the link.
  topHref?: string;
};

export default function Footer({ brandHref, topHref }: Props) {
  const brand = (
    <>
      <Logo size={30} />
      <span>Fernando Mendez</span>
    </>
  );

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-inner">
          {brandHref ? (
            <Link href={brandHref} className="footer-brand">{brand}</Link>
          ) : (
            <div className="footer-brand">{brand}</div>
          )}
          <p className="footer-copy">
            Written and built between Venezuela and Czechia · <CurrentYear />
          </p>
          <p className="footer-build">
            {sha && (
              <>
                Built from{' '}
                <a href={`${REPO_URL}/commit/${sha}`} target="_blank" rel="noopener noreferrer">
                  {process.env.BUILD_REF}@{sha.slice(0, 7)}
                </a>
                {built && <> on {built}</>} ·{' '}
              </>
            )}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">Source</a> · Next.js, no trackers
          </p>
          {topHref && (
            <div className="footer-links">
              <a href={topHref}>Back to top ↑</a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
