import { ImageResponse } from 'next/og';
import { identity, metrics } from '@/content/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${identity.name} — ${identity.title}`;

// Required by `output: 'export'` — renders the PNG once at build time
// instead of on demand at request time.
export const dynamic = 'force-static';

/**
 * The link preview that appears when this URL is pasted into LinkedIn, Slack,
 * or an email. Rendered to a PNG once at build time (static export friendly).
 *
 * It carries the headline and two proof numbers, so the card itself does some
 * of the selling before anyone clicks.
 */
export default function OpenGraphImage() {
  const [first, second] = metrics;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08090b',
          backgroundImage:
            'radial-gradient(1000px circle at 10% -10%, rgba(124,143,255,0.24), transparent 55%), radial-gradient(800px circle at 95% 110%, rgba(144,133,233,0.20), transparent 55%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 10,
              border: '1px solid rgba(124,143,255,0.45)',
              background: 'rgba(124,143,255,0.14)',
              color: '#9aa8ff',
              fontSize: 19,
              fontWeight: 600,
            }}
          >
            JP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#f2f4f7', fontSize: 26, fontWeight: 600 }}>{identity.name}</div>
            <div style={{ color: '#a4acb8', fontSize: 18 }}>{identity.title}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            color: '#f2f4f7',
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: -1.6,
            maxWidth: 960,
          }}
        >
          I build the SQL-to-Power BI reporting that operations and inventory teams run on.
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 56 }}>
            {[first, second].filter(Boolean).map((m) => (
              <div key={m!.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: '#f2f4f7', fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
                  {m!.value}
                </div>
                <div style={{ color: '#6d7581', fontSize: 17, maxWidth: 260 }}>{m!.label}</div>
              </div>
            ))}
          </div>

          <div style={{ color: '#6d7581', fontSize: 18 }}>{identity.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
