'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { SendIcon } from './icons';
import { EMAIL, WEB3FORMS_ACCESS_KEY } from '@/data/site';

const DRAFT_KEY = 'portfolio_contact_draft';

type Fields = { name: string; email: string; subject: string; message: string };
const EMPTY: Fields = { name: '', email: '', subject: '', message: '' };
type Status = { text: string; type?: 'ok' | 'error' };

function saveDraft(fields: Fields | null) {
  try {
    if (fields) localStorage.setItem(DRAFT_KEY, JSON.stringify(fields));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>({ text: '' });
  const [buttonLabel, setButtonLabel] = useState('Send Message');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Restore an unsent draft.
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setFields(f => ({ ...f, ...draft }));
    } catch {
      // Ignore a corrupt or unreadable draft.
    }
    return () => clearTimeout(resetTimer.current);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.id as keyof Fields;
    const next = { ...fields, [key]: e.target.value };
    setFields(next);
    saveDraft(next);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // No Web3Forms key configured → open the visitor's email app so the form
    // is never a dead end.
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = fields.subject || 'Portfolio contact';
      const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ text: 'Opening your email app…', type: 'ok' });
      saveDraft(null);
      return;
    }

    setButtonLabel('Sending…');
    setBusy(true);
    setStatus({ text: '' });

    try {
      const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Submission failed');
      setButtonLabel('Sent! ✓');
      setSent(true);
      setStatus({ text: "Thanks! I'll get back to you within 24 hours.", type: 'ok' });
      setFields(EMPTY);
      saveDraft(null);
    } catch {
      setButtonLabel('Send Message');
      setStatus({ text: `Something went wrong — please email me directly at ${EMAIL}`, type: 'error' });
    } finally {
      resetTimer.current = setTimeout(() => {
        setButtonLabel('Send Message');
        setSent(false);
        setBusy(false);
      }, 4000);
    }
  };

  return (
    <form className="contact-form reveal-up" id="contact-form" onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New message from your portfolio" />
      <input type="hidden" name="from_name" value="Portfolio Contact" />
      {/* Honeypot anti-spam: bots fill this, humans never see it */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

      <div className="form-group">
        <input type="text" id="name" name="name" placeholder=" " required autoComplete="name" value={fields.name} onChange={onChange} />
        <label htmlFor="name">Your Name</label>
        <div className="form-line"></div>
      </div>
      <div className="form-group">
        <input type="email" id="email" name="email" placeholder=" " required autoComplete="email" value={fields.email} onChange={onChange} />
        <label htmlFor="email">Email Address</label>
        <div className="form-line"></div>
      </div>
      <div className="form-group">
        <input type="text" id="subject" name="user_subject" placeholder=" " autoComplete="off" value={fields.subject} onChange={onChange} />
        <label htmlFor="subject">Subject</label>
        <div className="form-line"></div>
      </div>
      <div className="form-group">
        <textarea id="message" name="message" placeholder=" " rows={4} required value={fields.message} onChange={onChange}></textarea>
        <label htmlFor="message">Message</label>
        <div className="form-line"></div>
      </div>
      <button
        type="submit"
        className="btn btn-primary form-submit"
        disabled={busy}
        style={sent ? { background: 'var(--moss)' } : undefined}
      >
        <span>{buttonLabel}</span>
        <SendIcon />
      </button>
      <p className={'form-status' + (status.type ? ' ' + status.type : '')} id="form-status" role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}
