'use client'
// @ts-nocheck

import { useState } from 'react'
import { Journey } from '@/components/Journey'
import { Behavioural } from '@/components/Behavioural'
import { DeepInsights } from '@/components/DeepInsights'
import { Comprehensive } from '@/components/Comprehensive'

const tabs = [
  { key: 'journey', label: 'Learning Journey' },
  { key: 'behavioural', label: 'Behavioural Arc' },
  { key: 'insights', label: 'Deep Insights' },
  { key: 'comprehensive', label: 'Comprehensive' },
  { key: 'data', label: 'Observation Data' },
]

export default function Home() {
  const [active, setActive] = useState('journey')

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: '#FAFAF8', minHeight: '100vh', color: '#1A1A18' }}>
      {/* Top nav */}
      <div style={{ borderBottom: '1px solid #E8E6E1', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 20px 0' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B9890', fontWeight: 600, marginBottom: 4 }}>
            BeMe Learning Community · 2023–2026
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: 14 }}>
            Venbha&apos;s Data Insights
          </h1>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderBottom: active === t.key ? '2px solid #1A1A18' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active === t.key ? 700 : 500,
                  fontFamily: 'inherit',
                  color: active === t.key ? '#1A1A18' : '#9B9890',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {active === 'journey' && <Journey />}
        {active === 'behavioural' && <Behavioural />}
        {active === 'insights' && <DeepInsights />}
        {active === 'comprehensive' && <Comprehensive />}
        {active === 'data' && (
          <iframe
            src="/observation-report.html"
            style={{ width: '100%', height: 'calc(100vh - 120px)', border: 'none' }}
            title="Observation Data"
          />
        )}
      </div>
    </div>
  )
}
