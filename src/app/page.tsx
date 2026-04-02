import Link from 'next/link'

const reports = [
  {
    title: 'Generic Observation Report',
    description: 'Monthly observation report with data quality analysis and standardization recommendations',
    href: '/generic',
    tag: 'Overview',
  },
  {
    title: 'Level 1 — Parent Report',
    description: 'Developmental report synthesized from 565 observations, growth timeline, interests, and goal alignment',
    href: '/level-1',
    tag: 'Level 1',
  },
  {
    title: 'Level 2 — Learning Journey',
    description: 'Philosophy-aligned journey report with facilitator windows, AI pipeline, and language guidelines',
    href: '/level-2',
    tag: 'Level 2',
  },
  {
    title: 'Level 3 — Quantitative Insights',
    description: 'Deep analysis with exploration maps, velocity trends, peer networks, observer blind spots, and action items',
    href: '/level-3',
    tag: 'Level 3',
  },
]

export default function Home() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: '#FAFAF8', minHeight: '100vh', color: '#1A1A18' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B9890', fontWeight: 600, marginBottom: 8 }}>
            BeMe Learning Community · 2023–2026
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: 10 }}>
            Venbha&apos;s Data Insights
          </h1>
          <p style={{ fontSize: 14, color: '#6B6960', lineHeight: 1.6 }}>
            A collection of observation reports and data analyses synthesized from 565 observations
            across 3 academic years, 5 semester reviews, and self-set goals.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reports.map((report) => (
            <Link
              key={report.href}
              href={report.href}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E6E1',
                borderRadius: 10,
                padding: '20px 24px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '3px 10px', borderRadius: 6, background: '#EFF6FF', color: '#2563EB',
                }}>
                  {report.tag}
                </span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: 4 }}>
                {report.title}
              </div>
              <div style={{ fontSize: 13, color: '#6B6960', lineHeight: 1.5 }}>
                {report.description}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid #E8E6E1', fontSize: 11, color: '#9B9890' }}>
          Generated April 2026 · Source: BeMe_Observations_Venbha-P.xlsx
        </div>
      </div>
    </div>
  )
}
