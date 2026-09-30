'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { initPageEffects } from '@/lib/pageEffects';

// Wraps every page and (re)applies the scroll effects on each route change.
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => initPageEffects(), [pathname]);

  return <>{children}</>;
}
