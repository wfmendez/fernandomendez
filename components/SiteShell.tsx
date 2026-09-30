'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import Cursor from './Cursor';
import Logo from './Logo';
import { initPageEffects } from '@/lib/pageEffects';
import { prefersReducedMotion } from '@/lib/motion';

// Wraps every page: shows the preloader on first load, renders the custom
// cursor, and (re)applies the scroll/hover effects on each route change.
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const finish = () => {
      document.body.classList.remove('loading');
      setReady(true);
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    let value = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      value = Math.min(100, value + Math.random() * 18);
      setProgress(value);
      if (value === 100) {
        clearInterval(interval);
        doneTimer = setTimeout(finish, 400);
      }
    }, 80);

    return () => {
      clearInterval(interval);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    return initPageEffects();
  }, [ready, pathname]);

  return (
    <>
      <div id="preloader" className={ready ? 'done' : undefined}>
        <div className="preloader-inner">
          <Logo className="preloader-logo" fontSize={16} gradientId="grad" />
          <div className="preloader-bar">
            <div className="preloader-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <Cursor />
      {children}
    </>
  );
}
