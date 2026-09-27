export interface Experiment {
  id: string;
  index: string;
  title: string;
  year: number;
  tech: string[];
  description: string;
  image: string;
  href: string;
  trying: string;
  learned: string;
  howItWorks: string;
}

export const experiments: Experiment[] = [
  {
    id: "particle-field",
    index: "EXP.01",
    title: "Particle Field",
    year: 2026,
    tech: ["Canvas 2D", "Curl Noise"],
    description:
      "Ten thousand particles advected through a curl-noise field. No gravity, no collision — just flow.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/14d2d43a10d34c3d4c6b0972adf6d528814959a3cff71123020904c68283e2f8.jpeg",
    href: "/playground/particle-field",
    trying:
      "I wanted organic motion without a physics engine. Curl noise gives divergence-free flow fields, so particles swirl like ink in water instead of bouncing like balls.",
    learned:
      "That 10k particles at 60fps is mostly about what you don't do: no array allocations in the frame loop, typed arrays for positions, and a single batched stroke call beats ten thousand arc() calls.",
    howItWorks:
      "A 2D simplex noise field is sampled per particle per frame; the curl (partial derivatives rotated 90°) becomes the velocity. Positions live in Float32Array, rendered as 1px fills with fading trails via a low-alpha overlay rect.",
  },
  {
    id: "silk-shader",
    index: "EXP.02",
    title: "Silk Shader",
    year: 2026,
    tech: ["WebGL", "GLSL"],
    description:
      "A fragment shader that folds procedural fabric — light, shadow and crease from pure math.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/fd0c630ad32a2ea2dbe2017bfca27a2ec08a407211186adcfe25584327da1689.jpeg",
    href: "/playground/silk-shader",
    trying:
      "Could a fragment shader alone — no geometry, no textures — produce something that reads as cloth? Everything had to come from noise, normals estimated from gradients, and one directional light.",
    learned:
      "FBM noise warped by its own derivative creates surprisingly convincing folds. The trick is domain warping: warp the sample position by a second noise field before sampling, and the folds stop looking like clouds.",
    howItWorks:
      "A fullscreen quad runs a GLSL shader: fbm(p + fbm(p)) builds the height field, surface normals come from finite differences, and lighting is a single dot product plus a thin specular edge — the lime highlight you see on the crease.",
  },
  {
    id: "kinetic-type",
    index: "EXP.03",
    title: "Kinetic Type",
    year: 2025,
    tech: ["Variable Fonts", "Motion"],
    description:
      "Typography as a physical object: weight and width axes driven by cursor velocity.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/b350e8deb0b811a54820292f565d95b651117e77f44a65c121113d4ff5bee1da.jpeg",
    href: "/playground/kinetic-type",
    trying:
      "Variable fonts expose weight and width as continuous axes. I wanted to know if driving them from pointer velocity could make type feel alive without a single image or video.",
    learned:
      "Per-character font-variation-settings updates are cheap enough for short strings but fall apart on paragraphs. Above ~80 glyphs you need canvas or WebGL text — DOM per-character animation has a hard ceiling.",
    howItWorks:
      "Pointer velocity is smoothed and mapped to the wght axis per line with a staggered lag, so motion ripples through the text like a wave. When idle, everything springs back to the baseline weight.",
  },
  {
    id: "chord-synth",
    index: "EXP.04",
    title: "Chord Synth",
    year: 2025,
    tech: ["Web Audio API", "TypeScript"],
    description:
      "A one-octave chord instrument in the browser. Click a key, get a voiced chord, not a note.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/3f168781-82f1-4f0e-a21c-b7528b8dd0d4/images/ef22d7c6edfd0944987c5c1ccacc9300cab410f547b18a39b0f649762d727ffa.jpeg",
    href: "/playground/chord-synth",
    trying:
      "Most browser synths are single-note toys. I wanted harmony: press one key and hear a properly voiced chord, with voice leading that moves smoothly between chords like a real pianist would.",
    learned:
      "The Web Audio graph is declarative and powerful, but scheduling is everything. Oscillators are disposable — create per note, stop them, let them be garbage collected. Reusing them causes clicks and stuck notes.",
    howItWorks:
      "Each key maps to a scale degree; the engine builds a triad plus extensions from the key's mode, then picks the inversion minimizing movement from the previous chord. Voices are detuned oscillator pairs through a shared lowpass filter and a feedback delay.",
  },
];
