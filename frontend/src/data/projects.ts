export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  category: string;
  role: string[];
  stack: string[];
  description: string;
  image: string;
  href: string;
  status: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: "northstar",
    title: "Northstar",
    year: 2026,
    category: "B2B Digital Product",
    role: ["Design", "Development"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    description:
      "An editorial B2B platform focused on clarity, speed and operational simplicity.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/50fdb5d87560db6d514074aba14ab22215f2fd9ce5064c55f01ca59580b91108.jpeg",
    href: "/work/northstar",
    status: "Completed",
    sections: [
      {
        title: "Overview",
        body: "Northstar is an operations platform for B2B teams that drowns in dashboards. The goal was the opposite of a dashboard: one calm, editorial surface where the day's numbers read like a well-set page instead of a cockpit.",
      },
      {
        title: "Context",
        body: "The founding team came from print and logistics, not SaaS. They kept referencing annual reports and Swiss timetables — documents where hierarchy does the work that charts usually do. That became the design brief.",
      },
      {
        title: "Approach",
        body: "I treated every screen as a typographic composition first and a UI second. Metrics are set in a single scale, aligned to a strict 12-column grid, with color reserved for exactly one state: attention required.",
      },
      {
        title: "Design",
        body: "A monochromatic system with one signal color. Spacing tokens derived from the line-height of the body text, so every gap in the interface is a multiple of the reading rhythm. No cards inside cards — dividers and whitespace carry the structure.",
      },
      {
        title: "Development",
        body: "React with strict TypeScript, a token-driven Tailwind setup, and virtualized tables for the dense views. Every number formats through one pipe so units, locales and precision stay consistent across the product.",
      },
      {
        title: "Result",
        body: "Time-to-first-meaningful-scan dropped measurably in usability sessions, and the team reported that demo calls got shorter — prospects understood the product from the first screen. Sometimes restraint is the feature.",
      },
    ],
  },
  {
    id: "rusindo",
    title: "Rusindo",
    year: 2025,
    category: "E-Commerce Experience",
    role: ["Design", "Development"],
    stack: ["React", "Node.js", "PostgreSQL"],
    description:
      "A storefront for Indonesian craft goods, built around slow browsing instead of conversion pressure.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/80c8485028dfa5b3c15efcf9b6bdbd7e0e370aeea876068485ba82db1413d405.jpeg",
    href: "/work/rusindo",
    status: "Completed",
    sections: [
      {
        title: "Overview",
        body: "Rusindo sells small-batch craft goods from Indonesian workshops. Most marketplaces flatten these products into identical thumbnails; the brief was to build a storefront that behaves more like a gallery visit than a checkout funnel.",
      },
      {
        title: "Context",
        body: "Each maker works in small runs, so stock is scarce by nature. The shop needed to make scarcity feel like curation instead of a limitation — and give every object enough room to be looked at properly.",
      },
      {
        title: "Approach",
        body: "I structured the catalogue as an editorial archive: large imagery, generous negative space, and metadata — origin, material, maker — set like captions. Filtering feels like turning pages, not operating a control panel.",
      },
      {
        title: "Design",
        body: "A warm-neutral palette over a strict grid, with product photography in clipped frames and a single accent reserved for price and availability. Motion is limited to image reveals and page transitions; the objects stay still, the page moves around them.",
      },
      {
        title: "Development",
        body: "React frontend, Node.js API, PostgreSQL for catalogue and inventory. Images are served as responsive WebP with lazy loading, and the cart is a single optimistic state machine so adding items never blocks browsing.",
      },
      {
        title: "Result",
        body: "Average session length doubled compared to the previous marketplace listing, and makers reported that buyers started referencing materials and process in their messages — proof the captions were doing their job.",
      },
    ],
  },
  {
    id: "hand-interface",
    title: "Hand Interface",
    year: 2025,
    category: "Computer Vision UI",
    role: ["Development", "Interaction Design"],
    stack: ["MediaPipe", "Canvas 2D", "TypeScript"],
    description:
      "A hand-tracking prototype where the browser UI is controlled by gestures, not a cursor.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/ea7c4526ee024192792b37d8108588bee1676a21ad4788dd6c8ad924e8489c47.jpeg",
    href: "/work/hand-interface",
    status: "Completed",
    sections: [
      {
        title: "Overview",
        body: "An experiment that became a project: a small interface you operate entirely with your hand in front of the webcam. Pinch to grab, move to drag, open palm to release — no mouse, no touch.",
      },
      {
        title: "Context",
        body: "I wanted to know whether camera-based input could feel precise enough for real UI, or whether it would always feel like a demo. The only way to find out was to build something unforgiving: draggable panels with snap targets.",
      },
      {
        title: "Approach",
        body: "MediaPipe's hand landmarks give 21 keypoints per frame. Raw keypoints are unusable — they jitter — so the core of the project is a smoothing pipeline: one-euro filtering, velocity dead zones, and gesture state machines instead of per-frame guesses.",
      },
      {
        title: "Design",
        body: "The visual language is a technical schematic: thin landmark skeletons, connection lines, and one accent color marking the active control point. Feedback is instant and oversized, because camera input needs confirmation more than cursor input does.",
      },
      {
        title: "Development",
        body: "TypeScript and Canvas 2D, with the landmark stream decoupled from rendering through a fixed-timestep loop. All tracking runs locally in the browser; no frame ever leaves the device.",
      },
      {
        title: "Result",
        body: "With smoothing, pinch accuracy got close enough to hit 24px targets reliably. The takeaway: camera input fails from bad filtering, not bad tracking. The math matters more than the model.",
      },
    ],
  },
  {
    id: "resonance",
    title: "Resonance",
    year: 2024,
    category: "Web Audio Experience",
    role: ["Design", "Development"],
    stack: ["React", "Web Audio API", "TypeScript"],
    description:
      "A music player where the interface is the instrument — circular timelines, playable waveforms.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/7f4f26d0aaa9aa511147b3870670fe44538e0da53c9b9cba1ae7e1e42f4e16d1.jpeg",
    href: "/work/resonance",
    status: "Completed",
    sections: [
      {
        title: "Overview",
        body: "Resonance is a music player rebuilt around a question: why do players look like spreadsheets? The interface is a rotating circular timeline — a vinyl groove rendered as UI — with the waveform as the primary object.",
      },
      {
        title: "Context",
        body: "Built as a personal project after reading about how physical media shapes listening habits. A linear progress bar invites skipping; a circular one invites listening through.",
      },
      {
        title: "Approach",
        body: "The playhead is a degree on a circle, not a percentage of a bar. Scrubbing works radially, and the waveform is drawn as concentric grooves from real FFT data captured during playback.",
      },
      {
        title: "Design",
        body: "A precision-instrument aesthetic: hairline ticks, monospaced timecodes, one accent arc for elapsed time. Nothing glows, nothing pulses to the beat — the restraint is deliberate, the sound provides the energy.",
      },
      {
        title: "Development",
        body: "React for UI, Web Audio API for decoding and analysis. The analyser node feeds a ring buffer drawn on Canvas at 60fps, decoupled from React's render cycle so animation never waits on reconciliation.",
      },
      {
        title: "Result",
        body: "A player I actually use daily, and the project that taught me the most about real-time rendering discipline: keep the audio thread sacred, keep React out of the frame loop.",
      },
    ],
  },
];
