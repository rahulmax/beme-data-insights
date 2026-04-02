'use client'
// @ts-nocheck
import { useState } from "react";

const C = {
  bg: "#F7F7F5", surface: "#FFFFFF", border: "#E4E2DC", borderLight: "#EEECE7",
  text: "#18181B", sec: "#5C5A52", muted: "#9C9A92",
  blue: "#2563EB", amber: "#D97706", purple: "#7C3AED",
  red: "#DC2626", green: "#059669", teal: "#0D9488",
  indigo: "#4F46E5", pink: "#DB2777", orange: "#EA580C", slate: "#64748B",
};

const tabs = ["Behavioral Arc", "How She Learns", "Emerging Edges", "Convergence Map"];

function H2({ children, desc }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: desc ? 5 : 0 }}>{children}</h2>
      {desc && <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.65 }}>{desc}</p>}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 10, ...style }}>{children}</div>;
}

function Metric({ value, label, color }) {
  return (
    <div style={{ background: (color || C.blue) + "0A", borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
      <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "Georgia, serif", color: color || C.blue }}>{value}</div>
      <div style={{ fontSize: 11, color: C.sec, marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ──── TAB 0: BEHAVIORAL ARC ────

function BehavioralArc() {
  const dimensions = [
    {
      name: "Emotional Regulation",
      color: C.purple,
      stages: [
        { period: "2023-24", state: "Cried suddenly when mother spoke at review. Refused to answer Nilima. Got bored during slow tasks, wanted all tools quickly.", level: 1 },
        { period: "S1 24-25", state: "Has fears if things are forced. Conscious of work compared to Myra — fearful it's not as good. Hesitant to try boulder. Not ok with sleepovers (3 semesters).", level: 2 },
        { period: "S2 24-25", state: "Sorted out conflict with Tanmay — took initiative to repair. Able to regulate herself. Gross motor confidence improved.", level: 3 },
        { period: "S1 25-26", state: "Gave herself time off from friends when needed. Fear of missing out — resolved. Strong with her decision, sticks to it.", level: 4 },
        { period: "S2 25-26", state: "If she makes a mistake she agrees and doesn't blame others. Cooperative, patient. New tension: comparing BeMe with mainstream school peers.", level: 4 },
      ],
    },
    {
      name: "Social Confidence",
      color: C.red,
      stages: [
        { period: "2023-24", state: "Used to say only yes and no. Scared of Arjun. Friends only through brother Mukundhan (older children). Role-play alone with dolls.", level: 1 },
        { period: "S1 24-25", state: "Comfortable with Nilima, Keerthi, Poornima, Rashmi. Conflicts with Myra and Tanmay difficult to manage. Concern: mixing with age-appropriate peers?", level: 2 },
        { period: "S2 24-25", state: "More settled with friends. Initiated repair with Tanmay. 'We don't have any concerns' — parents. Can figure out being on her own.", level: 3 },
        { period: "S1 25-26", state: "No complaints about friends. Found a support structure. Planned and invited people to dance performance. Hugged Aadya after 10-day absence.", level: 4 },
        { period: "S2 25-26", state: "Active in resource committee. Presents her work to groups. Influenced by and influencing other kids — bidirectional social power.", level: 5 },
      ],
    },
    {
      name: "Self-Direction",
      color: C.blue,
      stages: [
        { period: "2023-24", state: "Needed prompts to visit corners. Engagement came through facilitator-led activities. Attention span short during worksheets.", level: 1 },
        { period: "S1 24-25", state: "'She wants to do things on her own.' Writing with dotted line help. Fascination for books, writing, numbers, rhymes.", level: 2 },
        { period: "S2 24-25", state: "Started writing and doing maths on her own. Made packing list from memory (45 mins). Asked for spellings, didn't give up.", level: 3 },
        { period: "S1 25-26", state: "Made outstation task list independently. 'When she writes things she needs to do, she will not forget.' Cleaned beach on her own.", level: 4 },
        { period: "S2 25-26", state: "Expressed wanting to study, learn writing, read Bob Books. Came to closing without reminder. Asked to start closing early. Presented own assessments.", level: 5 },
      ],
    },
    {
      name: "Physical Confidence",
      color: C.green,
      stages: [
        { period: "2023-24", state: "Trying to climb during outdoor time. Liked slides. Not yet comfortable with challenging physical tasks.", level: 1 },
        { period: "S1 24-25", state: "Went up Cubbon Park boulder — was hesitant before. Lost weight over last year, which is good.", level: 2 },
        { period: "S2 24-25", state: "Health improved. More physical exercise. Junk food stopped completely. Gross motor skills improved a lot.", level: 3 },
        { period: "S1 25-26", state: "Zip line, tire swing, balancing challenges. Morning park walks. Wall sit challenge during plank/push-up day.", level: 4 },
        { period: "S2 25-26", state: "Learned to ride a cycle. Morning walks to Utkarsh Park. Pottery (fine motor). Wire human body construction.", level: 4 },
      ],
    },
  ];

  return (
    <>
      <H2 desc="Four dimensions tracked across 5 semesters. Each row shows the actual evidence from observations and reviews — not inferred, not scored.">
        3-Year Developmental Trajectory
      </H2>

      {dimensions.map((dim, di) => (
        <Card key={di}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: dim.color }} />
            <span style={{ fontSize: 15, fontWeight: 700 }}>{dim.name}</span>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 16, padding: "0 8px" }}>
            {dim.stages.map((s, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: 12 + s.level * 4, height: 12 + s.level * 4,
                  borderRadius: "50%", background: dim.color,
                  opacity: 0.3 + s.level * 0.15, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#fff", fontWeight: 700,
                }} />
                {si < dim.stages.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: dim.color + "30" }} />
                )}
              </div>
            ))}
          </div>

          {dim.stages.map((s, si) => (
            <div key={si} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12 }}>
              <div style={{ width: 70, fontWeight: 600, color: dim.color, flexShrink: 0, fontSize: 11 }}>{s.period}</div>
              <div style={{ color: C.sec, lineHeight: 1.55 }}>{s.state}</div>
            </div>
          ))}
        </Card>
      ))}

      {/* The Two Venbhas */}
      <Card style={{ background: "#FFFBF0", borderColor: "#F5E6CC" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>🔍 The "Two Venbhas" Signal</div>
        <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.7 }}>
          Her father said in the S2 2025-26 review: <em>"At school her image is different and at home her image is totally different."</em> 
          This isn't unusual — many children have a 'public self' and a 'home self.' But combined with her recent interest in homework, 
          exams, and uniforms (comparing with mainstream school peers), it suggests she's constructing an identity as a 
          "student" that's influenced by external models. She's asking: <em>what does being a learner look like?</em> BeMe's 
          answer is different from what her neighborhood peers model. This is a philosophical tension worth holding gently, not resolving.
        </div>
      </Card>
    </>
  );
}

// ──── TAB 1: HOW SHE LEARNS ────

function HowSheLearns() {
  const modalities = [
    { name: "Hands-on / Kinesthetic", count: 65, pct: 38, color: C.amber, desc: "Cutting, pasting, threading, cooking, clay, folding, kneading. This is her dominant mode. She processes understanding through her hands.", evidence: "Made robotic hand — could use scissors independently. Held knife and cut veggies for bhelpuri. Threading beads for bracelets. Grinding rice, coconut grating." },
    { name: "Analytical / Inquiry", count: 41, pct: 24, color: C.blue, desc: "Asking 'why,' observing experiments, testing hypotheses. Underrecognized because it's captured inside other activities.", evidence: "'Why can't I control the force?' (science). Checking how magnets work while searching for alphabet letters. 'It's floating because it's lightweight. I think coconut floats.'" },
    { name: "Social / Collaborative", count: 35, pct: 21, color: C.red, desc: "Learning alongside or through peers. Not just 'playing together' — actively learning from the interaction.", evidence: "Myra teaching her dance. Tanmay and Vaagai spelling words for her. Group math discussions ('What is 8 lakhs + 8 lakhs?'). Planning performance together." },
    { name: "Verbal / Expressive", count: 28, pct: 16, color: C.purple, desc: "Speaking, singing, storytelling, discussing. Her Extempore game was an early anchor. Now expressing desires and plans verbally.", evidence: "Extempore game (2023-24 — stood on chair, pulled chits, spoke sentences). Told facilitator she wants Bob Books. Made outstation list and explained why. 'I'll help poor people like Myra.'" },
    { name: "Physical / Gross Motor", count: 23, pct: 14, color: C.green, desc: "Climbing, balancing, swinging, cycling. Physical confidence has been a tracked growth area across 3 years.", evidence: "Cubbon Park boulder (hesitant → climbed). Zip line, tire swing. Learned cycle. Wall sit challenge. Morning park walks." },
    { name: "Independent / Self-paced", count: 6, pct: 4, color: C.teal, desc: "Working alone by choice. Still relatively rare — most of her learning is socially embedded. But growing.", evidence: "Packing list from memory (45 mins alone). Beach cleanup on her own. Came to closing without reminder. Reflection journal entries." },
  ];

  const cognitive = [
    { name: "Analytical / Inquiry", count: 41, color: C.blue, icon: "🔍",
      desc: "She asks 'why' and 'how' naturally. Her science engagement isn't passive — she questions, predicts, and wants to replicate experiments at home.",
      keyEvidence: "'Why can't I control the force?' — wanted to show the experiment to her father. Checked how magnets work while simultaneously searching for alphabet letters (dual-processing). 'It's floating because it's lightweight — I think coconut floats' (hypothesis formation)." },
    { name: "Planning / Organization", count: 25, color: C.green, icon: "📋",
      desc: "Emerging strength. She creates lists, plans events, prepares materials. This is new — didn't exist in 2023-24.",
      keyEvidence: "Made outstation packing list from memory. Planned dance performance and invited audience. Prepared stall day — decided what to sell, set up shop. Resource committee list-making." },
    { name: "Creative / Divergent", count: 22, color: C.amber, icon: "✨",
      desc: "Makes unexpected design choices. Doesn't copy — creates her own patterns, selects her own colors and materials.",
      keyEvidence: "'Carefully chose different shapes, colours, and letter beads to create her own designs.' Made jewelry from fresh leaves. Designed paper lollipops, waste paper designs, transparent photo frame." },
    { name: "Sequential / Procedural", count: 21, color: C.purple, icon: "📐",
      desc: "Can follow multi-step processes. Important for recipe-following, experiment protocols, and eventually reading/writing.",
      keyEvidence: "Followed cooking recipes (bhelpuri, chocolate, Patolyo). Repeated science experiment steps from memory. Followed dance choreography steps." },
    { name: "Persistence / Stamina", count: 11, color: C.red, icon: "🎯",
      desc: "Growing capacity to stick with difficult tasks. Was noted as having short attention span in 2023-24 — now completing worksheets and 45-minute tasks.",
      keyEvidence: "'Unlike previous times, she sat for longer and completed writing 1-20' (2024-25). Packing list — 45 minutes, didn't give up. 'One whole day they took time to learn dance continuously' — performed next day." },
    { name: "Self-correction", count: 1, color: C.teal, icon: "🔄",
      desc: "Still nascent. Only one documented instance, but the review notes add: 'if she makes a mistake she agrees and doesn't blame others.'",
      keyEvidence: "'She wrote few numbers reverse, then changed those when it was mentioned to her.' Review: 'If she has done any mistake she will agree and she will not blame on others.'" },
  ];

  return (
    <>
      <H2 desc="How Venbha processes and absorbs. Derived from 565 observations — not self-reported, but observed in action.">
        Learning Modality Profile
      </H2>

      {modalities.map((m, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif", color: m.color }}>{m.count}</span>
              <span style={{ fontSize: 11, color: C.muted }}>observations</span>
            </div>
          </div>
          <div style={{ height: 6, background: C.borderLight, borderRadius: 3, marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${m.pct}%`, background: m.color, borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.6, marginBottom: 6 }}>{m.desc}</div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, background: m.color + "08", borderRadius: 6, padding: "8px 12px" }}>
            <strong>Evidence:</strong> {m.evidence}
          </div>
        </Card>
      ))}

      <div style={{ marginTop: 32 }}>
        <H2 desc="What kind of thinking she demonstrates. These patterns suggest how to design learning opportunities that match her cognitive style.">
          Cognitive Pattern Profile
        </H2>

        {cognitive.map((cog, i) => (
          <Card key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{cog.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{cog.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: cog.color, background: cog.color + "14", padding: "2px 10px", borderRadius: 10 }}>
                {cog.count} instances
              </span>
            </div>
            <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.6, marginBottom: 8 }}>{cog.desc}</div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, borderLeft: `3px solid ${cog.color}`, paddingLeft: 12 }}>
              {cog.keyEvidence}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ──── TAB 2: EMERGING EDGES ────

function EmergingEdges() {
  const edges = [
    {
      title: "The Reading Threshold",
      color: C.blue,
      stage: "Pre-reader → Early reader transition",
      evidence: [
        "Can identify vowel sounds by pronouncing words and seeing pictures",
        "Matches pictures to words but needs help reading the words",
        "Can copy words — handwriting is 'pretty neat'",
        "Expressed wanting Bob Books (decodable readers) — knows what she needs",
        "Practicing spelling with peers — Tanmay and Vaagai spell out text for her",
      ],
      trajectory: "She's at the phonemic awareness → decoding transition. She hears sounds, recognizes letters, and can write them. The missing bridge is systematic phonics — connecting letter patterns to sounds. Bob Books is exactly the right next step (she identified this herself). She needs regular access to decodable texts, not just worksheets.",
      whatCouldHelp: "Daily 10-minute reading time with a facilitator or peer. A 'reading buddy' system where an older child reads with her. Labeling objects in her homeroom. A personal word wall she adds to weekly. Science experiment journals where she writes labels under her drawings.",
    },
    {
      title: "Mathematical Thinking",
      color: C.green,
      stage: "Counting → Operations transition",
      evidence: [
        "Comfortably counting objects and numbers 1-20 (2024-25)",
        "Learning two-digit numbers — showing and learning from chart (2025-26)",
        "Single-digit to two-digit addition — 'happily solved many problems right'",
        "Learning math through dice — concrete/manipulative approach working",
        "Sometimes writes numbers reversed, corrects when mentioned",
      ],
      trajectory: "She's moving from rote counting to understanding quantity and operations. Dice-based learning is working because it's concrete and social. The reversed numbers are developmentally normal and self-correcting. She's ready for place value concepts and simple multiplication through grouped counting.",
      whatCouldHelp: "Cooking math — doubling recipes, measuring ingredients, dividing portions. A 'shop' project where she makes price tags and gives change. Counting collections (stones, beads, leaves) and grouping them. Board games that use number operations (Uno, Yahtzee).",
    },
    {
      title: "Scientific Thinking",
      color: C.purple,
      stage: "Observation → Hypothesis formation",
      evidence: [
        "'It's floating because it's lightweight. I think coconut floats' — prediction",
        "'Why can't I control the force?' — causal reasoning question",
        "Wants to show experiment to father — desires to teach/share knowledge",
        "Wants to make a story about the magnet experiment — narrative + science",
        "Plans soap-making project with friends — applied science",
      ],
      trajectory: "She's not just watching experiments — she's predicting outcomes, asking causal questions, and wanting to replicate and teach. This is the scientific method emerging naturally. The 'story about magnets' idea is extraordinary — she wants to narrativize science. This is exactly how scientific understanding deepens.",
      whatCouldHelp: "A personal experiment journal — draw what happened, write one sentence about why. The soap-making project she proposed (it's chemistry + measurement + process). Magnifying glass + nature journal during outdoor walks. 'I wonder...' prompts during science time.",
    },
    {
      title: "Self-Authorship",
      color: C.amber,
      stage: "Following → Initiating → Authoring",
      evidence: [
        "Made her own packing list — self-imposed structure",
        "Planned and promoted dance performance — event production",
        "Chose her stall items, set pricing, decided how to use earnings",
        "Took initiative to repair friendship with Tanmay — social authorship",
        "Expressing what she wants to learn — 'I want to study, learn writing, read Bob Books'",
        "'Without a reminder she came to close' — internalized responsibility",
      ],
      trajectory: "This is the most significant shift across 3 years. She's moved from needing facilitator prompts to authoring her own plans, relationships, and learning goals. The outstation packing list is the clearest evidence — she created a personal system for self-management. She's ready for longer-term projects where she sets her own milestones.",
      whatCouldHelp: "A personal project journal where she plans, executes, and reflects on multi-day projects. The soap-making project she proposed is perfect — it has planning, execution, and sharing built in. A 'what I want to learn this week' board she updates herself.",
    },
  ];

  const forecast = [
    {
      title: "She will likely seek more structured learning",
      detail: "She's already asking for homework, expressing desire for Bob Books, and comparing with mainstream school peers. This isn't rejection of BeMe — it's a developmentally appropriate desire for mastery. She wants to feel competent at reading and math. The question is whether BeMe can provide structured practice within a self-directed framework, or whether this desire goes unmet and becomes frustration.",
      signal: "Expressed wanting homework, Bob Books, structured writing practice",
      timeframe: "Next 1-2 semesters",
      color: C.blue,
    },
    {
      title: "Science + narrative is her unique intersection",
      detail: "She wanted to 'make a story about the magnet experiment.' She makes lists, plans events, and is beginning to write. If she can write a science experiment as a story (with drawings, labels, and 'what I discovered'), that bridges her reading/writing edge with her strongest cognitive pattern (inquiry). This could be her path into literacy — through science documentation, not phonics drills.",
      signal: "Magnet story idea + experiment journaling potential",
      timeframe: "Available now",
      color: C.purple,
    },
    {
      title: "Peer teaching will accelerate her learning",
      detail: "She learns from Myra (dance, numbers), Tanmay and Vaagai (spelling), Deepika (math), and Antara (science). But she also teaches — she organized dance performances, shared chocolates with everyone, and participated in resource committee governance. Children who teach consolidate their own learning. If she teaches a younger child something she knows (counting, art techniques, recipes), she'll deepen her own understanding.",
      signal: "Already teaching dance, organizing events, doing committee work",
      timeframe: "Next semester",
      color: C.green,
    },
    {
      title: "The 'two Venbhas' tension will intensify",
      detail: "Her father notes her school persona differs from her home persona. She's absorbing messages from neighborhood peers about what 'school' looks like (homework, uniforms, exams). This isn't a problem to solve — it's a developmental task of identity construction. But it means her parents may need more frequent touchpoints about BeMe's philosophy, and Venbha herself may need help articulating what she's learning in terms that satisfy her growing sense of 'am I a real student?'",
      signal: "Father's review comment + homework/exam/uniform conversations",
      timeframe: "Ongoing",
      color: C.amber,
    },
  ];

  return (
    <>
      <H2 desc="Where she's actively stretching right now. Each edge includes the developmental stage she's at, the evidence, and what the environment could make available (not prescribe — make available).">
        Active Developmental Edges
      </H2>

      {edges.map((e, i) => (
        <Card key={i} style={{ borderLeft: `4px solid ${e.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{e.title}</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: e.color, background: e.color + "14", padding: "3px 10px", borderRadius: 10, whiteSpace: "nowrap" }}>{e.stage}</span>
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, color: C.sec, marginBottom: 6 }}>What the observations show:</div>
          {e.evidence.map((ev, j) => (
            <div key={j} style={{ fontSize: 12, color: C.sec, lineHeight: 1.6, paddingLeft: 12, position: "relative", marginBottom: 3 }}>
              <span style={{ position: "absolute", left: 0, color: C.muted }}>·</span>{ev}
            </div>
          ))}

          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65, margin: "10px 0", background: e.color + "08", borderRadius: 6, padding: "10px 14px" }}>
            <strong>Trajectory:</strong> {e.trajectory}
          </div>

          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 6, padding: "10px 14px" }}>
            <strong>What could be made available:</strong> {e.whatCouldHelp}
          </div>
        </Card>
      ))}

      <div style={{ marginTop: 32 }}>
        <H2 desc="Not predictions — but trajectories that the data suggests, based on behavioral momentum and expressed desires.">
          Where the Trajectory Points
        </H2>

        {forecast.map((f, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${f.color}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.7, marginBottom: 10 }}>{f.detail}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ fontSize: 11, color: f.color, background: f.color + "0A", padding: "4px 12px", borderRadius: 6 }}>
                <strong>Signal:</strong> {f.signal}
              </div>
              <div style={{ fontSize: 11, color: C.muted, background: C.borderLight, padding: "4px 12px", borderRadius: 6 }}>
                {f.timeframe}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ──── TAB 3: CONVERGENCE MAP ────

function ConvergenceMap() {
  const convergences = [
    {
      title: "The Science Journal",
      connects: ["Science (inquiry)", "Reading & Writing (documentation)", "Art (drawing/labeling)", "Self-organization (planning)"],
      how: "She wanted to 'make a story about the magnet experiment.' Give her a blank journal. After each experiment, she draws what happened, labels the materials (building vocabulary), and writes one sentence about what she discovered. This turns every science session into a reading/writing practice without ever calling it a 'worksheet.'",
      color: C.purple,
      evidence: "Science: 41 inquiry observations · Reading: 26 obs · Art: 75 obs · She already connects these naturally",
    },
    {
      title: "The Cooking Curriculum",
      connects: ["Math (measurement, counting, fractions)", "Reading (recipe following)", "Science (chemistry, heat, transformation)", "Social (collaboration)", "Self-organization (planning, sequencing)"],
      how: "She's already cooking — bhelpuri, chocolate, lemonade, Patolyo. Now add structure: she reads the recipe (reading), measures ingredients (math — 'we need 2 cups, we have 1, how many more?'), observes transformations (science — 'why did the chocolate melt?'), and writes a review afterward ('what I made, what I'd change').",
      color: C.amber,
      evidence: "Cooking: 43 obs · Math: 32 obs · She 'was able to hold knife and cut veggies' — ready for more complex kitchen tasks",
    },
    {
      title: "The Shop Project",
      connects: ["Math (pricing, money, change-making)", "Reading & Writing (signs, labels, inventory)", "Social (customer interaction)", "Self-organization (planning, tracking)", "Community (governance, fairness)"],
      how: "She already ran a gulab jamun stall and said she'd 'help poor people like Myra' with her earnings. A sustained shop project — making items in art corner, pricing them, creating labels, selling to community, tracking earnings — bridges almost everything she's working on into a single project.",
      color: C.green,
      evidence: "Stall day happened once · She already makes sellable items (bracelets, jewelry, cards) · Math is her active edge",
    },
    {
      title: "The Performance Pipeline",
      connects: ["Dance (physical expression)", "Planning (event organization)", "Social (audience engagement, inviting)", "Reading & Writing (programs, invitations)", "Community (sharing, celebration)"],
      how: "She planned a dance performance, invited people, decorated the space, and performed. This isn't just 'dance' — it's event production. If she writes invitations (reading/writing), creates a program (planning/design), and performs (physical/expressive), one project touches 5 developmental edges.",
      color: C.red,
      evidence: "Dance: 46 obs · She 'planned everything well and is calling people to join' · Already doing this naturally",
    },
  ];

  return (
    <>
      <H2 desc="The most powerful learning happens when multiple interests and edges converge in a single activity. These aren't prescriptions — they're patterns already visible in her behavior that could be made richer.">
        Interest Convergence Opportunities
      </H2>

      {convergences.map((c, i) => (
        <Card key={i} style={{ borderLeft: `4px solid ${c.color}` }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
            {c.connects.map((conn, j) => (
              <span key={j} style={{ fontSize: 11, fontWeight: 500, color: c.color, background: c.color + "0F", padding: "3px 10px", borderRadius: 10, border: `1px solid ${c.color}25` }}>
                {conn}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 10 }}>{c.how}</div>

          <div style={{ fontSize: 11, color: C.sec, lineHeight: 1.5, background: C.bg, borderRadius: 6, padding: "8px 12px" }}>
            {c.evidence}
          </div>
        </Card>
      ))}

      <Card style={{ background: "#FFFBF0", borderColor: "#F5E6CC", marginTop: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>The Principle Behind Convergence</div>
        <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.7 }}>
          These aren't lesson plans. They're recognitions that Venbha is <em>already</em> doing multi-dimensional 
          learning — she just doesn't know it, and the observation system doesn't capture it that way. When she 
          makes bracelets to sell at a stall, she's doing art + math + entrepreneurship + social skills simultaneously. 
          The facilitator's role isn't to design these convergences — it's to notice them when they happen, name them 
          for the child ("You just did math when you counted those beads — did you notice?"), and make the next 
          materials available.
        </div>
      </Card>
    </>
  );
}

// ──── MAIN ────
export default function Page() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 80px" }}>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, fontWeight: 600, marginBottom: 4 }}>
            Behavioral & Developmental Analysis · 565 Observations
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: 6 }}>
            Venbha: Deep Insights
          </h1>
          <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.6 }}>
            Behavioral patterns, cognitive profile, developmental edges, and where her interests 
            naturally converge — derived from every observation, review, and her own words across 3 years.
          </p>
        </div>

        <div style={{ display: "flex", gap: 3, marginBottom: 24, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 3, overflowX: "auto" }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: "0 0 auto", padding: "9px 14px", border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap",
              background: tab === i ? C.text : "transparent",
              color: tab === i ? "#fff" : C.sec,
            }}>{t}</button>
          ))}
        </div>

        {tab === 0 && <BehavioralArc />}
        {tab === 1 && <HowSheLearns />}
        {tab === 2 && <EmergingEdges />}
        {tab === 3 && <ConvergenceMap />}

        <div style={{ marginTop: 40, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted }}>
          All insights derived from observation evidence · No external benchmarks applied · Philosophy-aligned
        </div>
      </div>
    </div>
  );
}
