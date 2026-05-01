export const SITE = {
  title: 'Mayyar Al-Sharqawi',
  tagline: 'Filmmaker · Visual Designer · AI Specialist',
  description:
    'Portfolio of Mayyar Al-Sharqawi — filmmaker, visual designer, and AI specialist. Cinematic storytelling, brand-led design and AI-powered creative workflows.',
  url: 'https://mayyar.studio',
  author: 'Mayyar Al-Sharqawi',
  email: '',
  social: {
    linkedin: 'http://linkedin.com/in/mayyarz',
    whatsapp: 'https://wa.link/ubge62',
    linktree: 'https://linktr.ee/mayyar',
  },
  twigTech: 'Twig Tech',
  award: 'Top Student of the Batch — Ranked 1st · JUST',
  portrait: 'https://i.imgur.com/EYQHP8i.jpg',
} as const;

export const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#ai-lab', label: 'AI Lab' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

export const ROLES = [
  'Filmmaker',
  'Visual Designer',
  'Full-Stack Designer',
  'Motion Designer',
  'AI Specialist',
  'Storyteller',
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
