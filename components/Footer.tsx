import Link from 'next/link';
import CurrentYear from './CurrentYear';
import Logo from './Logo';

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
            Written and built in Venezuela · <CurrentYear />
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
