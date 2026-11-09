'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import type { Command } from '@/data/commands';
import { OPEN_PALETTE, noSubscribe, platformMod } from '@/lib/palette';

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Every word typed must appear somewhere in the command; label matches rank first.
function search(commands: Command[], query: string) {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return commands;
  return commands
    .map(c => {
      const label = fold(c.label);
      const haystack = `${label} ${fold(c.group)} ${fold(c.hint ?? '')} ${fold(c.keywords ?? '')}`;
      if (!words.every(w => haystack.includes(w))) return null;
      const score = words.reduce((s, w) => s + (label.startsWith(w) ? 3 : label.includes(w) ? 2 : 0), 0);
      return { c, score };
    })
    .filter((r): r is { c: Command; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map(r => r.c);
}

const isTyping = (el: Element | null) =>
  !!el && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el as HTMLElement).isContentEditable);

export default function CommandPalette({ commands }: { commands: Command[] }) {
  const router = useRouter();
  const pathname = usePathname();
  // The path the palette was opened on; navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const mod = useSyncExternalStore(noSubscribe, platformMod, () => '⌘');

  const results = useMemo(() => search(commands, query), [commands, query]);
  // With a query the list is ranked; without one it keeps its groups.
  const grouped = !query.trim();

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    setCopied(null);
    setOpenOn(pathname);
  }, [pathname]);

  const hide = useCallback(() => {
    setOpenOn(null);
    returnFocus.current?.focus?.();
  }, []);

  // ⌘K / Ctrl+K anywhere, "/" when not typing, or the event from the navbar button.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) hide(); else show();
      } else if (e.key === '/' && !open && !isTyping(document.activeElement)) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE, show);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = async (c: Command) => {
    if (c.copy) {
      try {
        await navigator.clipboard.writeText(c.copy);
        setCopied(c.id);
        setTimeout(hide, 700);
      } catch {
        window.location.href = `mailto:${c.copy}`;
      }
      return;
    }
    if (!c.href) return;
    if (c.download) {
      const a = Object.assign(document.createElement('a'), { href: c.href, download: '' });
      a.click();
      hide();
    } else if (c.external) {
      window.open(c.href, '_blank', 'noopener,noreferrer');
      hide();
    } else {
      setOpenOn(null);
      router.push(c.href);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) run(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hide();
    } else if (e.key === 'Tab') {
      // The input is the only stop; keep focus inside the dialog.
      e.preventDefault();
    }
  };

  if (!open) return null;

  return (
    <div className="palette-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) hide(); }}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="palette-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
            aria-autocomplete="list"
            placeholder="Jump to a project, page or action…"
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd>esc</kbd>
        </div>

        <ul className="palette-list" id={listId} role="listbox" ref={listRef} aria-label="Commands">
          {results.map((c, i) => (
            <Fragment key={c.id}>
              {grouped && (i === 0 || results[i - 1].group !== c.group) && (
                <li className="palette-group" role="presentation">{c.group}</li>
              )}
              <li
                id={`${listId}-${c.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
              >
                <span className="palette-label">{copied === c.id ? 'Copied to clipboard' : c.label}</span>
                {c.hint && <span className="palette-hint">{c.hint}</span>}
                {c.external && <span className="palette-hint" aria-label="opens in a new tab">↗</span>}
              </li>
            </Fragment>
          ))}
          {!results.length && <li className="palette-empty" role="presentation">No matches for “{query}”.</li>}
        </ul>

        <p className="palette-foot" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>/</kbd> or <kbd>{mod}K</kbd> anywhere</span>
        </p>
      </div>
    </div>
  );
}
