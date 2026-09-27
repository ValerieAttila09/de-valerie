export interface ExperienceEntry {
  year: string;
  title: string;
  detail: string;
}

export const experience: ExperienceEntry[] = [
  {
    year: "2026",
    title: "Creative Development",
    detail: "Personal and client projects — interactive sites, prototypes, experiments.",
  },
  {
    year: "2025",
    title: "Web Development",
    detail: "Full-stack projects: storefronts, tools and internal products.",
  },
  {
    year: "2024",
    title: "Experimentation",
    detail: "Learning in public: canvas, shaders, audio, computer vision.",
  },
];

export interface NowEntry {
  label: string;
  value: string;
  sub: string;
}

export const currently: NowEntry[] = [
  {
    label: "Building",
    value: "This portfolio",
    sub: "An ongoing study in editorial web design",
  },
  {
    label: "Learning",
    value: "Advanced WebGL",
    sub: "Lighting models, post-processing, GPU particles",
  },
  {
    label: "Exploring",
    value: "AI × Creative Coding",
    sub: "Gesture input, generative systems, playful interfaces",
  },
];
