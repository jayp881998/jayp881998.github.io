'use client';

import { useState } from 'react';
import { identity } from '@/content/profile';
import { asset } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

/**
 * Web3Forms access key.
 *
 * The site is a static export, so there is no server to post to — Web3Forms
 * accepts a direct client-side POST instead. The key is public by design
 * (Web3Forms scopes abuse by key + origin, not by secrecy); get one free,
 * no-login, at https://web3forms.com and set
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local (and in your host's env
 * settings). With it unset the form still works — it composes a pre-filled
 * mailto: instead, which never silently drops a message.
 */
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields, humans don't.
    if (data.get('company')) return;

    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  function copyEmail() {
    navigator.clipboard?.writeText(identity.email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {
        window.location.href = `mailto:${identity.email}`;
      },
    );
  }

  return (
    <Section id="contact" kicker="Contact" title="Let’s talk about the role.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-base leading-relaxed text-ink-2">{identity.availability}</p>

          <div className="mt-8 space-y-2.5">
            <button
              type="button"
              onClick={copyEmail}
              className="card group flex w-full items-center gap-3.5 p-4 text-left transition-colors duration-300 hover:border-accent-line"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent">
                <Icon name={copied ? 'check' : 'mail'} size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] uppercase tracking-wider text-ink-kicker">
                  Email
                </span>
                <span className="block truncate text-sm text-ink">{identity.email}</span>
              </span>
              <span className="shrink-0 font-mono text-[0.625rem] text-ink-3">
                {copied ? 'copied' : 'copy'}
              </span>
            </button>

            <a
              href={identity.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-3.5 p-4 transition-colors duration-300 hover:border-accent-line"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent">
                <Icon name="linkedin" size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] uppercase tracking-wider text-ink-kicker">
                  LinkedIn
                </span>
                <span className="block truncate text-sm text-ink">in/jaypanchal0808</span>
              </span>
              <Icon name="external" size={14} className="shrink-0 text-ink-3" />
            </a>

            <a
              href={identity.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-3.5 p-4 transition-colors duration-300 hover:border-accent-line"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent">
                <Icon name="github" size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] uppercase tracking-wider text-ink-kicker">
                  GitHub
                </span>
                <span className="block truncate text-sm text-ink">jayp881998</span>
              </span>
              <Icon name="external" size={14} className="shrink-0 text-ink-3" />
            </a>

            <a
              href={asset(identity.resume)}
              download=""
              className="card group flex items-center gap-3.5 p-4 transition-colors duration-300 hover:border-accent-line"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent">
                <Icon name="download" size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] uppercase tracking-wider text-ink-kicker">
                  Resume
                </span>
                <span className="block truncate text-sm text-ink">Download PDF</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="card p-6 sm:p-7">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

            {/* Honeypot — visually hidden, not display:none, so bots still fill it. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" required autoComplete="name" />
              <Field id="email" label="Email" type="email" required autoComplete="email" />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="The role, the team, and what you need built."
                className="w-full resize-y rounded-lg border border-line bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent-line"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 inline-flex h-control w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              {status !== 'sending' && <Icon name="arrowRight" size={15} />}
            </button>

            <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs">
              {status === 'sent' && (
                <span className="text-aqua">Thanks — I’ll get back to you shortly.</span>
              )}
              {status === 'error' && (
                <span className="text-ink-2">
                  That didn’t send. Email me directly at{' '}
                  <a href={`mailto:${identity.email}`} className="text-accent underline">
                    {identity.email}
                  </a>
                  .
                </span>
              )}
              {status === 'idle' && !WEB3FORMS_ACCESS_KEY && (
                <span className="text-ink-3">Opens in your email client.</span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.8125rem] font-medium text-ink-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-control w-full rounded-lg border border-line bg-surface-2/60 px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent-line"
      />
    </div>
  );
}
