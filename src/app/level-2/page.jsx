'use client'
// @ts-nocheck
import { useState } from "react";

const C = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1", borderLight: "#F0EEE9",
  text: "#1A1A18", sec: "#6B6960", muted: "#9B9890",
  learning: "#2563EB", skills: "#D97706", self: "#7C3AED",
  relationships: "#DC2626", community: "#059669",
  lBg: "#EFF6FF", skBg: "#FFFBEB", seBg: "#F5F3FF", rBg: "#FEF2F2", cBg: "#ECFDF5",
  warmBg: "#FFFBF0", warmBorder: "#F5E6CC",
};

const tabs = ["Venbha's Journey", "AI Pipeline", "Philosophy Alignment"];

// ──── REFRAMED DATA ────
const journeyChapters = [
  {
    period: "2023-24 · First Year",
    title: "Finding Her Place",
    color: C.learning,
    narrative: "Venbha arrived with limited vocabulary and a strong attachment to familiarity. She gravitated towards the art room, Keerthi's company, and the kitchen — her comfort anchors. Over the year she discovered the Extempore game (standing on a chair, pulling topic chits, and speaking about them 'very sincerely and earnestly'). Her role-play evolved from talking to dolls alone to pulling everyone around her into the story. By year-end, her parents' observation was simple but profound: 'She doesn't want early pickup anymore. She is enjoying coming to BeMe.'",
    childVoice: "I did colouring, book reading, drawing, playing. I made friends with Agniv, Gukkeish, Tanmay, Myra, Dhruv, Yedhu.",
    chosenExplorations: ["Extempore speaking game", "Art room — painting, mehndi", "Role-play & imaginative play", "Cooking (chocolate cake, pakodas, french fries)", "Outdoor exploration (Cubbon Park, Lalbagh)"],
  },
  {
    period: "2024-25 · Second Year",
    title: "Reaching for More",
    color: C.skills,
    narrative: "This was the year Venbha started choosing academic work — not because anyone told her to, but because she wanted to. She came to the math corner 'with full josh' and wrote numbers 1-20 neatly and small. She began tracing letters, filling in vowels, and asking for worksheets. Physically, she climbed the Cubbon Park boulder she'd been hesitant about. She navigated a conflict with Tanmay and took the initiative to repair that friendship herself. Her parents noted: 'We don't have any concerns.'",
    childVoice: "She asked, 'I don't have a bottle, so can I get one?' Before this, she never asked questions in public.",
    chosenExplorations: ["Number writing (1-20, then before/after numbers)", "Science experiments (air pressure, diffusion, sinking/floating)", "Craft projects (robotic hands, aprons, pillows, dream catchers)", "Dance performance planning with Myra", "Shop-keeping pretend play"],
  },
  {
    period: "2025-26 S1 · Third Year",
    title: "Owning Her Decisions",
    color: C.self,
    narrative: "The outstation trip was a turning point. Venbha made her own packing list from memory — it took 45 minutes, she asked for spellings, but she finished it. She cleaned up from the beach on her own. Her father's observation captures the shift: 'She is strong with her decision. She will listen but will make up her mind and stick to it.' For the first time, there were no social concerns — she'd learned to give herself space from friendships when she needed it.",
    childVoice: "She said, when she writes those things she needs to do independently, she will not forget.",
    chosenExplorations: ["Independent task planning", "Science experiments with Antara (magnets, electricity, plant breathing)", "Art corner (masks, bracelets, robotic hand — using scissors independently)", "Closing chores (volunteered, never refused)", "Bird identification with Merlin app"],
  },
  {
    period: "2025-26 S2 · Current",
    title: "Expressing What She Wants",
    color: C.community,
    narrative: "Venbha is now articulating her own learning desires. She told facilitators she wants to study, learn writing, and read Bob Books. She's doing math with dice, practicing calligraphy, and solving two-digit addition problems. She's active in the resource committee — writing lists, participating in governance discussions. She learned to ride a cycle. At the semester review, she presented her own assessments and work to the room.",
    childVoice: "She expressed that she wanted to study and learn writing. Bob Books she wanted to read.",
    chosenExplorations: ["Reading & writing (Bob Books, vowel worksheets, calligraphy)", "Math with dice, two-digit addition", "Resource committee governance work", "Dance — learned cycle", "Pottery, clay medallions, crochet"],
  },
];

const whatSheChose = [
  { name: "Art & Craft", count: 59, examples: "Bracelets, masks, origami lilies, paper bags, robotic hand, dream catchers, clay medallions, photo frames", color: C.skills },
  { name: "Social Play & Games", count: 51, examples: "Musical chairs, red-green light, guessing games, role-play (teacher-student, house-house), potlucks", color: C.relationships },
  { name: "Dance & Performance", count: 46, examples: "Janmashtami choreography, learning mela presentation, freestyle dance during closing, invited people to her performance", color: C.self },
  { name: "Responsibility & Reflection", count: 43, examples: "Closing chores (never refuses), reflection journals, resource committee, cleaning up after others", color: C.community },
  { name: "Cooking & Food", count: 30, examples: "Bhelpuri, lemonade, chocolate making, coconut grating, Patolyo, bhelpuri preparation (cutting veggies with knife)", color: C.learning },
  { name: "Outdoor & Nature", count: 26, examples: "Farm exploration, bird identification (Merlin app), nature walks, park visits, insect observation, collecting stones and leaves", color: "#0D9488" },
  { name: "Academic Exploration", count: 22, examples: "Vowel worksheets, number writing (1-20 → two-digit), Bob Books, calligraphy with Antara, spelling practice", color: C.learning },
  { name: "Science Experiments", count: 12, examples: "Magnets, plant breathing with magnifying glass, marble tunnels, electricity with Antara, diffusion, sinking/floating", color: "#6366F1" },
];

const facilitatorWindows = [
  { observer: "Mayuri Rai", insight: "Patiently drawing shapes. She is able to focus on her work without getting distracted from the surrounding.", date: "Jul 2025", what: "Self-directed focus" },
  { observer: "Nilima", insight: "Trying with thread to lift the paper. She is very interested in science experiment. She is very patience, cooperative, understanding and follow the instructions.", date: "Jul 2025", what: "Science curiosity" },
  { observer: "Mayuri Rai", insight: "Closing chores done. She never refuses for closing chores. Instead, the other day seen her cleaning the sand got by one of the other BeMeian from our homeroom.", date: "Jul 2025", what: "Community responsibility" },
  { observer: "Rashmi Majhi", insight: "She carefully chose different shapes, colours, and letter beads to create her own designs. She showed good focus and creativity while making them.", date: "Jul 2025", what: "Creative expression" },
  { observer: "Mayuri Rai", insight: "She was making a list of things she needs to do by herself during the outstation trip. She said, when she writes those things she needs to do independently, she will not forget.", date: "Jul 2025", what: "Self-organization" },
  { observer: "Antara", insight: "Myra was not ready to read out the text for Vemba. Then Tanmay and Vaagai came and helped Vemba to write by spelling out the text.", date: "Jan 2026", what: "Peer learning network" },
  { observer: "Deepika", insight: "Venbha practiced addition of single digit number to two digit numbers and happily solved many problems right.", date: "Aug 2025", what: "Chosen academic work" },
  { observer: "Nilima", insight: "She started playing with the dice and learning maths with the help of dice and along with the children. If she has done any mistake she will agree and she will not blame on others.", date: "S2 review", what: "Accountability" },
];

const goalAlignment = [
  { goal: "Spend time in arts room — cards, paintings, jewelry, crafts", status: "chose this consistently", evidence: "59 art/craft observations across the year. Her anchor space.", dot: C.community },
  { goal: "Lego room — make something with Lego", evidence: "Connector blocks and building observed. Lego room visits noted.", status: "explored", dot: C.skills },
  { goal: "Music Corner — sing with friends", evidence: "46 dance/music entries. Performed at Janmashtami and learning mela. Organized performances.", status: "chose this consistently", dot: C.community },
  { goal: "Language corner — will read", evidence: "Vowel worksheets, word matching, Bob Books identified as her goal. Calligraphy with Antara.", status: "actively exploring", dot: C.learning },
  { goal: "Learn cooking", evidence: "30 cooking observations. From grating coconut to cutting veggies with a knife to making chocolate.", status: "chose this consistently", dot: C.community },
  { goal: "Clean araroom during community time", evidence: "Closing chores, resource committee, volunteered to clean after others.", status: "chose this consistently", dot: C.community },
  { goal: "Running races, jumping games", evidence: "Zip line, tire swing, balancing challenges, wall sits, park play. Learned to ride a cycle.", status: "explored", dot: C.skills },
  { goal: "Project: Toy club", evidence: "Stall day — sold gulab jamun, said she'd use money to 'help poor people like Myra'.", status: "evolved into something new", dot: C.self },
];

const parentVoices = [
  { speaker: "Father, S1 2025-26", text: "She is more independent after the outstation trip. She is strong with her decision. She will listen but will make up her mind and stick to it." },
  { speaker: "Mother, S2 2024-25", text: "She lost the sleepover packing list, remembered and wrote it down, asked for spellings, took 45 mins but finished it and packed her stuff." },
  { speaker: "Father, S2 2024-25", text: "Her health has improved, more physical exercise, eating junk has stopped completely, she is more confident in doing physical activity." },
  { speaker: "Parents, 2023-24", text: "The best thing from this semester is that now she doesn't want early pickup and she is enjoying coming to BeMe. She talks with many children now. We feel that we have achieved what we wanted." },
  { speaker: "Mother, 2023-24", text: "She has learnt many new words. Earlier she used to say only yes and no. She identifies light and dark colours. She learned A-B-C-D-E-F on her own — told 'I learnt it from school.'" },
  { speaker: "Venbha, S2 2025-26", text: "She expressed that she wanted to study and learn writing. Bob Books she wanted to read." },
];

// ──── PIPELINE ────
const pipelineSteps = [
  {
    step: "1", title: "Standardize & Ingest",
    desc: "Transform 60 semi-structured spreadsheets into a unified schema. Handle 3+ date formats, normalize observer names, split freeform category tags into booleans, inject child_id.",
    tech: "Python · pandas · openpyxl · Google Apps Script",
  },
  {
    step: "2", title: "Consolidate into Master Tables",
    desc: "Merge all student files into 4 tables: observations_master (~17k rows), semester_reviews, goals, children_master. Cross-year data linked by child_id.",
    tech: "PostgreSQL / BigQuery / Google Sheets + Apps Script",
  },
  {
    step: "3", title: "AI Analysis (Philosophy-Aligned)",
    desc: "Claude processes observations using the BeMe-aligned prompt. No assessment, no benchmarking. Detects what the child chose, patterns of exploration, self-set goal alignment, and developmental arc.",
    tech: "Claude Sonnet (bulk extraction) → Claude Opus (narrative synthesis)",
  },
  {
    step: "4", title: "Report Generation",
    desc: "Generate parent-facing journey reports per child per semester. HTML → PDF. Each report structured as a celebration of the child's choices, not an evaluation of performance.",
    tech: "Claude API → HTML template → Puppeteer/ReportLab for PDF",
  },
];

const philosophyMistakes = [
  {
    wrong: '"Growth Areas" with priority labels',
    why: 'Implies deficiency. Labeling reading as "priority: active" is an external judgment about what the child should be doing.',
    fix: "Reframe as 'What she's currently exploring' — present the child's active edges without implying they should be further along.",
  },
  {
    wrong: '"Opening Circle Attendance: 28%" framed as a problem',
    why: "In a self-directed school, the child has agency over their time. Presenting attendance as a metric to improve is traditional-school thinking.",
    fix: "Include attendance as a factual data point (parents may want it), but don't frame it as a shortcoming. Present it neutrally: 'Venbha chose to join the opening circle on X% of days.'",
  },
  {
    wrong: '"Peer Comparison Anxiety — worth monitoring"',
    why: '"Monitoring" is surveillance language. "Worth monitoring" implies the facilitator is evaluating a risk, not supporting a child.',
    fix: "If it comes up in observations, present it as part of the story: 'Earlier in the year, Venbha was comparing her work to Myra's. Over the semester, she found her own rhythm.' Let the arc speak.",
  },
  {
    wrong: '"Strengths" vs "Growth Areas" binary',
    why: "This is an assessment framework (strengths-based assessment is still assessment). It categorizes the child's behaviors into good and needs-improvement buckets.",
    fix: "Replace with 'What she chose' and 'What facilitators noticed.' Center the child's agency, not the evaluator's judgment.",
  },
  {
    wrong: 'AI prompt saying "identify strengths and weaknesses"',
    why: "The AI will mirror whatever frame you give it. If you ask for weaknesses, it will find them — even in a thriving child.",
    fix: "The prompt must encode BeMe's values: 'What did this child choose to explore? What patterns do facilitators observe? What did the child express wanting? How did their choices evolve?'",
  },
];

const alignedPrompt = `You are generating a parent report for a child at BeMe, 
a democratic self-directed learning community.

CRITICAL PHILOSOPHY RULES:
- This is NOT an assessment. Never evaluate, grade, 
  rank, or benchmark the child.
- The child has FULL AGENCY over their time and learning 
  path. What they chose to do IS their learning.
- Frame everything around the child's CHOICES, not 
  external expectations.
- Use "she chose to..." / "she gravitated towards..." / 
  "she expressed wanting..." — never "she needs to..." / 
  "she should..." / "an area for improvement..."
- Adults are facilitators, not instructors. Their 
  observations are windows, not evaluations.
- If data shows the child did less of something, don't 
  frame it as a gap. The child chose differently.

DATA SOURCES:
1. OBSERVATIONS: Daily facilitator notes with categories 
   (Learning, Skills, Self, Relationships, Community)
2. SEMESTER_REVIEWS: Parent-facilitator-child meeting notes
3. GOALS: The child's OWN goals for the semester
4. HISTORICAL: Previous year observations for trajectory

REPORT STRUCTURE:

<journey_narrative>
  The child's story this semester, told as a narrative.
  What did they gravitate towards? What shifted from 
  last semester? What did they express wanting? 
  Center the child's voice where captured.
  ~3 paragraphs, warm and specific.
</journey_narrative>

<what_they_chose>
  Top interests ranked by observation frequency.
  Each with: name, count, specific examples from 
  observations. Frame as "what she chose to explore" 
  not "what she's good at."
</what_they_chose>

<facilitator_windows>
  6-8 specific observations that reveal something about 
  the child — moments of focus, creativity, kindness, 
  problem-solving, self-expression. These are "windows" 
  not "evidence of competency."
  Include observer name and date.
</facilitator_windows>

<their_own_goals>
  Map the child's self-set goals against observation 
  evidence. Did they pursue what they said they wanted?
  Status options: "chose this consistently" / "explored" / 
  "actively exploring" / "evolved into something new" / 
  "hasn't started yet"
  NEVER use "achieved" or "not achieved" — these are 
  journeys, not checkboxes.
</their_own_goals>

<voices>
  Key quotes from parents, facilitators, and the child 
  themselves from semester review meetings. 
  Preserve exact wording.
</voices>

<the_arc>
  If historical data is available, tell the multi-year 
  story. How have the child's choices, confidence, 
  relationships, and self-expression evolved? 
  This is the most valuable section for parents.
</the_arc>

WHAT TO NEVER INCLUDE:
- Comparisons to other children or age-level benchmarks
- Deficit language ("needs improvement", "struggles with")
- Attendance framed as compliance ("should attend more")
- Prescriptive recommendations ("parents should do X")
- Assessment terminology (rubrics, scores, levels, grades)
- "Well-rounded" framing (implying category balance is ideal)`;

// ──── COMPONENTS ────
function S({ children, style }) {
  return <div style={{ marginBottom: 40, ...style }}>{children}</div>;
}

function H2({ children, desc }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: desc ? 4 : 0 }}>{children}</h2>
      {desc && <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.6, maxWidth: 640 }}>{desc}</p>}
    </div>
  );
}

function ChapterCard({ ch, idx }) {
  return (
    <div style={{ borderLeft: `3px solid ${ch.color}`, paddingLeft: 20, marginBottom: 32, position: "relative" }}>
      <div style={{ position: "absolute", left: -7, top: 4, width: 11, height: 11, borderRadius: "50%", background: ch.color }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: ch.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ch.period}</div>
      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Georgia, serif", margin: "4px 0 10px" }}>{ch.title}</div>
      <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.7, marginBottom: 12 }}>{ch.narrative}</p>
      {ch.childVoice && (
        <div style={{ background: C.warmBg, border: `1px solid ${C.warmBorder}`, borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, fontStyle: "italic" }}>"{ch.childVoice}"</div>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginTop: 4 }}>— Venbha</div>
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 600, color: C.sec, marginBottom: 6 }}>What she chose to explore:</div>
      {ch.chosenExplorations.map((e, i) => (
        <div key={i} style={{ fontSize: 12, color: C.sec, lineHeight: 1.6, paddingLeft: 12, position: "relative", marginBottom: 2 }}>
          <span style={{ position: "absolute", left: 0, color: C.muted }}>·</span>{e}
        </div>
      ))}
    </div>
  );
}

function InterestRow({ item, maxCount }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: C.muted }}>{item.count} observations</span>
      </div>
      <div style={{ height: 6, background: C.borderLight, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
        <div style={{ height: "100%", width: `${(item.count / maxCount) * 100}%`, background: item.color, borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5 }}>{item.examples}</div>
    </div>
  );
}

function WindowCard({ w }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 8 }}>"{w.insight}"</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: C.muted }}>— {w.observer}, {w.date}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: C.learning, background: C.lBg, padding: "2px 8px", borderRadius: 4 }}>{w.what}</span>
      </div>
    </div>
  );
}

function MistakeCard({ m, idx }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#991B1B", background: "#FEE2E2", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>My mistake</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{m.wrong}</span>
        </div>
        <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5 }}><strong>Why it's wrong:</strong> {m.why}</div>
      </div>
      <div style={{ padding: "12px 16px", background: "#F0FDF4" }}>
        <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}><strong>Aligned version:</strong> {m.fix}</div>
      </div>
    </div>
  );
}

// ──── MAIN ────
export default function Page() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, fontWeight: 600, marginBottom: 6 }}>
            BeMe Observation Report · 2023–2026
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: 8 }}>
            Venbha's Learning Journey
          </h1>
          <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.6 }}>
            A celebration of 3 years of self-directed exploration. Synthesized from 565 observations, 
            5 semester reviews, and Venbha's own goals — across all 12 sheets in her observation record.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginBottom: 28, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 3 }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: 1, padding: "10px 12px", border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              background: tab === i ? C.text : "transparent",
              color: tab === i ? "#fff" : C.sec,
              transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>

        {/* ──── TAB 1: Parent Report ──── */}
        {tab === 0 && (
          <>
            {/* Summary */}
            <S>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { l: "Observations", v: "565", d: "3 academic years" },
                  { l: "Facilitators", v: "8", d: "Documenting her journey" },
                  { l: "Her Own Goals", v: "8", d: "Self-set for this semester" },
                ].map((s) => (
                  <div key={s.l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.l}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Georgia, serif", marginTop: 2 }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: C.sec }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </S>

            {/* Journey */}
            <S>
              <H2 desc="How Venbha's explorations, relationships, and self-expression have evolved across 3 years at BeMe.">The Story So Far</H2>
              {journeyChapters.map((ch, i) => <ChapterCard key={i} ch={ch} idx={i} />)}
            </S>

            {/* What She Chose */}
            <S>
              <H2 desc="What Venbha gravitated towards this year, ranked by how often it appears in facilitator observations. These are her choices — not assigned activities.">What She Chose to Explore</H2>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
                {whatSheChose.map((it, i) => <InterestRow key={i} item={it} maxCount={59} />)}
              </div>
            </S>

            {/* Facilitator Windows */}
            <S>
              <H2 desc="Specific moments that facilitators noticed — not evaluations, but windows into who Venbha is.">Facilitator Windows</H2>
              {facilitatorWindows.map((w, i) => <WindowCard key={i} w={w} />)}
            </S>

            {/* Goal Alignment */}
            <S>
              <H2 desc="Venbha set these goals for herself at the start of the semester. Here's what the observation record shows about her journey with each one.">Her Goals, Her Journey</H2>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                {goalAlignment.map((g, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderBottom: i < goalAlignment.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.dot, marginTop: 5, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{g.goal}</div>
                        <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5 }}>{g.evidence}</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: C.community, whiteSpace: "nowrap", background: C.cBg, padding: "3px 8px", borderRadius: 4 }}>{g.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </S>

            {/* Voices */}
            <S>
              <H2 desc="What parents, facilitators, and Venbha herself said during semester review meetings.">Voices</H2>
              {parentVoices.map((q, i) => (
                <div key={i} style={{ background: C.warmBg, border: `1px solid ${C.warmBorder}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontStyle: "italic" }}>"{q.text}"</div>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginTop: 6 }}>— {q.speaker}</div>
                </div>
              ))}
            </S>
          </>
        )}

        {/* ──── TAB 2: Pipeline ──── */}
        {tab === 1 && (
          <>
            <S>
              <H2 desc="Four-stage pipeline from 60 messy spreadsheets to philosophy-aligned parent reports.">AI Report Generation Pipeline</H2>
              {pipelineSteps.map((s, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 10, display: "flex", gap: 14 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.learning, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</div>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: C.learning, background: C.lBg, padding: "4px 10px", borderRadius: 4, display: "inline-block" }}>{s.tech}</div>
                  </div>
                </div>
              ))}
            </S>

            <S>
              <H2 desc="The system prompt that encodes BeMe's values into every generated report. This is the most important piece — get this wrong and the AI produces assessment-flavored reports that contradict your philosophy.">Philosophy-Aligned AI Prompt</H2>
              <div style={{ background: "#1E1E1C", borderRadius: 10, padding: 20, overflow: "auto" }}>
                <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.7, color: "#D4D4C8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {alignedPrompt}
                </pre>
              </div>
            </S>

            <S>
              <H2 desc="Practical decisions for building this at 60-student scale.">Architecture Decisions</H2>
              {[
                { q: "Where does the AI prompt encode philosophy?", a: "The CRITICAL PHILOSOPHY RULES block at the top. Without this, Claude defaults to assessment language because that's what most education data looks like in its training. You need to explicitly say: never evaluate, never benchmark, center the child's choices." },
                { q: "Sonnet vs Opus — which for what?", a: "Sonnet for bulk extraction: date parsing, theme tagging, keyword matching across 17k rows. Opus for the final narrative per child — you want the best writing quality for parent-facing output. Budget ~$0.30/student for Sonnet extraction, ~$0.50/student for Opus narrative." },
                { q: "How to handle the Individual Plan sheet?", a: "It's a question bank with zero facilitator responses across 5 of 6 columns. Drop it as a data source. The daily observations already answer those questions. If BeMe wants it alive, convert it to a quarterly reflection form, not a daily log." },
                { q: "Report cadence?", a: "Full journey report: once per semester, before the review meeting (this IS the review meeting prep). Monthly snapshot: automated, lightweight — just observation count, category distribution, and recent facilitator windows. No narrative needed monthly." },
                { q: "How to validate AI output against philosophy?", a: "Build a simple rubric: scan for forbidden words (needs, should, improve, weakness, behind, monitor). Flag any report that contains these. Have a facilitator review flagged reports before they go to parents." },
              ].map((d, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{d.q}</div>
                  <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.6 }}>{d.a}</div>
                </div>
              ))}
            </S>
          </>
        )}

        {/* ──── TAB 3: Philosophy ──── */}
        {tab === 2 && (
          <>
            <S>
              <H2 desc="My first report made 5 framing mistakes that violated BeMe's core principles. Here's each one, why it's wrong, and the corrected version.">What I Got Wrong the First Time</H2>
              {philosophyMistakes.map((m, i) => <MistakeCard key={i} m={m} idx={i} />)}
            </S>

            <S>
              <H2 desc="The language patterns that the AI pipeline must enforce to stay aligned with self-directed learning philosophy.">Language Rules for the AI</H2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#991B1B", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Never use</div>
                  {["She needs to improve...", "An area for growth...", "She should work on...", "Behind in...", "Struggles with...", "Weakness / deficit", "Performance / achievement", "Grade level / benchmark", "Monitor / track / assess", "Well-rounded (implies balance is ideal)"].map((w, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#991B1B", marginBottom: 4, paddingLeft: 10, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0 }}>✕</span>{w}
                    </div>
                  ))}
                </div>
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Use instead</div>
                  {["She chose to explore...", "She gravitated towards...", "She expressed wanting...", "She's currently exploring...", "This is new territory for her...", "Her interests, her patterns", "Her journey, her choices", "Her own goals (self-set)", "Facilitators noticed / observed", "She spent most time in... (neutral)"].map((w, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#166534", marginBottom: 4, paddingLeft: 10, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0 }}>✓</span>{w}
                    </div>
                  ))}
                </div>
              </div>
            </S>

            <S>
              <H2 desc="The ReadMe sheet in Venbha's own spreadsheet defines this clearly.">The North Star</H2>
              <div style={{ background: C.warmBg, border: `1px solid ${C.warmBorder}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontStyle: "italic" }}>
                  "It is not an assessment record. Unless explicitly solicited by the child, we do not do any kind of assessment or evaluation of the work/learning a child does. The reason for this is that we want the child to measure themselves according to the standards they set for themselves."
                </div>
                <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginTop: 10 }}>— BeMe Observation ReadMe</div>
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: C.sec, lineHeight: 1.7 }}>
                This means the report's job isn't to tell parents how their child is performing. It's to show parents what their child chose, what they explored, what they expressed, and how their journey has unfolded — through the eyes of the facilitators who walk alongside them. 
                The parent should finish reading and think "I see my child" — not "I see my child's score."
              </div>
            </S>
          </>
        )}

        <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted }}>
          Generated April 2026 · All 12 sheets analyzed · Philosophy-aligned framing
        </div>
      </div>
    </div>
  );
}
