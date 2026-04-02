'use client'
// @ts-nocheck
import { useState } from "react";

const COLORS = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  border: "#E8E6E1",
  borderLight: "#F0EEE9",
  text: "#1A1A18",
  textSec: "#6B6960",
  textMuted: "#9B9890",
  learning: "#2563EB",
  skills: "#D97706",
  self: "#7C3AED",
  relationships: "#DC2626",
  community: "#059669",
  learningBg: "#EFF6FF",
  skillsBg: "#FFFBEB",
  selfBg: "#F5F3FF",
  relationshipsBg: "#FEF2F2",
  communityBg: "#ECFDF5",
  green: "#16A34A",
  greenBg: "#F0FDF4",
  amber: "#D97706",
  amberBg: "#FFFBEB",
};

const tabs = ["Parent Report", "AI Pipeline"];

// ──────── DATA ────────
const yearlyObs = [
  { year: "2023-24", count: 117 },
  { year: "2024-25", count: 154 },
  { year: "2025-26", count: 294 },
];

const monthlyData = [
  { m: "Jun 25", total: 41, L: 21, Sk: 18, Se: 4, R: 9, C: 2 },
  { m: "Jul 25", total: 77, L: 45, Sk: 28, Se: 25, R: 26, C: 10 },
  { m: "Aug 25", total: 35, L: 22, Sk: 13, Se: 12, R: 20, C: 5 },
  { m: "Sep 25", total: 49, L: 36, Sk: 19, Se: 23, R: 28, C: 10 },
  { m: "Oct 25", total: 17, L: 10, Sk: 10, Se: 13, R: 8, C: 2 },
  { m: "Nov 25", total: 35, L: 26, Sk: 24, Se: 32, R: 4, C: 22 },
  { m: "Jan 26", total: 22, L: 11, Sk: 7, Se: 18, R: 11, C: 7 },
  { m: "Feb 26", total: 17, L: 16, Sk: 10, Se: 15, R: 12, C: 1 },
];

const growthTimeline = [
  {
    period: "2023-24 · Entry Year",
    theme: "Settling In",
    items: [
      "Began with limited vocabulary — 'used to say only yes and no'",
      "Learned Jana Gana Mana, ABCs on her own — told parents 'I learnt it from school'",
      "Friends were mostly older children (Mukundhan's friends from infancy)",
      "Enjoyed role-play, painting, and the Extempore speaking game",
      "Parents' concern: wanted same Sakha group to continue — she was just settling in",
    ],
  },
  {
    period: "2024-25 · Building Foundations",
    theme: "Confidence & Academics Emerge",
    items: [
      "Started writing numbers 1-20 with 'full josh', progressing to before/after numbers",
      "Began doing worksheets independently — tracing letters, filling vowels, shapes",
      "Physical improvement noted — lost weight, more confident in climbing (Cubbon Park boulder)",
      "Conflict with Tanmay arose but she took initiative to repair the friendship",
      "Parents said: 'We don't have any concerns' — a significant shift from previous year",
    ],
  },
  {
    period: "2025-26 S1 · Independence",
    theme: "Self-Direction Takes Hold",
    items: [
      "Father: 'She is more independent after the outstation trip. Strong with her decision.'",
      "Made her own packing list from memory for outstation — took 45 mins but finished it",
      "Cleaned up from the beach on her own during outstation trip",
      "'No complaints about any friends this semester' — social concerns resolved",
      "'She has given herself time off from friends' — healthy self-regulation",
    ],
  },
  {
    period: "2025-26 S2 · Current",
    theme: "Academic Interest Deepens",
    items: [
      "Expressed wanting to study, learn writing, read Bob Books",
      "Learning math with dice, single-digit to two-digit addition",
      "Doing calligraphy with Antara, completing vowel worksheets",
      "Leading in resource committee work — writing lists, contributing to group decisions",
      "Learning dance, learned to ride a cycle — expanding physical skills",
    ],
  },
];

const interests = [
  { name: "Art & Craft", count: 59, pct: 20, desc: "Bracelets, masks, origami, painting, jewelry, dream catchers, paper crafts", color: COLORS.skills },
  { name: "Social Play", count: 51, pct: 17, desc: "Group games, role-play, pretend play, outdoor games with peers", color: COLORS.relationships },
  { name: "Dance & Music", count: 46, pct: 16, desc: "Janmashtami performance, freestyle dance, learning mela presentations", color: COLORS.self },
  { name: "Self-regulation", count: 43, pct: 15, desc: "Reflection journals, closing chores (never refuses), independent planning", color: COLORS.community },
  { name: "Cooking", count: 30, pct: 10, desc: "Bhelpuri, lemonade, chocolate making, coconut grating, Goan Patolyo", color: COLORS.learning },
  { name: "Outdoor & Nature", count: 26, pct: 9, desc: "Nature walks, bird identification with Merlin app, farm exploration", color: "#0D9488" },
];

const strengths = [
  { title: "Patient & Focused", detail: "Can focus on detailed work — cutting, threading, drawing shapes — without getting distracted. Multiple facilitators note her patience." },
  { title: "Responsible & Reliable", detail: "Never refuses closing chores. Volunteered to clean sand tracked in by another student. Active in resource committee." },
  { title: "Creative Expression", detail: "Art corner is her anchor space. Consistently produces craft work — bracelets, masks, robotic hands, paper bags, origami lilies." },
  { title: "Social Initiator", detail: "Took initiative to repair friendship with Tanmay. Planned and invited people to dance performance. Hugged Aadya after 10-day absence." },
  { title: "Growing Independence", detail: "Made her own outstation packing list. Expressed wanting to learn writing. Started doing worksheets without prompting." },
];

const growthAreas = [
  { title: "Reading & Writing", detail: "Can match pictures to words but needs help reading them. Copies words but not yet reading independently. Bob Books is her stated goal.", priority: "active" },
  { title: "Math Beyond Basics", detail: "Comfortable with counting and single-digit addition. Two-digit numbers are new territory. Number writing sometimes reversed.", priority: "active" },
  { title: "Opening Circle Attendance", detail: "28% attendance in opening circle vs 62% daily attendance. There's a pattern of arriving after the structured start.", priority: "watch" },
  { title: "Peer Comparison Anxiety", detail: "Earlier noted as 'conscious of her work compared to Myra' — though this has improved, worth monitoring as academic work increases.", priority: "watch" },
];

// ──────── PIPELINE SECTION DATA ────────
const pipelineSteps = [
  {
    step: "1",
    title: "Data Standardization Layer",
    desc: "Transform 60 semi-structured spreadsheets into a unified schema",
    details: [
      "Parse all date formats (3+ variants) into ISO 8601",
      "Split space-separated category tags into boolean columns",
      "Normalize observer names (\"Mayuri\" → \"Mayuri Rai\")",
      "Extract child_id from filename, inject into every row",
      "Validate: flag rows with no category, no date, <10 word observations",
    ],
    tech: "Python · pandas · openpyxl · scheduled via cron or Apps Script trigger",
  },
  {
    step: "2",
    title: "Consolidation & Master Table",
    desc: "Merge all 60 student files into queryable tables",
    details: [
      "observations_master: ~17,000 rows (294 avg × 60 students)",
      "semester_reviews_master: ~480 rows (8 reviews × 60)",
      "goals_master: ~360 rows (6 goals avg × 60)",
      "children_master: 60 rows — reference table with sakha, homeroom, parents",
    ],
    tech: "PostgreSQL or BigQuery · or Google Sheets + Apps Script for low-code",
  },
  {
    step: "3",
    title: "AI Analysis Layer",
    desc: "LLM processes raw observations into structured insights",
    details: [
      "Theme extraction: Cluster observations into interest areas (art, science, math, social...)",
      "Growth indicator detection: Find 'able to', 'first time', 'independently' patterns",
      "Cross-year progression: Compare same category across semesters for trajectory",
      "Sentiment + developmental stage: Map observations to developmental milestones",
      "Anomaly detection: Flag sudden drops in observation frequency or category gaps",
    ],
    tech: "Claude API (Sonnet for bulk, Opus for synthesis) · batch processing · structured output",
  },
  {
    step: "4",
    title: "Report Generation",
    desc: "Generate parent-facing reports per child per semester",
    details: [
      "Narrative summary: 3-year developmental story in parent-friendly language",
      "Interest profile: Top 5 interests with evidence count and examples",
      "Strengths & growth areas: AI-identified patterns with specific observation citations",
      "Goal tracking: Map semester goals against actual observation evidence",
      "Facilitator insights: Synthesize semester review comments into actionable takeaways",
    ],
    tech: "Claude API · templated HTML/PDF output · ReportLab or Puppeteer for PDF",
  },
];

const promptTemplate = `You are analyzing observation records for a child at BeMe, 
a self-directed learning school. You have access to:

1. OBSERVATIONS: Daily logs with date, observer, description, 
   media URL, and categories (Learning, Skills, Self, 
   Relationships, Community)
2. SEMESTER_REVIEWS: Parent-facilitator meeting notes
3. GOALS: Child's self-set goals for the semester
4. CHILD_PROFILE: Name, age, sakha group, enrollment date

Generate a parent report with these sections:

<report_sections>
  <developmental_narrative>
    3-paragraph story of the child's journey this semester.
    Reference specific observations by date. 
    Warm tone, celebrating growth.
  </developmental_narrative>
  
  <interest_profile>
    Top 5 interests ranked by observation frequency.
    Each with: name, count, trend (↑ growing / → stable / 
    ↓ declining), and 2-3 specific examples from observations.
  </interest_profile>
  
  <strengths count="5">
    Patterns of capability. Each with title, evidence 
    (cite 2-3 specific observations), and developmental 
    significance.
  </strengths>
  
  <growth_areas count="3">
    Not "weaknesses" — areas where the child is actively 
    developing. Each with: current state, trajectory, 
    and suggested home support activities.
  </growth_areas>
  
  <goal_alignment>
    Map the child's self-set goals against observation 
    evidence. For each goal: status (active/achieved/
    not_started), supporting observations, suggested 
    next steps.
  </goal_alignment>
  
  <facilitator_synthesis>
    Key themes from semester review meetings. 
    What facilitators and parents agreed on. 
    Action items for next semester.
  </facilitator_synthesis>
</report_sections>

Rules:
- Never use clinical/assessment language
- Frame everything as celebration + growth, not deficit
- Cite specific dates and observations as evidence
- Include the child's own voice where captured
- Keep parent-friendly — no education jargon`;

// ──────── COMPONENTS ────────
function StatCard({ label, value, detail }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 2, fontFamily: "Georgia, serif" }}>{value}</div>
      {detail && <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 2 }}>{detail}</div>}
    </div>
  );
}

function CategoryBar({ data }) {
  const max = Math.max(...monthlyData.map((d) => d.total));
  const w = (data.total / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 48, fontSize: 12, fontWeight: 600, color: COLORS.text, fontFamily: "monospace" }}>{data.m}</div>
      <div style={{ flex: 1, display: "flex", height: 20, borderRadius: 4, overflow: "hidden", gap: 1, maxWidth: `${w}%` }}>
        {[
          { val: data.L, color: COLORS.learning },
          { val: data.Sk, color: COLORS.skills },
          { val: data.Se, color: COLORS.self },
          { val: data.R, color: COLORS.relationships },
          { val: data.C, color: COLORS.community },
        ].map((s, i) =>
          s.val > 0 ? <div key={i} style={{ flex: s.val, background: s.color, minWidth: 2 }} /> : null
        )}
      </div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "monospace", width: 24, textAlign: "right" }}>{data.total}</div>
    </div>
  );
}

function TimelineCard({ item, idx }) {
  const colors = [COLORS.learning, COLORS.skills, COLORS.self, COLORS.community];
  const c = colors[idx % colors.length];
  return (
    <div style={{ borderLeft: `3px solid ${c}`, paddingLeft: 20, marginBottom: 28, position: "relative" }}>
      <div style={{ position: "absolute", left: -7, top: 4, width: 11, height: 11, borderRadius: "50%", background: c }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: c, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.period}</div>
      <div style={{ fontSize: 17, fontWeight: 700, margin: "4px 0 8px", fontFamily: "Georgia, serif" }}>{item.theme}</div>
      {item.items.map((it, j) => (
        <div key={j} style={{ fontSize: 13, color: COLORS.textSec, lineHeight: 1.6, marginBottom: 4, paddingLeft: 12, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: COLORS.textMuted }}>·</span>
          {it}
        </div>
      ))}
    </div>
  );
}

function InterestBar({ item, maxCount }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: COLORS.textMuted }}>{item.count} obs</span>
      </div>
      <div style={{ height: 8, background: COLORS.borderLight, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(item.count / maxCount) * 100}%`, background: item.color, borderRadius: 4 }} />
      </div>
      <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 4 }}>{item.desc}</div>
    </div>
  );
}

function InsightCard({ item, type }) {
  const isStrength = type === "strength";
  return (
    <div style={{
      background: isStrength ? COLORS.greenBg : COLORS.amberBg,
      border: `1px solid ${isStrength ? "#BBF7D0" : "#FDE68A"}`,
      borderRadius: 10,
      padding: 16,
      marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{isStrength ? "✦" : "↗"}</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</span>
        {item.priority && (
          <span style={{
            fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
            padding: "2px 8px", borderRadius: 4,
            background: item.priority === "active" ? "#DBEAFE" : "#F3F4F6",
            color: item.priority === "active" ? "#1E40AF" : "#6B7280",
          }}>{item.priority}</span>
        )}
      </div>
      <div style={{ fontSize: 13, color: COLORS.textSec, lineHeight: 1.6 }}>{item.detail}</div>
    </div>
  );
}

function PipelineStep({ item }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: COLORS.learning, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0,
        }}>{item.step}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: COLORS.textSec, marginBottom: 10 }}>{item.desc}</div>
          {item.details.map((d, i) => (
            <div key={i} style={{ fontSize: 13, color: COLORS.textSec, lineHeight: 1.6, marginBottom: 3, paddingLeft: 12, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: COLORS.textMuted }}>·</span>{d}
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 11, fontFamily: "monospace", color: COLORS.learning, background: COLORS.learningBg, padding: "4px 10px", borderRadius: 4, display: "inline-block" }}>
            {item.tech}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  const items = [
    { label: "Learning", color: COLORS.learning },
    { label: "Skills", color: COLORS.skills },
    { label: "Self", color: COLORS.self },
    { label: "Relationships", color: COLORS.relationships },
    { label: "Community", color: COLORS.community },
  ];
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16, fontSize: 12 }}>
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: it.color }} />
          <span style={{ color: COLORS.textSec, fontWeight: 500 }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title, desc }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 4 }}>{title}</h2>
      {desc && <p style={{ fontSize: 13, color: COLORS.textSec, lineHeight: 1.5, maxWidth: 640 }}>{desc}</p>}
    </div>
  );
}

// ──────── MAIN ────────
export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>
            BeMe Learning Journey · 2023–2026
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: 8 }}>
            Venbha's Developmental Report
          </h1>
          <p style={{ fontSize: 14, color: COLORS.textSec, lineHeight: 1.6 }}>
            Synthesized from 565 observations across 3 academic years, 5 semester reviews, and self-set goals. 
            Data collected by 8 facilitators across 5 developmental categories.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 4 }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} style={{
              flex: 1, padding: "10px 16px", border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 600, fontFamily: "inherit",
              background: activeTab === i ? COLORS.text : "transparent",
              color: activeTab === i ? "#fff" : COLORS.textSec,
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        {activeTab === 0 && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
              <StatCard label="Total Observations" value="565" detail="Across 3 academic years" />
              <StatCard label="Active Observers" value="8" detail="Facilitators documenting growth" />
              <StatCard label="Media Evidence" value="97%" detail="Photos & videos attached" />
            </div>

            {/* Growth Timeline */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="The 3-Year Journey" desc="How Venbha has evolved from a quiet, settling-in child to an independent, self-directed learner." />
              <div style={{ paddingLeft: 4 }}>
                {growthTimeline.map((item, i) => <TimelineCard key={i} item={item} idx={i} />)}
              </div>
            </div>

            {/* Monthly Heatmap */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="Monthly Activity (2025-26)" desc="Observation volume and category distribution by month." />
              <Legend />
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
                {monthlyData.map((d, i) => (
                  <div key={i} style={{ marginBottom: i < monthlyData.length - 1 ? 10 : 0 }}>
                    <CategoryBar data={d} />
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="Interest Profile" desc="What Venbha gravitates towards, ranked by how often it appears in observations." />
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
                {interests.map((it, i) => <InterestBar key={i} item={it} maxCount={59} />)}
              </div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="Strengths" desc="Patterns that emerge consistently across multiple observers and months." />
              {strengths.map((s, i) => <InsightCard key={i} item={s} type="strength" />)}
            </div>

            {/* Growth Areas */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="Growth Areas" desc="Not weaknesses — these are areas where Venbha is actively developing and could use support." />
              {growthAreas.map((g, i) => <InsightCard key={i} item={g} type="growth" />)}
            </div>

            {/* Goal Alignment */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="Goal Alignment" desc="Venbha's self-set goals mapped against actual observation evidence." />
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
                {[
                  { goal: "Spend time in arts room — cards, paintings, jewelry, crafts", status: "Achieved", evidence: "59 art/craft observations. Bracelets, masks, origami, paper bags, dream catchers, robotic hand.", statusColor: COLORS.green },
                  { goal: "Lego room — make something with Lego", status: "Active", evidence: "Connector blocks observed. Lego room engagement noted in September.", statusColor: COLORS.amber },
                  { goal: "Music Corner — sing with friends", status: "Active", evidence: "46 dance/music entries. Janmashtami performance, learning mela dance, freestyle.", statusColor: COLORS.amber },
                  { goal: "Language corner — will read", status: "In Progress", evidence: "Vowel worksheets completed. Bob Books identified as target. Needs help reading words but can match pictures.", statusColor: COLORS.amber },
                  { goal: "Learn cooking", status: "Achieved", evidence: "30 cooking observations. Bhelpuri, lemonade, chocolate making, coconut grating.", statusColor: COLORS.green },
                  { goal: "Cleaning araroom during community time", status: "Achieved", evidence: "Multiple observations of closing chores. 'She never refuses.' Active in resource committee.", statusColor: COLORS.green },
                ].map((g, i) => (
                  <div key={i} style={{ padding: "14px 18px", borderBottom: i < 5 ? `1px solid ${COLORS.borderLight}` : "none", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.statusColor, marginTop: 6, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{g.goal}</div>
                      <div style={{ fontSize: 12, color: COLORS.textSec, lineHeight: 1.5 }}>{g.evidence}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: g.statusColor, whiteSpace: "nowrap" }}>{g.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Voice */}
            <div style={{ marginBottom: 40 }}>
              <SectionHeader title="What Parents & Facilitators Said" desc="Key quotes from semester review meetings, showing consensus and progress." />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { speaker: "Father (S1 2025-26)", quote: "She is more independent after the outstation trip. She is strong with her decision. She will listen but will make up her mind and stick to it." },
                  { speaker: "Mother (S2 2024-25)", quote: "She lost the sleepover packing list, remembered and wrote it down, asked for spellings, took 45 mins but finished it and packed her stuff." },
                  { speaker: "Nilima (S1 2025-26)", quote: "She has given herself time off from friends — healthy self-regulation." },
                  { speaker: "Father (S2 2024-25)", quote: "Her gross motor skills have improved a lot. She is able to regulate herself." },
                  { speaker: "Parents (2023-24)", quote: "The best thing from this semester is that now she doesn't want early pickup and she is enjoying coming to BeMe." },
                  { speaker: "Venbha (S2 2025-26)", quote: "She expressed that she wanted to study and learn writing. Bob Books she wanted to read." },
                ].map((q, i) => (
                  <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic", marginBottom: 6 }}>"{q.quote}"</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>— {q.speaker}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Pipeline Architecture */}
            <div style={{ marginBottom: 32 }}>
              <SectionHeader
                title="AI Report Generation Pipeline"
                desc="Architecture for generating parent reports for 60 students from semi-structured observation spreadsheets. Four stages: standardize → consolidate → analyze → generate."
              />
              {pipelineSteps.map((s, i) => <PipelineStep key={i} item={s} />)}
            </div>

            {/* Data Sources Map */}
            <div style={{ marginBottom: 32 }}>
              <SectionHeader title="Data Sources Per Student" desc="What the AI ingests for each child to produce a complete report." />
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
                {[
                  { source: "Daily Observations", sheet: "Sheet1 / Obs 20XX-YY", rows: "~150-300/year", fields: "Date, Observer, Observation, URL, Categories", weight: "Primary signal" },
                  { source: "Semester Reviews", sheet: "Semester Review sheets (×4)", rows: "~10-15/review", fields: "Speaker, Comment, Context", weight: "Parent + facilitator voice" },
                  { source: "Goal Setting", sheet: "Sheet4", rows: "~6-8 goals", fields: "Goal area, Goal text", weight: "Child's own voice" },
                  { source: "Individual Plan", sheet: "Individual Plan 20XX-YY", rows: "15 question areas", fields: "Prompt questions, Observations, Attendance", weight: "Framework (mostly empty)" },
                  { source: "Historical Data", sheet: "Previous year sheets", rows: "Cumulative", fields: "Same as daily observations", weight: "Progression & trajectory" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 18px", borderBottom: i < 4 ? `1px solid ${COLORS.borderLight}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{s.source}</span>
                      <span style={{ fontSize: 11, fontFamily: "monospace", color: COLORS.learning, background: COLORS.learningBg, padding: "2px 8px", borderRadius: 4 }}>{s.weight}</span>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textSec }}>
                      {s.sheet} · {s.rows} · {s.fields}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Template */}
            <div style={{ marginBottom: 32 }}>
              <SectionHeader title="AI Prompt Template" desc="The system prompt that generates the parent report. This is the core of the pipeline — it defines what the AI looks for and how it frames findings." />
              <div style={{ background: "#1E1E1C", borderRadius: 10, padding: 20, overflow: "auto" }}>
                <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.7, color: "#D4D4C8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {promptTemplate}
                </pre>
              </div>
            </div>

            {/* Key Design Decisions */}
            <div style={{ marginBottom: 32 }}>
              <SectionHeader title="Key Design Decisions" desc="Trade-offs and recommendations for building this at scale." />
              {[
                { q: "Per-child files vs. single database?", a: "Keep per-child Google Sheets for facilitator input (they're already trained on it). Consolidate nightly into a master table for AI processing. Facilitators write, AI reads." },
                { q: "Which AI model for what?", a: "Sonnet for bulk extraction (theme tagging, keyword matching, date parsing) — fast and cheap at 60× scale. Opus for the final narrative synthesis per child — you want the best writing quality for parent-facing output." },
                { q: "How often to generate reports?", a: "Monthly snapshot (automated, lightweight — just stats and recent observations). Full developmental report once per semester (before review meetings). On-demand deep-dive if parents or facilitators request." },
                { q: "What about the 'General' category?", a: "Split it. Currently 'General' covers sakha meetings, lunch, dance electives, and outdoor time. These are either Community (meetings), Relationships (shared meals), or could be a 6th category: 'Daily Rhythms'." },
                { q: "How to handle the Individual Plan sheet?", a: "It's currently a question bank with zero data filled in. Either make it a living document that facilitators update weekly, or drop it and derive the same insights from daily observations via AI. The observation data already answers most of those questions." },
              ].map((d, i) => (
                <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{d.q}</div>
                  <div style={{ fontSize: 13, color: COLORS.textSec, lineHeight: 1.6 }}>{d.a}</div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.textMuted }}>
          Generated April 2026 · All 12 sheets analyzed · Source: BeMe_Observations_Venbha-P.xlsx
        </div>
      </div>
    </div>
  );
}
