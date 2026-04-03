'use client'
// @ts-nocheck

import { useState } from 'react'

const C = {
  bg: '#F6F5F2', sf: '#FFFFFF', bd: '#E2E0DA', bdL: '#EDEBE6',
  tx: '#18181B', sc: '#5C5A52', mu: '#9C9A92',
  bl: '#2563EB', am: '#D97706', pu: '#7C3AED',
  rd: '#DC2626', gn: '#059669', tl: '#0D9488',
  ind: '#4F46E5', pk: '#DB2777', or: '#EA580C', sl: '#64748B',
}

const TABS = ['Exploration Genome', 'Growth Gradients', 'Rhythms & Seasons', 'Facilitator Ecosystem', 'Forecast & Convergence', 'Voice & Agency']

// ──── SHARED ────
const H2 = ({ children, d }) => (
  <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: d ? 5 : 0 }}>{children}</h2>
    {d && <p style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.6 }}>{d}</p>}
  </div>
)
const Box = ({ children, s }) => <div style={{ background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 16, marginBottom: 10, ...s }}>{children}</div>
const Tag = ({ c, children }) => <span style={{ fontSize: 10, fontWeight: 600, color: c, background: c + '12', padding: '2px 9px', borderRadius: 10 }}>{children}</span>

// ──── 1. EXPLORATION GENOME ────

function RadarChart() {
  const data = [
    { l: 'Art/Craft', v: 75 }, { l: 'Governance', v: 49 }, { l: 'Dance', v: 17 },
    { l: 'Music', v: 33 }, { l: 'Social', v: 35 }, { l: 'Physical', v: 36 },
    { l: 'Outdoor', v: 21 }, { l: 'Cooking', v: 19 }, { l: 'Science', v: 12 },
    { l: 'Math', v: 22 }, { l: 'Reading', v: 26 }, { l: 'Construction', v: 9 },
  ]
  const n = data.length, cx = 170, cy = 155, maxR = 120
  const maxVal = Math.max(...data.map(d => d.v))
  const angle = (i) => (Math.PI * 2 * i / n) - Math.PI / 2
  const px = (i, r) => cx + Math.cos(angle(i)) * r
  const py = (i, r) => cy + Math.sin(angle(i)) * r
  const rings = [0.25, 0.5, 0.75, 1]

  const points = data.map((d, i) => {
    const r = (d.v / maxVal) * maxR
    return `${px(i, r)},${py(i, r)}`
  }).join(' ')

  return (
    <svg viewBox="0 0 340 320" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
      {rings.map((r, i) => (
        <polygon key={i} points={data.map((_, j) => `${px(j, maxR * r)},${py(j, maxR * r)}`).join(' ')}
          fill="none" stroke={C.bdL} strokeWidth={1} />
      ))}
      {data.map((_, i) => (
        <line key={i} x1={cx} y1={cy} x2={px(i, maxR)} y2={py(i, maxR)} stroke={C.bdL} strokeWidth={0.5} />
      ))}
      <polygon points={points} fill={C.bl + '20'} stroke={C.bl} strokeWidth={2} />
      {data.map((d, i) => {
        const r = (d.v / maxVal) * maxR
        const lx = px(i, maxR + 18)
        const ly = py(i, maxR + 18)
        return (
          <g key={i}>
            <circle cx={px(i, r)} cy={py(i, r)} r={3.5} fill={C.bl} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill={C.sc} fontFamily="DM Sans, sans-serif" fontWeight={500}>
              {d.l}
            </text>
            <text x={px(i, r) + (Math.cos(angle(i)) > 0 ? 8 : -8)} y={py(i, r) - 6} textAnchor="middle" fontSize={8} fill={C.bl} fontWeight={700} fontFamily="Georgia, serif">
              {d.v}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function CategoryEvolution() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Jan', 'Feb']
  const data = [
    { L: 39, Sk: 33, Se: 7, R: 17, C: 4 },
    { L: 34, Sk: 21, Se: 19, R: 19, C: 7 },
    { L: 31, Sk: 18, Se: 17, R: 28, C: 7 },
    { L: 31, Sk: 16, Se: 20, R: 24, C: 9 },
    { L: 23, Sk: 23, Se: 30, R: 19, C: 5 },
    { L: 24, Sk: 22, Se: 30, R: 4, C: 20 },
    { L: 20, Sk: 13, Se: 33, R: 20, C: 13 },
    { L: 30, Sk: 19, Se: 28, R: 22, C: 2 },
  ]
  const cats = [
    { key: 'C', color: C.gn, label: 'Community' },
    { key: 'R', color: C.rd, label: 'Relationships' },
    { key: 'Se', color: C.pu, label: 'Self' },
    { key: 'Sk', color: C.am, label: 'Skills' },
    { key: 'L', color: C.bl, label: 'Learning' },
  ]
  const w = 560, h = 200, px = 40, py = 10
  const chartW = w - px * 2, chartH = h - py * 2
  const stepX = chartW / (months.length - 1)

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h + 30}`} style={{ width: '100%', display: 'block' }}>
        {months.map((m, i) => (
          <text key={m} x={px + i * stepX} y={h + 20} textAnchor="middle" fontSize={10} fill={C.mu} fontFamily="DM Sans">{m}</text>
        ))}
        {cats.map((cat) => {
          const pts = data.map((d, i) => `${px + i * stepX},${py + chartH - (d[cat.key] / 100) * chartH}`).join(' ')
          const area = `${px},${py + chartH} ` + pts + ` ${px + (data.length - 1) * stepX},${py + chartH}`
          return (
            <g key={cat.key}>
              <polygon points={area} fill={cat.color + '15'} />
              <polyline points={pts} fill="none" stroke={cat.color} strokeWidth={2} />
              {data.map((d, i) => (
                <circle key={i} cx={px + i * stepX} cy={py + chartH - (d[cat.key] / 100) * chartH} r={2.5} fill={cat.color} />
              ))}
            </g>
          )
        })}
        {[0, 25, 50].map(v => (
          <g key={v}>
            <line x1={px} y1={py + chartH - (v / 100) * chartH} x2={px + chartW} y2={py + chartH - (v / 100) * chartH} stroke={C.bdL} strokeWidth={0.5} strokeDasharray="3,3" />
            <text x={px - 6} y={py + chartH - (v / 100) * chartH + 3} textAnchor="end" fontSize={8} fill={C.mu}>{v}%</text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
        {cats.map(c => (
          <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />{c.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function WordCloud() {
  const words = [
    { w: 'making', s: 28 }, { w: 'together', s: 18 }, { w: 'reflection', s: 16 },
    { w: 'closing', s: 15 }, { w: 'corner', s: 14 }, { w: 'craft', s: 14 },
    { w: 'playing', s: 13 }, { w: 'paper', s: 13 }, { w: 'journal', s: 13 },
    { w: 'dance', s: 11 }, { w: 'sakha', s: 11 }, { w: 'different', s: 11 },
    { w: 'experiment', s: 10 }, { w: 'worksheet', s: 10 }, { w: 'Myra', s: 10 },
    { w: 'outdoor', s: 9 }, { w: 'learning', s: 9 }, { w: 'project', s: 9 },
    { w: 'science', s: 9 }, { w: 'park', s: 9 }, { w: 'morning', s: 9 },
    { w: 'game', s: 8 }, { w: 'snacks', s: 8 },
  ]
  const colors = [C.bl, C.pu, C.am, C.gn, C.rd, C.tl, C.ind, C.or, C.sl]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', justifyContent: 'center', padding: 12 }}>
      {words.map((w, i) => (
        <span key={i} style={{ fontSize: Math.max(11, w.s * 0.7), fontWeight: w.s > 14 ? 700 : 500, color: colors[i % colors.length], lineHeight: 1.8 }}>
          {w.w}
        </span>
      ))}
    </div>
  )
}

function ExplorationGenome() {
  return (
    <>
      <H2 d="Her exploration fingerprint — the unique shape of what she gravitates towards. No two children will have the same radar.">Exploration Radar</H2>
      <Box><RadarChart /></Box>

      <H2 d="How the proportion of each category has shifted month by month. Watch 'Self' (purple) rise steadily from June to January — she's becoming more self-aware and reflective over time.">Category Shape Evolution</H2>
      <Box><CategoryEvolution /></Box>

      <Box s={{ background: '#FFFBF0', borderColor: '#F5E6CC' }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>The Shape Story</div>
        <div style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.7 }}>
          In June, Learning (39%) and Skills (33%) dominated — she was doing tangible, hands-on work. By November and January,
          Self (30-33%) became the leading category, reflecting increased reflection journals, independent decision-making,
          and self-organization. Community spiked in November (20%) during craft month and governance work.
          Relationships dipped in November (4%) but rebounded in January (20%) as social connections re-established
          after Dussehra break. This isn&apos;t random — it&apos;s the shape of a child moving from external engagement to internal agency.
        </div>
      </Box>

      <H2 d="The most frequent content words across 296 observations this year. 'Making' dominates — she is fundamentally a maker.">Word Landscape</H2>
      <Box><WordCloud /></Box>
    </>
  )
}

// ──── 2. GROWTH GRADIENTS ────

function GradientBar({ label, segments, total }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ color: C.mu, fontFamily: 'monospace', fontSize: 11 }}>{total} obs</span>
      </div>
      <div style={{ display: 'flex', height: 20, borderRadius: 4, overflow: 'hidden', gap: 1 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ flex: s.val || 0.5, background: s.color, position: 'relative' }} title={`${s.label}: ${s.val}`}>
            {s.val > 8 && <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 8, color: '#fff', fontWeight: 700 }}>{s.val}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: C.mu }}>
            <div style={{ width: 6, height: 6, borderRadius: 2, background: s.color }} />{s.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function ComplexityChart() {
  const years = ['2024-25', '2025-26']
  const data = [
    { simple: 14, structured: 12, creative: 21, multi: 23, authored: 0 },
    { simple: 39, structured: 23, creative: 55, multi: 24, authored: 2 },
  ]
  const layers = [
    { key: 'authored', label: 'Self-authored', color: C.pu },
    { key: 'multi', label: 'Multi-step project', color: C.bl },
    { key: 'creative', label: 'Creative production', color: C.am },
    { key: 'structured', label: 'Structured task', color: C.tl },
    { key: 'simple', label: 'Simple activity', color: C.bdL },
  ]
  const w = 400, h = 180, barW = 90, gap = 80

  return (
    <svg viewBox={`0 0 ${w} ${h + 30}`} style={{ width: '100%', display: 'block', margin: '0 auto' }}>
      {years.map((yr, yi) => {
        const d = data[yi]
        const total = Object.values(d).reduce((a, b) => a + b, 0) || 1
        let cumY = 10
        const barH = 150
        const x = 80 + yi * (barW + gap)
        return (
          <g key={yr}>
            {layers.map((l) => {
              const segH = (d[l.key] / total) * barH
              const thisY = cumY
              cumY += segH
              return segH > 0 ? (
                <g key={l.key}>
                  <rect x={x} y={thisY} width={barW} height={segH} fill={l.color} rx={segH === barH ? 4 : 0} />
                  {segH > 14 && (
                    <text x={x + barW / 2} y={thisY + segH / 2 + 3} textAnchor="middle" fontSize={9} fill={l.key === 'simple' ? C.sc : '#fff'} fontWeight={600}>
                      {d[l.key]} ({Math.round(d[l.key] / total * 100)}%)
                    </text>
                  )}
                </g>
              ) : null
            })}
            <text x={x + barW / 2} y={h + 18} textAnchor="middle" fontSize={11} fill={C.tx} fontWeight={600} fontFamily="DM Sans">{yr}</text>
          </g>
        )
      })}
      {layers.map((l, i) => (
        <g key={l.key}>
          <rect x={w - 130} y={10 + i * 16} width={8} height={8} fill={l.color} rx={2} />
          <text x={w - 118} y={17 + i * 16} fontSize={9} fill={C.sc} fontFamily="DM Sans">{l.label}</text>
        </g>
      ))}
    </svg>
  )
}

function GrowthGradients() {
  return (
    <>
      <H2 d="How the character of her engagement has evolved — from simple activities to self-authored projects.">Activity Complexity Evolution</H2>
      <Box><ComplexityChart /></Box>
      <Box s={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
        <div style={{ fontSize: 12.5, color: '#166534', lineHeight: 1.7 }}>
          <strong>The shift:</strong> Creative production grew from 30% to 38% of activities. Multi-step projects held steady at ~17%.
          Simple activities (lunch, play, snacks) grew in raw count but that&apos;s largely a documentation artifact — more observers logging
          quick entries. The key new category: <strong>self-authored</strong> activities appeared for the first time in 2025-26 —
          she&apos;s now initiating plans, not just participating in offered activities.
        </div>
      </Box>

      <H2 d="How much of her learning is facilitated vs peer-supported vs self-initiated. The gradient is shifting rightward.">Independence Gradient</H2>
      <Box>
        <GradientBar label="2024-25" total={154} segments={[
          { label: 'Facilitated', val: 30, color: C.am },
          { label: 'Peer-supported', val: 45, color: C.bl },
          { label: 'Self-initiated', val: 12, color: C.gn },
          { label: 'Unclassified', val: 67, color: C.bdL },
        ]} />
        <GradientBar label="2025-26" total={294} segments={[
          { label: 'Facilitated', val: 25, color: C.am },
          { label: 'Peer-supported', val: 75, color: C.bl },
          { label: 'Self-initiated', val: 38, color: C.gn },
          { label: 'Unclassified', val: 156, color: C.bdL },
        ]} />
        <div style={{ fontSize: 11, color: C.sc, lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
          Self-initiated observations tripled (12→38). Peer-supported engagement grew 67%.
          &quot;Unclassified&quot; is high because most observations don&apos;t capture who initiated —
          a gap in the observation format. Adding a &quot;who initiated?&quot; field would make this gradient precise.
        </div>
      </Box>

      <H2 d="Observation depth by year — are facilitators capturing richer moments or thinner snapshots?">Observation Depth</H2>
      <Box>
        {[
          { year: '2023-24', total: 117, deep: 32, mod: 61, thin: 24, avg: 24, voice: 0 },
          { year: '2024-25', total: 154, deep: 12, mod: 87, thin: 55, avg: 15, voice: 4 },
          { year: '2025-26', total: 296, deep: 16, mod: 104, thin: 176, avg: 9, voice: 6 },
        ].map((d, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{d.year}</span>
              <span style={{ color: C.mu, fontSize: 11 }}>avg {d.avg} words · {d.voice} with her voice</span>
            </div>
            <div style={{ display: 'flex', height: 14, borderRadius: 3, overflow: 'hidden', gap: 1 }}>
              <div style={{ flex: d.deep, background: C.gn }} title={`Detailed: ${d.deep}`} />
              <div style={{ flex: d.mod, background: C.bl }} title={`Moderate: ${d.mod}`} />
              <div style={{ flex: d.thin, background: C.bdL }} title={`Thin: ${d.thin}`} />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 14, fontSize: 10, color: C.mu, marginTop: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.gn }} />Rich (&gt;30 words)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.bl }} />Moderate</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.bdL }} />Thin (≤5 words)</span>
        </div>
      </Box>
    </>
  )
}

// ──── 3. RHYTHMS & SEASONS ────

function WeekdayChart() {
  const data = [
    { d: 'Mon', v: 18 }, { d: 'Tue', v: 84 }, { d: 'Wed', v: 59 },
    { d: 'Thu', v: 49 }, { d: 'Fri', v: 52 }, { d: 'Sat', v: 19 }, { d: 'Sun', v: 13 },
  ]
  const max = Math.max(...data.map(d => d.v))
  return (
    <svg viewBox="0 0 400 140" style={{ width: '100%', display: 'block' }}>
      {data.map((d, i) => {
        const bw = 38, gap = 12, x = 30 + i * (bw + gap), h = (d.v / max) * 100
        return (
          <g key={i}>
            <rect x={x} y={120 - h} width={bw} height={h} fill={d.v > 50 ? C.bl : C.bl + '50'} rx={4} />
            <text x={x + bw / 2} y={120 - h - 6} textAnchor="middle" fontSize={10} fill={C.bl} fontWeight={700} fontFamily="Georgia">{d.v}</text>
            <text x={x + bw / 2} y={135} textAnchor="middle" fontSize={10} fill={C.mu} fontFamily="DM Sans">{d.d}</text>
          </g>
        )
      })}
    </svg>
  )
}

function MonthlyHeatmap() {
  const data = [
    { m: 'Jun 24', v: 1 }, { m: 'Jul 24', v: 16 }, { m: 'Aug 24', v: 24 },
    { m: 'Sep 24', v: 4 }, { m: 'Oct 24', v: 4 }, { m: 'Nov 24', v: 1 },
    { m: 'Dec 24', v: 33 }, { m: 'Jan 25', v: 18 }, { m: 'Feb 25', v: 39 },
    { m: 'Mar 25', v: 13 }, { m: '', v: 0 }, { m: '', v: 0 },
    { m: 'Jun 25', v: 41 }, { m: 'Jul 25', v: 77 }, { m: 'Aug 25', v: 35 },
    { m: 'Sep 25', v: 49 }, { m: 'Oct 25', v: 17 }, { m: 'Nov 25', v: 35 },
    { m: 'Dec 25', v: 0 }, { m: 'Jan 26', v: 22 }, { m: 'Feb 26', v: 17 },
    { m: 'Mar 26', v: 1 },
  ]
  const max = Math.max(...data.map(d => d.v))
  const cols = 6, cellW = 65, cellH = 42, gap = 3
  const rows = Math.ceil(data.length / cols)

  const opacity = (v) => v === 0 ? 0 : Math.max(0.1, v / max)

  return (
    <svg viewBox={`0 0 ${cols * (cellW + gap)} ${rows * (cellH + gap) + 10}`} style={{ width: '100%', display: 'block' }}>
      {data.map((d, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        const x = col * (cellW + gap), y = row * (cellH + gap)
        if (!d.m) return null
        return (
          <g key={i}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={6} fill={d.v === 0 ? C.bdL : C.bl} opacity={d.v === 0 ? 0.3 : opacity(d.v)} />
            <text x={x + cellW / 2} y={y + 18} textAnchor="middle" fontSize={9} fill={opacity(d.v) > 0.5 ? '#fff' : C.sc} fontWeight={600}>{d.v || '—'}</text>
            <text x={x + cellW / 2} y={y + 32} textAnchor="middle" fontSize={8} fill={opacity(d.v) > 0.5 ? '#ffffffaa' : C.mu}>{d.m}</text>
          </g>
        )
      })}
    </svg>
  )
}

function SeasonalFlow() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Jan', 'Feb']
  const interests = [
    { name: 'Art', color: C.am, data: [10, 20, 10, 14, 3, 2, 3, 1] },
    { name: 'Academic', color: C.bl, data: [2, 12, 8, 1, 3, 1, 1, 1] },
    { name: 'Governance', color: C.gn, data: [1, 4, 1, 3, 1, 23, 6, 1] },
    { name: 'Dance', color: C.pu, data: [0, 2, 0, 5, 4, 7, 0, 0] },
    { name: 'Science', color: C.ind, data: [0, 7, 2, 0, 0, 0, 0, 0] },
    { name: 'Physical', color: C.rd, data: [2, 15, 3, 5, 1, 2, 0, 1] },
    { name: 'Cooking', color: C.or, data: [2, 3, 0, 8, 0, 0, 0, 0] },
  ]
  const w = 540, h = 200, px = 40, py = 10, chartW = w - px * 2, chartH = h - py * 2
  const stepX = chartW / (months.length - 1)
  const maxVal = 23

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h + 28}`} style={{ width: '100%', display: 'block' }}>
        {months.map((m, i) => (
          <text key={m} x={px + i * stepX} y={h + 18} textAnchor="middle" fontSize={10} fill={C.mu} fontFamily="DM Sans">{m}</text>
        ))}
        {interests.map((int) => {
          const pts = int.data.map((v, i) => `${px + i * stepX},${py + chartH - (v / maxVal) * chartH}`).join(' ')
          return (
            <g key={int.name}>
              <polyline points={pts} fill="none" stroke={int.color} strokeWidth={2} strokeLinejoin="round" />
              {int.data.map((v, i) => v > 0 ? (
                <circle key={i} cx={px + i * stepX} cy={py + chartH - (v / maxVal) * chartH} r={2.5} fill={int.color} />
              ) : null)}
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {interests.map(i => (
          <div key={i.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
            <div style={{ width: 12, height: 3, borderRadius: 2, background: i.color }} />{i.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function RhythmsSeasons() {
  return (
    <>
      <H2 d="When observations happen reveals when engagement is most visible. Tuesday dominates — that's material exploration day.">Weekly Rhythm</H2>
      <Box><WeekdayChart /></Box>
      <Box s={{ background: '#F5F3FF', borderColor: '#DDD6FE' }}>
        <div style={{ fontSize: 12, color: '#5B21B6', lineHeight: 1.6 }}>
          <strong>Tuesday = 84 observations</strong> (29% of all). This is &quot;material exploration day&quot; — group activities
          with new materials. <strong>Monday</strong> (18) is low — art/craft day but less documented. The insight:
          Tuesday&apos;s structured exploration generates the most observable moments. Facilitators capture more when the day has a named activity frame.
        </div>
      </Box>

      <H2 d="Observation density across 22 months. Darker = more observations. The summer 2025 ramp-up is visible.">Observation Heatmap</H2>
      <Box><MonthlyHeatmap /></Box>

      <H2 d="How each interest area flows across months. Art is ever-present but declining. Governance surged in Nov. Science vanished after July.">Seasonal Interest Flow</H2>
      <Box><SeasonalFlow /></Box>
      <Box s={{ background: '#FFFBF0', borderColor: '#F5E6CC' }}>
        <div style={{ fontSize: 12, color: '#92400E', lineHeight: 1.7 }}>
          <strong>Three seasonal stories:</strong> (1) Art starts high and slowly declines — not disinterest but a natural
          redistribution as other interests emerge. (2) Governance spikes dramatically in November — craft month brought
          committee work, orientation, and closing reflections. (3) Science has a clean peak in July (Antara-led experiments)
          then flatlines — a facilitator dependency, not a child preference change.
        </div>
      </Box>
    </>
  )
}

// ──── 4. FACILITATOR ECOSYSTEM ────

function FacilitatorChart() {
  const facilitators = [
    { name: 'Mayuri Rai', total: 136, behaviors: { creative: 31, governance: 19, social: 16, science: 9, academic: 9, physical: 7, self_dir: 5 } },
    { name: 'Nilima', total: 130, behaviors: { governance: 25, social: 15, creative: 13, academic: 13, physical: 12, self_dir: 3, science: 2 } },
    { name: 'Deepika', total: 5, behaviors: { academic: 5, self_dir: 2, creative: 1 } },
    { name: 'Rashmi', total: 6, behaviors: { governance: 2, academic: 1, creative: 1, self_dir: 1 } },
    { name: 'Keerthi', total: 7, behaviors: { creative: 3, physical: 1, social: 1 } },
    { name: 'Antara', total: 4, behaviors: { academic: 1, self_dir: 1, governance: 1, creative: 1 } },
  ]
  const behColors = { creative: C.am, governance: C.gn, social: C.rd, science: C.ind, academic: C.bl, physical: C.or, self_dir: C.pu }
  const maxTotal = 136

  return (
    <div>
      {facilitators.map((f, i) => {
        return (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{f.name}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.mu }}>{f.total} obs</span>
            </div>
            <div style={{ display: 'flex', height: 18, borderRadius: 3, overflow: 'hidden', gap: 1, width: `${(f.total / maxTotal) * 100}%` }}>
              {Object.entries(f.behaviors).map(([beh, val]) => (
                <div key={beh} style={{ flex: val, background: behColors[beh] || C.sl, minWidth: val > 0 ? 2 : 0 }} title={`${beh}: ${val}`} />
              ))}
            </div>
          </div>
        )
      })}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
        {Object.entries(behColors).map(([b, c]) => (
          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: C.sc }}>
            <div style={{ width: 6, height: 6, borderRadius: 2, background: c }} />{b}
          </div>
        ))}
      </div>
    </div>
  )
}

function FacilitatorEcosystem() {
  return (
    <>
      <H2 d="Each facilitator has a natural lens. What they notice in Venbha reveals as much about the observer as the child.">What Each Facilitator Unlocks</H2>
      <Box><FacilitatorChart /></Box>

      <H2 d="Critical coverage gaps that affect the picture of Venbha's learning.">Ecosystem Gaps</H2>
      {[
        { title: 'The Math Pipeline', color: C.bl, detail: 'Deepika is the sole math documenter (5 observations, 100% tagged Learning). She writes the most detailed notes (avg 19 words vs 8 school-wide). But 5 entries across an entire year means math engagement is essentially invisible. Venbha does dice math, two-digit addition, counting worksheets — none of it appears when Deepika isn\'t present.', metric: '5 obs / 1 facilitator / 97% undocumented' },
        { title: 'The Science Dependency', color: C.ind, detail: 'Antara catalyzes all science curiosity — magnet experiments, electricity, calligraphy, material exploration. When Antara\'s involvement dips, science observations go to zero. This isn\'t about Venbha\'s interest; it\'s about facilitator availability. She asked \'Why can\'t I control the force?\' and wanted to \'make a story about magnets.\' The desire is there.', metric: '10 → 2 → 0 across quarters' },
        { title: 'The Observation Quality Trade-off', color: C.am, detail: 'Mayuri and Nilima together produce 266 observations but average 8 words each. Deepika produces 5 but averages 19 words. Rashmi produces 6 with detailed narrative including direct quotes. The system rewards volume over depth. Consider: 50 rich observations with context may be worth more than 200 photo captions.', metric: '8 vs 19 avg words per entry' },
      ].map((g, i) => (
        <Box key={i} s={{ borderLeft: `4px solid ${g.color}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{g.title}</div>
          <div style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.65, marginBottom: 8 }}>{g.detail}</div>
          <div style={{ background: g.color + '0A', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: g.color }}>{g.metric}</div>
        </Box>
      ))}
    </>
  )
}

// ──── 5. FORECAST & CONVERGENCE ────

function ConvergenceNode({ title, connects, color, how, why }) {
  return (
    <Box s={{ borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
        {connects.map((c, i) => <Tag key={i} c={color}>{c}</Tag>)}
      </div>
      <div style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.7, marginBottom: 8 }}>{how}</div>
      <div style={{ fontSize: 12, color: C.tx, lineHeight: 1.6, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 6, padding: '10px 14px' }}>
        <strong>Why this works for Venbha specifically:</strong> {why}
      </div>
    </Box>
  )
}

function ForecastTimeline() {
  const forecasts = [
    { time: 'Next 3 months', title: 'Literacy breakthrough via documentation', detail: 'She\'s at the phonemic awareness → decoding edge. If given a personal journal for science/cooking documentation (draw + label + one sentence), she\'ll cross into early reading through meaningful writing, not isolated phonics.', confidence: 'High', color: C.bl, signal: 'Expressed wanting Bob Books. Already labeling, copying words, matching pictures to text.' },
    { time: 'Next 3 months', title: 'Math will emerge through projects', detail: 'Dice math is working. The shop project, cooking measurements, and bead-counting for bracelets are all latent math. If facilitators name the math when it happens (\'You just figured out 12 + 15 — that\'s addition!\'), she\'ll internalize math identity.', confidence: 'High', color: C.gn, signal: 'Two-digit addition with Deepika. Dice math in sakha. Counting beads for bracelets.' },
    { time: 'Next 6 months', title: 'The \'student identity\' tension will peak', detail: 'She\'s comparing BeMe with mainstream school peers (homework, uniforms, exams). This will intensify as neighborhood friends enter formal testing years. She\'ll need adults who help her articulate what she\'s learning in terms that feel legitimate to her growing sense of \'am I keeping up?\'', confidence: 'Medium', color: C.am, signal: 'Father noted comparison anxiety. She asked for \'homework.\' \'Her school image is different from home.\'' },
    { time: 'Next 6 months', title: 'Self-authored multi-week projects', detail: 'She\'s moved from following to initiating. The next step is multi-week projects she designs herself — the soap-making she proposed, or a \'story of my experiments\' book. She has the planning skills (outstation list), the persistence (45 min on packing list), and the desire.', confidence: 'High', color: C.pu, signal: 'Proposed soap-making project. Made outstation list. Planned performance. Resource committee work.' },
    { time: 'Next 12 months', title: 'Peer teaching as her deepest learning mode', detail: 'She learns from Myra (dance), teaches dance to others, organizes performances, and does committee work. Teaching consolidates understanding. If she teaches a younger child counting, art techniques, or recipes, she\'ll deepen her own mastery without it feeling like \'practice.\'', confidence: 'Medium', color: C.tl, signal: 'Already teaching dance. Organized performance. Committee governance. Shared chocolates with everyone.' },
    { time: 'Ongoing', title: 'Art will remain her anchor but evolve', detail: 'Art isn\'t declining — it\'s maturing. From coloring → bracelets → robotic hand → origami → calligraphy → transparent photo frame. The complexity is increasing even as raw count decreases. She\'s becoming selective about her craft, not losing interest.', confidence: 'High', color: C.am, signal: '75 art observations, complexity increasing. Calligraphy is the newest expression — structured, precise, discipline-oriented.' },
  ]

  return (
    <>
      {forecasts.map((f, i) => (
        <Box key={i} s={{ borderLeft: `4px solid ${f.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: C.mu, marginTop: 2 }}>{f.time}</div>
            </div>
            <Tag c={f.confidence === 'High' ? C.gn : C.am}>{f.confidence} confidence</Tag>
          </div>
          <div style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.65, marginBottom: 8 }}>{f.detail}</div>
          <div style={{ fontSize: 12, color: f.color, background: f.color + '08', borderRadius: 6, padding: '8px 12px' }}>
            <strong>Signal:</strong> {f.signal}
          </div>
        </Box>
      ))}
    </>
  )
}

function ForecastConvergence() {
  return (
    <>
      <H2 d="Where her interests and developmental edges naturally intersect. These are spaces where one activity advances multiple dimensions simultaneously — the highest-leverage opportunities.">Interest Convergence Opportunities</H2>

      <ConvergenceNode title="The Experiment Journal" color={C.pu}
        connects={['Science inquiry', 'Writing & labeling', 'Art (drawings)', 'Self-organization', 'Verbal expression']}
        how="After each experiment, she draws what happened, labels the materials, writes one sentence about what she discovered, and tells someone about it. Every entry is a reading lesson disguised as science documentation."
        why="She asked 'Why can't I control the force?' and wanted to 'make a story about the magnet experiment.' She already wants to narrativize science. Give her the medium." />

      <ConvergenceNode title="The Recipe Book" color={C.am}
        connects={['Cooking (existing love)', 'Reading (recipe text)', 'Math (measurement)', 'Writing (reviews)', 'Science (transformations)']}
        how="She already cooks — bhelpuri, chocolate, lemonade. Now she creates her own recipe book: she reads the recipe (reading), measures ingredients (math: 'We need 2 cups, we have 1'), observes transformations (science: 'Why did chocolate melt?'), and writes a one-line review."
        why="Hands-on/kinesthetic is her dominant modality (65 observations). Cooking is her most emotionally safe context for academic skill-building — she's confident here." />

      <ConvergenceNode title="The BeMe Store" color={C.gn}
        connects={['Math (pricing, money)', 'Writing (signs, labels)', 'Art (making products)', 'Social (customer interaction)', 'Governance (fairness, planning)']}
        how="She ran a gulab jamun stall and said she'd 'help poor people like Myra.' A sustained shop project — making items in art corner, creating price tags (writing), calculating costs (math), selling to community (social), and deciding what to do with earnings (ethics)."
        why="Her stall day was the single richest observation in the entire record — it captured math, ethics, social skills, self-expression, and commerce in one moment. Make it recurring." />

      <ConvergenceNode title="The Performance Company" color={C.rd}
        connects={['Dance (physical expression)', 'Planning (event production)', 'Writing (invitations/programs)', 'Social (audience)', 'Community (celebration)']}
        how="She planned a performance, invited people, decorated, and danced. If she writes invitations (reading/writing), creates a program list (planning/design), rehearses (persistence), and performs (expression), one project touches 5 edges."
        why="Her observation record captures her planning a performance ('Are you free? Can you come tomorrow?'). She's already a producer — not just a performer. Give her the production framework." />

      <ConvergenceNode title="The Nature Detective" color={C.tl}
        connects={['Outdoor (nature walks)', 'Science (observation)', 'Writing (nature journal)', 'Art (pressing leaves, drawing)', 'Math (counting species)']}
        how="She identified birds with the Merlin app. She collects stones and leaves. A nature journal where she sketches what she sees, labels species, counts varieties ('I found 4 types of leaves today'), and writes one observation per walk."
        why="Outdoor + nature has 21 observations but high engagement quality. The Merlin app session was one of the most detailed observations all year. She's a natural field scientist." />

      <div style={{ marginTop: 32 }}>
        <H2 d="Trajectory projections based on behavioral momentum, expressed desires, and developmental patterns. Not prescriptions — probability-weighted directions.">
          Developmental Forecast
        </H2>
        <ForecastTimeline />
      </div>
    </>
  )
}

// ──── 6. VOICE & AGENCY ────

function VoiceAgency() {
  const voices = [
    { year: '2024-25', quote: 'Uncle, give me a project. I want to paint a large cardboard. Paint, brush and a large cardboard.', context: 'First documented instance of requesting resources by name', type: 'Requesting' },
    { year: '2024-25', quote: 'She said I will help you to climb up on a rocks.', context: 'Offering help to others — relational confidence', type: 'Offering' },
    { year: '2024-25', quote: 'I don\'t have a bottle, so can I get one? — Before this, she never asked questions in public.', context: 'Facilitator noted this as a breakthrough moment', type: 'Requesting' },
    { year: '2024-25', quote: 'Why can\'t I control the force?', context: 'Causal reasoning question during science experiment', type: 'Inquiring' },
    { year: '2024-25', quote: 'It\'s floating because it\'s lightweight. I think coconut floats.', context: 'Hypothesis formation — predicting before testing', type: 'Reasoning' },
    { year: '2024-25', quote: 'Are you free? Can you come tomorrow? We have a dance performance.', context: 'Organizing, inviting, producing an event', type: 'Organizing' },
    { year: '2025-26', quote: 'When she writes those things she needs to do independently, she will not forget.', context: 'Metacognition — she understands her own learning strategy', type: 'Metacognitive' },
    { year: '2025-26', quote: 'She told she will help poor people like Myra.', context: 'Ethical reasoning about money and generosity', type: 'Values' },
    { year: '2025-26', quote: 'She expressed that she wanted to study and learn writing. Bob Books she wanted to read.', context: 'Self-directed learning goal — she identified the resource', type: 'Goal-setting' },
    { year: '2025-26', quote: 'Vemba also took a paper... They were informed to make a single list.', context: 'Volunteering for committee work — governance participation', type: 'Participating' },
  ]

  const typeColors = { Requesting: C.bl, Offering: C.gn, Inquiring: C.pu, Reasoning: C.ind, Organizing: C.am, Metacognitive: C.tl, Values: C.pk, 'Goal-setting': C.or, Participating: C.gn }

  const voiceEvolution = [
    { year: '2023-24', count: 0, desc: 'Zero documented. She \'used to say only yes and no.\' Her voice wasn\'t captured or wasn\'t yet expressed in observable contexts.' },
    { year: '2024-25', count: 6, desc: 'First questions in public. First hypothesis. First event planning. The shift from silent to expressive — every instance is a breakthrough.' },
    { year: '2025-26', count: 4, desc: 'Quality over quantity. Metacognition appears (\'when I write it I won\'t forget\'). Ethical reasoning. Self-directed goal-setting. She\'s not just speaking — she\'s authoring.' },
  ]

  return (
    <>
      <H2 d="In a school built on self-ownership, the child's own voice is the most important data. Here are all 10 documented instances across 565 observations where Venbha's actual words were captured.">
        Her Voice — Every Documented Instance
      </H2>

      <Box>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {voiceEvolution.map((v, i) => (
            <div key={i} style={{ flex: 1, background: C.bl + '08', borderRadius: 8, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Georgia, serif', color: C.bl }}>{v.count}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.tx }}>{v.year}</div>
              <div style={{ fontSize: 10, color: C.mu, marginTop: 4, lineHeight: 1.4 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </Box>

      {voices.map((v, i) => (
        <Box key={i} s={{ background: '#FFFBF0', borderColor: '#F5E6CC' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.mu, fontWeight: 600 }}>{v.year}</span>
            <Tag c={typeColors[v.type] || C.sl}>{v.type}</Tag>
          </div>
          <div style={{ fontSize: 14, color: C.tx, lineHeight: 1.6, fontStyle: 'italic', fontFamily: 'Georgia, serif', marginBottom: 6 }}>
            &ldquo;{v.quote}&rdquo;
          </div>
          <div style={{ fontSize: 12, color: C.sc }}>{v.context}</div>
        </Box>
      ))}

      <Box s={{ background: '#F0FDF4', borderColor: '#BBF7D0', marginTop: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 6 }}>The Voice Trajectory</div>
        <div style={{ fontSize: 12.5, color: '#166534', lineHeight: 1.7 }}>
          Her voice evolved from <strong>requesting</strong> (2024-25: &quot;give me a project,&quot; &quot;can I get a bottle?&quot;)
          to <strong>reasoning</strong> (&quot;Why can&apos;t I control the force?&quot;, &quot;I think coconut floats&quot;)
          to <strong>authoring</strong> (2025-26: &quot;when I write things I need to do, I won&apos;t forget&quot; — this is metacognition).
          The most recent capture is <strong>values-based</strong>: &quot;I&apos;ll help poor people like Myra.&quot;
          She&apos;s not just finding her voice — she&apos;s developing a moral voice. At 10 instances out of 565 observations,
          this is the most under-captured dimension of her record. Every facilitator should have a practice of
          writing down what she actually says — verbatim — at least once per week.
        </div>
      </Box>

      <H2 d="A proposed observation enhancement: the 'I noticed...' template that centers the child's agency.">
        For Facilitators: Capturing Agency
      </H2>
      <Box>
        <div style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 2, color: C.sc }}>
          <div><span style={{ color: C.bl, fontWeight: 600 }}>What she chose:</span> _____________</div>
          <div><span style={{ color: C.gn, fontWeight: 600 }}>What she said (verbatim):</span> _____________</div>
          <div><span style={{ color: C.pu, fontWeight: 600 }}>What I noticed:</span> _____________</div>
          <div><span style={{ color: C.am, fontWeight: 600 }}>Who was involved:</span> _____________</div>
          <div><span style={{ color: C.rd, fontWeight: 600 }}>Who initiated this?</span> <span style={{ color: C.mu }}>[Child / Peer / Facilitator / Scheduled]</span></div>
        </div>
        <div style={{ fontSize: 12, color: C.sc, lineHeight: 1.6, marginTop: 12, fontStyle: 'italic' }}>
          Five fields. Takes 30 seconds more than a photo caption. Produces 10× richer data for the AI pipeline.
          The &quot;who initiated?&quot; field alone would make the independence gradient precise instead of estimated.
        </div>
      </Box>
    </>
  )
}

// ──── MAIN ────
export function Comprehensive() {
  const [tab, setTab] = useState(0)
  const content = [ExplorationGenome, GrowthGradients, RhythmsSeasons, FacilitatorEcosystem, ForecastConvergence, VoiceAgency]
  const Content = content[tab]

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px 80px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.mu, fontWeight: 600, marginBottom: 4 }}>
          Deep Analysis · 565 Observations · 22 Months · 8 Facilitators
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: 6 }}>
          Comprehensive Developmental Insights
        </h2>
        <p style={{ fontSize: 12.5, color: C.sc, lineHeight: 1.6 }}>
          Behavioral genome, learning modalities, temporal rhythms, facilitator ecosystem, trajectory forecasts,
          and convergence opportunities. All evidence-derived. No benchmarks. Philosophy-aligned.
        </p>
      </div>

      <div style={{ position: 'sticky', top: 119, zIndex: 9, background: '#FAFAF8', paddingTop: 8, paddingBottom: 8, marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ display: 'flex', gap: 2, background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 3, overflowX: 'auto' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: '0 0 auto', padding: '8px 12px', border: 'none', borderRadius: 7, cursor: 'pointer',
              fontSize: 11, fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap',
              background: tab === i ? C.tx : 'transparent',
              color: tab === i ? '#fff' : C.sc,
            }}>{t}</button>
          ))}
        </div>
      </div>

      <Content />

      <div style={{ marginTop: 40, paddingTop: 14, borderTop: `1px solid ${C.bd}`, fontSize: 10, color: C.mu }}>
        All 12 sheets analyzed · 3 academic years · No external benchmarks · BeMe philosophy-aligned
      </div>
    </div>
  )
}
