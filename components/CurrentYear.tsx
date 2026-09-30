'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

// Rendered on the client so a statically built page never shows a stale year.
export default function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span id="current-year">{year}</span>;
}
