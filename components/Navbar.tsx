'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import Logo from './Logo';
import type { NavItem } from '@/data/site';

// In-page anchors stay plain <a> so the smooth-scroll handler owns them;
// everything else goes through the Next.js router.
function NavLink(props: { href: string; className?: string; children: ReactNode; onClick?: () => void; 'data-text'?: string }) {
  const { href, ...rest } = props;
  return href.startsWith('#') ? <a href={href} {...rest} /> : <Link href={href} {...rest} />;
}

type Props = {
  items: NavItem[];
  ctaHref: string;
  // When set, the logo links there (e.g. back to home).
  logoHref?: string;
};

export default function Navbar({ items, ctaHref, logoHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link whose section is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);
  const logo = <Logo size={34} />;

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : undefined}>
        {logoHref ? (
          <Link href={logoHref} className="nav-logo" aria-label="Fernando Mendez — Home">{logo}</Link>
        ) : (
          <div className="nav-logo">{logo}</div>
        )}
        <ul className="nav-links">
          {items.map(item => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                data-text={item.label}
                className={active === item.href ? 'active' : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink href={ctaHref} className="nav-cta">Hire Me</NavLink>
        <button
          className={'nav-hamburger' + (open ? ' open' : '')}
          id="hamburger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div id="mobile-menu" className={open ? 'open' : undefined}>
        <ul>
          {items.map(item => (
            <li key={item.href}>
              <NavLink href={item.href} onClick={close}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
