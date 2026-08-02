import Link from 'next/link';
import { identity, navSections } from '@/content/profile';
import { asset } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Section';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-medium text-ink">{identity.name}</p>
            <p className="mt-1 text-sm text-ink-3">{identity.title}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-3">
              <Icon name="pin" size={14} />
              {identity.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            <p className="kicker mb-1">Sections</p>
            {navSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-ink-3 transition-colors hover:text-ink">
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <p className="kicker mb-1">Elsewhere</p>
            <a
              href={identity.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="linkedin" size={14} /> LinkedIn
            </a>
            <a
              href={identity.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="github" size={14} /> GitHub
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="mail" size={14} /> Email
            </a>
            <a
              href={asset(identity.resume)}
              download=""
              className="flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="download" size={14} /> Resume
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {identity.name}. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <p className="flex items-center gap-1.5">
            Press
            <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.625rem]">
              ⌘K
            </kbd>
            to search
          </p>
        </div>
      </Container>
    </footer>
  );
}
