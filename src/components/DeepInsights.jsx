'use client'
// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F8F8F6", surface: "#FFFFFF", border: "#E4E2DC", borderLight: "#EEECE7",
  text: "#18181B", sec: "#5C5A52", muted: "#9C9A92",
  blue: "#2563EB", amber: "#D97706", purple: "#7C3AED",
  red: "#DC2626", green: "#059669", teal: "#0D9488",
  indigo: "#4F46E5", pink: "#DB2777", orange: "#EA580C",
  slate: "#64748B",
};

const tabs = ["Exploration Map", "Velocity & Trends", "Connections", "Blind Spots", "Action Items"];

// ──── DATA ────

const radarData = [
  { label: "Art & Craft", value: 75, total: 75, color: C.amber },
  { label: "Physical Play", value: 36, total: 36, color: C.red },
  { label: "Governance", value: 49, total: 49, color: C.green },
  { label: "Social Bonding", value: 35, total: 35, color: C.pink },
  { label: "Dance", value: 17, total: 17, color: C.purple },
  { label: "Music", value: 33, total: 33, color: C.indigo },
  { label: "Reading & Writing", value: 26, total: 26, color: C.teal },
  { label: "Outdoor & Nature", value: 21, total: 21, color: C.green },
  { label: "Cooking", value: 19, total: 19, color: C.orange },
  { label: "Math & Numbers", value: 22, total: 22, color: C.blue },
  { label: "Science", value: 12, total: 12, color: C.slate },
  { label: "Construction", value: 9, total: 9, color: C.amber },
  { label: "Self-Org", value: 18, total: 18, color: C.purple },
  { label: "Puzzles", value: 8, total: 8, color: C.teal },
  { label: "Pretend Play", value: 4, total: 4, color: C.pink },
];

const velocityData = [
  { act: "Art & Craft", q1: 46, q2: 22, q3: 7, trend: "slowing", note: "Still her #1 space but tapering as academic interests emerge" },
  { act: "Governance", q1: 10, q2: 29, q3: 10, trend: "steady", note: "Sustained engagement — reflection journals, resource committee, sakha meetings" },
  { act: "Cooking", q1: 6, q2: 8, q3: 5, trend: "steady", note: "Consistent participation. Now handling knife work independently." },
  { act: "Reading & Writing", q1: 19, q2: 6, q3: 1, trend: "slowing", note: "High initial interest but observations dropped. She expressed wanting Bob Books — possible gap between desire and facilitation." },
  { act: "Dance & Performance", q1: 4, q2: 13, q3: 0, trend: "seasonal", note: "Peaked around Janmashtami/learning mela. Naturally event-driven." },
  { act: "Math & Numbers", q1: 16, q2: 0, q3: 1, trend: "slowing", note: "Deepika is her math facilitator but only has 5 observations total. Coverage gap." },
  { act: "Science", q1: 10, q2: 2, q3: 0, trend: "slowing", note: "Loved experiments with Antara in Q1 — magnets, electricity, plant breathing. Dropped off when Antara's involvement decreased." },
  { act: "Physical Play", q1: 24, q2: 9, q3: 3, trend: "slowing", note: "Still active but less documented. Learned cycle, does morning park walks." },
  { act: "Social Bonding", q1: 24, q2: 6, q3: 5, trend: "slowing", note: "Less documented, not necessarily less happening. She's more settled socially." },
  { act: "Self-Organization", q1: 12, q2: 2, q3: 4, trend: "steady", note: "Outstation list-making was a breakthrough moment. Continuing with reflection journals." },
];

const peerData = [
  { name: "Myra", count: 6, contexts: "Reading & writing, social bonding, music", relationship: "Best friend, creative partner. Teaching dance, co-organizing performances." },
  { name: "Antara", count: 4, contexts: "Science, reading & writing, materials", relationship: "Facilitator-mentor. Key driver of science curiosity and calligraphy." },
  { name: "Deepika", count: 4, contexts: "Math & numbers", relationship: "Math facilitator. Only person doing math work with Venbha." },
  { name: "Keerthi", count: 3, contexts: "Art & craft", relationship: "Craft partner — origami, paper bags, bracelets." },
  { name: "Aadya", count: 2, contexts: "Social bonding, projects", relationship: "Close friend. One-on-one project planning together." },
  { name: "Tanmay", count: 1, contexts: "Governance, reading", relationship: "Repaired friendship. Now helps Venbha with spelling." },
  { name: "Vaagai", count: 1, contexts: "Governance, reading", relationship: "Helped Venbha write resource lists by spelling out text." },
];

const bridgeData = [
  { act: "Art & Craft", total: 158, cats: 5, breakdown: { Learning: 51, Skills: 41, Self: 28, Relationships: 23, Community: 15 }, insight: "Most integrative activity — spans all 5 categories. Not 'just arts.' This is where Learning, Skills, Self, Relationships, and Community converge." },
  { act: "Governance", total: 121, cats: 5, breakdown: { Self: 32, Learning: 29, Community: 26, Skills: 23, Relationships: 11 }, insight: "Second most integrative. Sakha meetings + closing circles + reflection journals are working as a whole-child engagement tool." },
  { act: "Cooking", total: 43, cats: 5, breakdown: { Relationships: 14, Learning: 11, Self: 10, Skills: 7, Community: 1 }, insight: "Cooking is primarily a relationship-builder for Venbha, not just a skill." },
  { act: "Science", total: 21, cats: 5, breakdown: { Learning: 11, Skills: 4, Self: 3, Relationships: 2, Community: 1 }, insight: "Spans all 5 categories but volume is low. High engagement when available, but opportunities are scarce." },
  { act: "Math & Numbers", total: 32, cats: 4, breakdown: { Learning: 16, Skills: 6, Self: 6, Relationships: 4 }, insight: "Doesn't yet bridge to Community. Mostly individual work. Dice-based group math is a recent bridge." },
];

const observerLens = [
  { name: "Mayuri Rai", count: 136, avgWords: 8, topSees: ["Art & Craft", "Music", "Governance", "Social Bonding", "Physical Play"], blind: ["Math & Numbers", "Science", "Reading & Writing"], catShape: { L: 87, Sk: 54, Se: 47, R: 44, C: 30 } },
  { name: "Nilima", count: 130, avgWords: 8, topSees: ["Governance", "Art & Craft", "Social Bonding", "Physical Play", "Outdoor"], blind: ["Math & Numbers", "Science"], catShape: { L: 85, Sk: 68, Se: 89, R: 71, C: 25 } },
  { name: "Deepika", count: 5, avgWords: 19, topSees: ["Math & Numbers", "Reading & Writing"], blind: [], catShape: { L: 5, Sk: 0, Se: 0, R: 0, C: 0 } },
  { name: "Rashmi Majhi", count: 6, avgWords: 15, topSees: ["Art & Craft", "Music", "Governance"], blind: [], catShape: { L: 6, Sk: 2, Se: 2, R: 1, C: 0 } },
  { name: "Keerthi", count: 7, avgWords: 8, topSees: ["Art & Craft", "Physical Play", "Cooking"], blind: [], catShape: { L: 4, Sk: 4, Se: 3, R: 1, C: 2 } },
];

const depthData = [
  { year: "2023-24", total: 117, avgWords: 24, deep: 32, thin: 24, voice: 0 },
  { year: "2024-25", total: 154, avgWords: 15, deep: 12, thin: 55, voice: 4 },
  { year: "2025-26", total: 296, avgWords: 9, deep: 16, thin: 176, voice: 6 },
];

const actionItems = [
  {
    type: "insight",
    title: "Reading & Writing: Desire ≠ Access",
    detail: "Venbha expressed wanting to read Bob Books and learn writing (her own words, S2 review). But reading/writing observations dropped from 19 in Q1 to 1 in Q3. The desire is there — the facilitation environment may not be meeting it. Deepika is the only facilitator documenting academic work, and she has only 5 total observations this year.",
    metric: "Q1: 19 → Q2: 6 → Q3: 1",
    metricLabel: "Reading & writing observations",
  },
  {
    type: "insight",
    title: "Science: Antara Is the Catalyst",
    detail: "All 10 of Venbha's Q1 science observations involve Antara — magnets, electricity, plant breathing. When Antara's involvement decreased, science observations went to zero. This isn't declining interest; it's a facilitator-dependency. Venbha told facilitators she wants to do a soap-making project and 'make a story about the magnet experiment.'",
    metric: "10 → 2 → 0",
    metricLabel: "Science observations by quarter",
  },
  {
    type: "insight",
    title: "Math Is a 1-Person Pipeline",
    detail: "Deepika is the only facilitator who documents math work. She has 5 observations all year — but they're the most detailed (avg 19 words vs 8 words school-wide). Venbha is doing two-digit addition and learning through dice. If Deepika isn't available, there's no math documentation at all.",
    metric: "1 facilitator / 5 observations / 19 avg words",
    metricLabel: "Math facilitation concentration",
  },
  {
    type: "insight",
    title: "Her Voice Is Barely Captured",
    detail: "Across 565 observations over 3 years, only 10 capture Venbha's own words. For a school built on self-ownership, the observation record is almost entirely adult-narrated. The richest insights come from the few times her voice appears: 'I want to read Bob Books,' her outstation packing list, 'I'll help poor people like Myra.' More of this, systematically.",
    metric: "10 out of 565",
    metricLabel: "Observations with her own words",
  },
  {
    type: "insight",
    title: "Observation Volume ↑ but Depth ↓",
    detail: "Observations went from 117 (2023-24) to 296 (2025-26) — 2.5× increase. But average word count dropped from 24 to 9 words, and 60% of 2025-26 entries are ≤5 words ('Lunch time', 'Closing time', 'Play time'). More photos, less context. A 'Coloring' observation with a photo is evidence; with 2 sentences of context, it's an insight.",
    metric: "24 → 15 → 9",
    metricLabel: "Avg words per observation by year",
  },
  {
    type: "pattern",
    title: "Art & Craft Is Her Integration Space",
    detail: "Art isn't just a hobby — it's the activity that bridges all 5 categories more than any other (158 observations across Learning, Skills, Self, Relationships, Community). When she makes bracelets, she's learning (technique), building skills (fine motor), expressing self (design choices), relating (making for friends), and contributing to community (stall sales). This is her 'whole child' space.",
    metric: "158 obs / 5 categories bridged",
    metricLabel: "Most integrative activity",
  },
  {
    type: "pattern",
    title: "Governance Is Her Second Core",
    detail: "Sakha meetings, closing circles, reflection journals, resource committee — these aren't 'administrative tasks' she participates in. They're her second-most integrative activity (121 observations, all 5 categories). She 'never refuses closing chores.' She writes resource lists. This is self-ownership in action.",
    metric: "121 obs / 5 categories bridged",
    metricLabel: "Second most integrative activity",
  },
  {
    type: "opportunity",
    title: "Peer Learning Is Underutilized",
    detail: "Myra teaches her dance. Tanmay and Vaagai spell words for her. Deepika does math. But these are ad-hoc. Her peer network shows clear learning relationships that could be made more visible. When Myra 'was not ready to read out the text,' Tanmay and Vaagai stepped in — that's an organic peer learning moment that could be nurtured.",
    metric: "6 peers mentioned in learning contexts",
    metricLabel: "Active peer learning relationships",
  },
];

// ──── COMPONENTS ────

function H2({ children, desc }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: desc ? 4 : 0 }}>{children}</h2>
      {desc && <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.6 }}>{desc}</p>}
    </div>
  );
}

function BubbleChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  const sorted = [...data].sort((a, b) => b.value - a.value);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "20px 0" }}>
      {sorted.map((d, i) => {
        const size = Math.max(36, (d.value / max) * 100);
        const fontSize = size > 60 ? 11 : size > 45 ? 10 : 9;
        return (
          <div key={i} style={{
            width: size, height: size, borderRadius: "50%", background: d.color + "18",
            border: `2px solid ${d.color}`, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", cursor: "default",
            transition: "transform 0.2s", position: "relative",
          }}
          title={`${d.label}: ${d.total} observations`}
          >
            <div style={{ fontSize: size > 50 ? 16 : 13, fontWeight: 700, color: d.color, fontFamily: "Georgia, serif" }}>{d.total}</div>
            {size > 50 && <div style={{ fontSize, color: C.sec, textAlign: "center", lineHeight: 1.1, padding: "0 4px", maxWidth: size - 8 }}>{d.label}</div>}
          </div>
        );
      })}
    </div>
  );
}

function BubbleLegend({ data }) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", justifyContent: "center", marginTop: 8 }}>
      {sorted.filter(d => d.value <= 50).map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.sec }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
          {d.label}
        </div>
      ))}
    </div>
  );
}

function VelocityRow({ v }) {
  const max = Math.max(v.q1, v.q2, v.q3, 1);
  const trendColor = v.trend === "slowing" ? C.amber : v.trend === "accelerating" ? C.green : v.trend === "seasonal" ? C.purple : C.blue;
  const trendIcon = v.trend === "slowing" ? "↘" : v.trend === "accelerating" ? "↗" : v.trend === "seasonal" ? "⟳" : "→";
  return (
    <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{v.act}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: trendColor, background: trendColor + "14", padding: "2px 10px", borderRadius: 10 }}>
          {trendIcon} {v.trend}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 32, marginBottom: 6 }}>
        {[{ label: "Q1", val: v.q1 }, { label: "Q2", val: v.q2 }, { label: "Q3", val: v.q3 }].map((q, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: C.muted }}>{q.val}</div>
            <div style={{ width: "100%", height: Math.max(2, (q.val / max) * 28), background: i === 2 ? trendColor : C.borderLight, borderRadius: 2 }} />
            <div style={{ fontSize: 9, color: C.muted }}>{q.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5 }}>{v.note}</div>
    </div>
  );
}

function PeerBubble({ peer }) {
  const size = Math.max(50, peer.count * 16);
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: size, height: size, borderRadius: "50%", background: C.blue + "12",
          border: `2px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700, color: C.blue, fontFamily: "Georgia, serif", flexShrink: 0,
        }}>{peer.count}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{peer.name}</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{peer.contexts}</div>
          <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5 }}>{peer.relationship}</div>
        </div>
      </div>
    </div>
  );
}

function BridgeCard({ b }) {
  const maxVal = Math.max(...Object.values(b.breakdown));
  const catColors = { Learning: C.blue, Skills: C.amber, Self: C.purple, Relationships: C.red, Community: C.green };
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{b.act}</span>
          <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{b.total} observations</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.green, background: C.green + "14", padding: "2px 10px", borderRadius: 10 }}>
          bridges {b.cats} categories
        </span>
      </div>
      <div style={{ display: "flex", gap: 4, height: 24, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
        {Object.entries(b.breakdown).map(([cat, val], i) => (
          <div key={i} style={{ flex: val, background: catColors[cat] || C.muted, minWidth: val > 0 ? 2 : 0 }}
            title={`${cat}: ${val}`} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        {Object.entries(b.breakdown).map(([cat, val]) => (
          <div key={cat} style={{ fontSize: 11, color: C.sec, display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: catColors[cat] }} />
            {cat}: {val}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5, fontStyle: "italic" }}>{b.insight}</div>
    </div>
  );
}

function ObserverCard({ o }) {
  const catMax = Math.max(o.catShape.L, o.catShape.Sk, o.catShape.Se, o.catShape.R, o.catShape.C, 1);
  const cats = [
    { label: "L", val: o.catShape.L, color: C.blue },
    { label: "Sk", val: o.catShape.Sk, color: C.amber },
    { label: "Se", val: o.catShape.Se, color: C.purple },
    { label: "R", val: o.catShape.R, color: C.red },
    { label: "C", val: o.catShape.C, color: C.green },
  ];
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{o.name}</div>
          <div style={{ fontSize: 11, color: C.muted }}>{o.count} observations · avg {o.avgWords} words</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 3, height: 28, alignItems: "flex-end", marginBottom: 8 }}>
        {cats.map((c, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: C.muted }}>{c.val}</div>
            <div style={{ width: "100%", height: Math.max(2, (c.val / catMax) * 24), background: c.color, borderRadius: 2 }} />
            <div style={{ fontSize: 9, color: C.muted }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: C.sec }}>Sees: </span>
        <span style={{ color: C.text, fontWeight: 500 }}>{o.topSees.join(", ")}</span>
      </div>
      {o.blind.length > 0 && (
        <div style={{ fontSize: 12 }}>
          <span style={{ color: C.amber }}>Doesn't capture: </span>
          <span style={{ color: C.amber, fontWeight: 500 }}>{o.blind.join(", ")}</span>
        </div>
      )}
    </div>
  );
}

function ActionCard({ a }) {
  const typeColors = { insight: C.blue, pattern: C.green, opportunity: C.purple };
  const c = typeColors[a.type];
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: c, background: c + "14", padding: "2px 10px", borderRadius: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>{a.type}</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{a.title}</span>
        </div>
        <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.7, marginBottom: 12 }}>{a.detail}</div>
        <div style={{ background: C.bg, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", color: c }}>{a.metric}</div>
          <div style={{ fontSize: 11, color: C.muted, textAlign: "right", maxWidth: 160 }}>{a.metricLabel}</div>
        </div>
      </div>
    </div>
  );
}

function DepthChart() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Observation Quality Over Time</div>
      {depthData.map((d, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span style={{ fontWeight: 600 }}>{d.year}</span>
            <span style={{ color: C.muted }}>{d.total} total</span>
          </div>
          <div style={{ display: "flex", height: 16, borderRadius: 3, overflow: "hidden", gap: 1 }}>
            <div style={{ flex: d.deep, background: C.green }} title={`Detailed (>30 words): ${d.deep}`} />
            <div style={{ flex: d.total - d.deep - d.thin, background: C.blue }} title={`Moderate: ${d.total - d.deep - d.thin}`} />
            <div style={{ flex: d.thin, background: C.borderLight }} title={`Thin (≤5 words): ${d.thin}`} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginTop: 3 }}>
            <span>Avg {d.avgWords} words</span>
            <span>{d.voice} with her voice</span>
            <span>{d.thin} thin entries ({Math.round(d.thin/d.total*100)}%)</span>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.green }} />Detailed (&gt;30w)</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.blue }} />Moderate</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.borderLight }} />Thin (≤5w)</div>
      </div>
    </div>
  );
}

// ──── MAIN ────
export function DeepInsights() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: C.bg, color: C.text }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 80px" }}>

        <div style={{ position: "sticky", top: 119, zIndex: 9, background: "#FAFAF8", paddingTop: 8, paddingBottom: 8, marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ display: "flex", gap: 3, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 3, overflowX: "auto" }}>
            {tabs.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} style={{
                flex: "0 0 auto", padding: "9px 14px", border: "none", borderRadius: 8, cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap",
                background: tab === i ? C.text : "transparent",
                color: tab === i ? "#fff" : C.sec,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* TAB 0: Exploration Map */}
        {tab === 0 && (
          <>
            <div style={{ marginBottom: 40 }}>
              <H2 desc="Each bubble is an activity type. Size = number of observations across 3 years. This is the shape of her curiosity.">
                Exploration Bubble Map
              </H2>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
                <BubbleChart data={radarData} />
                <BubbleLegend data={radarData} />
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <H2 desc="Activities that span the most developmental categories are the richest experiences. These are her integration spaces — where multiple dimensions of growth converge in a single activity.">
                Category Bridge Map
              </H2>
              {bridgeData.map((b, i) => <BridgeCard key={i} b={b} />)}
            </div>
          </>
        )}

        {/* TAB 1: Velocity */}
        {tab === 1 && (
          <>
            <div style={{ marginBottom: 40 }}>
              <H2 desc="How each interest area is trending across the year. Q1 = Jun–Aug, Q2 = Sep–Nov, Q3 = Jan–Mar. 'Slowing' doesn't mean declining interest — it might mean less documentation, facilitator availability, or natural seasonal patterns.">
                Interest Velocity
              </H2>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                {velocityData.map((v, i) => <VelocityRow key={i} v={v} />)}
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <DepthChart />
            </div>
          </>
        )}

        {/* TAB 2: Connections */}
        {tab === 2 && (
          <>
            <div style={{ marginBottom: 40 }}>
              <H2 desc="Who Venbha is mentioned alongside in observations, and in what context. This reveals her learning relationships — not just friendships.">
                Peer Learning Network
              </H2>
              {peerData.map((p, i) => <PeerBubble key={i} peer={p} />)}
            </div>
          </>
        )}

        {/* TAB 3: Blind Spots */}
        {tab === 3 && (
          <>
            <div style={{ marginBottom: 40 }}>
              <H2 desc="Each facilitator has a natural lens — activities and categories they notice more. This isn't a flaw; it's useful information. But it means no single observer gives the full picture.">
                Observer Lens Analysis
              </H2>
              {observerLens.map((o, i) => <ObserverCard key={i} o={o} />)}
              <div style={{ background: "#FFFBEB", border: `1px solid #FDE68A`, borderRadius: 10, padding: 14, marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#92400E", marginBottom: 4 }}>The Structural Blind Spot</div>
                <div style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>
                  Mayuri and Nilima account for 91% of observations but neither consistently captures Math, Science, or Reading/Writing. 
                  Deepika — the only math documenter — has 5 total entries. This means 91% of the observation record has a systematic gap 
                  in academic exploration documentation. The child may be doing this work; it's just not being seen.
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: Actions */}
        {tab === 4 && (
          <>
            <div style={{ marginBottom: 40 }}>
              <H2 desc="Patterns the data reveals — not assessments of the child, but insights about the system around her. Framed as what's visible, what's missing, and what could be made more available.">
                What the Data Shows
              </H2>
              {actionItems.map((a, i) => <ActionCard key={i} a={a} />)}
            </div>
          </>
        )}

        <div style={{ marginTop: 40, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted }}>
          Analyzed from all 12 sheets · 565 observations · 3 academic years · 8 observers
        </div>
      </div>
    </div>
  );
}
