/**
 * Site-wide config & content data.
 * Update these values to change copy across the portfolio without
 * touching component templates.
 */

export const SITE = {
  title: 'Mayyar Al-Sharqawi',
  tagline: 'Filmmaker · Visual Designer · AI Specialist',
  description:
    'Portfolio of Mayyar Al-Sharqawi — filmmaker, visual designer and AI specialist crafting cinematic stories, brand identities and AI-driven creative workflows for clients worldwide.',
  url: 'https://mayyar.studio',
  author: 'Mayyar Al-Sharqawi',
  location: 'Irbid, Jordan',
  email: 'mayyarj@gmail.com',
  phone: '+962 798 455 697',
  resumeHref: '/Mayyar-Al-Sharqawi-CV.pdf',
  ogImage: 'https://i.imgur.com/EYQHP8i.jpg',
  portrait: 'https://i.imgur.com/EYQHP8i.jpg',
  social: {
    linkedin: 'https://linkedin.com/in/mayyarz',
    whatsapp: 'https://wa.link/ubge62',
    linktree: 'https://linktr.ee/mayyar',
  },
  award: 'Top Rated · Upwork — 100% Job Success',
  awardSecondary: 'Top of Batch · BA Design & Visual Communication, JUST',
} as const;

export const NAV = [
  { href: '#vision', label: 'Vision' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#work', label: 'Work' },
  { href: '#reel', label: 'Reel' },
  { href: '#ai-lab', label: 'AI Lab' },
  { href: '#process', label: 'Process' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

export const ROLES = [
  'Visual Designer',
  'AI Specialist',
  'Filmmaker',
  'Video Editor',
  'Motion Designer',
  'Storyteller',
] as const;

export const MARQUEE = [
  'Visual Design',
  'AI Workflows',
  'Filmmaking',
  'Video Editing',
  'Motion Design',
  'Brand Identity',
  'Content Strategy',
  'Creative Direction',
  'Cinematography',
  'Storytelling',
] as const;

/** Vision → Intelligence → Motion → Impact narrative. */
export const DIMENSIONS = [
  {
    code: '01',
    label: 'Vision',
    title: 'Visual design with editorial intent',
    blurb:
      'Brand systems, posters and social-first visuals built on a designer foundation — typography, grid, composition.',
  },
  {
    code: '02',
    label: 'Intelligence',
    title: 'AI-augmented creative workflows',
    blurb:
      'Generative tooling woven into real production pipelines — concepting, ideation, image, video and automation.',
  },
  {
    code: '03',
    label: 'Motion',
    title: 'Filmmaking & cinematic editing',
    blurb:
      'Direction, cinematography, editing and motion design with a feel for pacing, rhythm and story.',
  },
  {
    code: '04',
    label: 'Impact',
    title: 'Content engineered for results',
    blurb:
      '300+ posts shipped, 4,500+ followers grown across platforms, satisfied international clients on Upwork.',
  },
] as const;

export const SERVICES = [
  {
    code: 'A',
    title: 'Visual Design',
    body:
      'Brand identities, posters, editorial systems and social-first visuals built on type, grid and composition.',
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma'],
    deliverables: ['Logos & systems', 'Editorial design', 'Campaign visuals'],
  },
  {
    code: 'B',
    title: 'AI Creative Direction',
    body:
      'Custom AI workflows for ideation, image and video generation, plus pipelines that compress production cycles without losing taste.',
    tools: ['Midjourney', 'Runway', 'ComfyUI', 'GPT'],
    deliverables: ['AI concept frames', 'Generative campaigns', 'Workflow design'],
  },
  {
    code: 'C',
    title: 'Filmmaking',
    body:
      'Direction and cinematography for cinematic shorts, brand films, documentary and 9:16 narrative — from script to final cut.',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Sound Design'],
    deliverables: ['Cinematic shorts', 'Brand films', 'Vertical narrative'],
  },
  {
    code: 'D',
    title: 'Video Editing & Motion',
    body:
      'Story-led edits with sharp pacing — reels, social cuts, kinetic typography and motion graphics that earn attention.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci'],
    deliverables: ['Editing reels', 'Social cuts', 'Motion design'],
  },
] as const;

export const PROCESS = [
  { code: '01', name: 'Discover', blurb: 'Map the brief, audience, references and the real story you want to tell.' },
  { code: '02', name: 'Concept', blurb: 'Direction, mood, references and a tight visual treatment before a frame is shot.' },
  { code: '03', name: 'Design / Generate', blurb: 'Design systems, storyboards, generative frames — taste-led creation, AI-assisted speed.' },
  { code: '04', name: 'Edit / Refine', blurb: 'Edit, grade, sound, motion — iterate until the rhythm and emotion land.' },
  { code: '05', name: 'Deliver', blurb: 'Master files for every channel, sized and titled. Hand-off without surprises.' },
] as const;

export const WHY = [
  { title: 'Multidisciplinary by design', body: 'One creative leading visual design, AI, filmmaking and editing — fewer hand-offs, tighter craft, faster cycles.' },
  { title: 'Top-rated on Upwork', body: '100% Job Success score on Upwork from international clients across diverse industries.' },
  { title: 'Top of batch · JUST', body: 'Ranked first in the BA Design and Visual Communication batch at the Jordan University of Science and Technology.' },
  { title: 'In-house production setup', body: 'Owns the equipment and software stack to direct, shoot, edit, design and ship — end-to-end without outsourcing.' },
  { title: 'Measurable outcomes', body: '300+ posts published, 2,000+ Instagram followers and 2,500+ Facebook followers grown for High Gate Academy.' },
  { title: 'Strategic & punctual', body: 'Marketing-aware visual direction with a track record of delivering on time, within budget — every project.' },
] as const;

export type CategoryMeta = {
  id: 'film' | 'editing' | 'motion' | 'content' | 'design' | 'ai';
  label: string;
  description: string;
};

export const CATEGORIES: CategoryMeta[] = [
  { id: 'film', label: 'Film', description: 'Cinematic shorts, narrative, documentary' },
  { id: 'editing', label: 'Editing', description: 'Reels, social cuts, story pacing' },
  { id: 'motion', label: 'Motion', description: 'Animation, kinetic type, transitions' },
  { id: 'content', label: 'Content', description: 'Twig Tech — Arabic creator work' },
  { id: 'design', label: 'Design', description: 'Brand identity, posters, campaigns' },
  { id: 'ai', label: 'AI Lab', description: 'Generative workflows & creative automation' },
];
