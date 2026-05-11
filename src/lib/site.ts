export const SITE = {
  title: 'Mayyar Al-Sharqawi',
  role: 'AI Product Visuals & Video Ad Creator',
  tagline: 'AI Product Visuals & Video Ad Creator',
  description:
    'I build AI-powered product images and short video ads for DTC brands and tech startups. Faster than a studio, sharper than a freelancer. Productized pricing, 3-day turnarounds.',
  url: 'https://mayyar.studio',
  author: 'Mayyar Al-Sharqawi',
  email: '',
  // Replace with your real Calendly link before launch — every CTA on the site routes here.
  calendly: 'https://calendly.com/mayyar/intro-call',
  // Lead-magnet form posts to Netlify Forms (auto-detected on Netlify deploys).
  leadFormName: 'free-ai-mock',
  social: {
    linkedin: 'http://linkedin.com/in/mayyarz',
    whatsapp: 'https://wa.link/ubge62',
    upwork: 'https://www.upwork.com/freelancers/mayyaralsharqawi',
    instagram: 'https://www.instagram.com/',
  },
  twigTech: 'Twig Tech',
  award: 'Top Rated · 100% JSS · $2K+ earned on Upwork',
  portrait: 'https://i.imgur.com/EYQHP8i.jpg',
} as const;

export const NAV = [
  { href: '/#services', label: 'Services' },
  { href: '/#case-studies', label: 'Case Studies' },
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
] as const;

export const ROLES = [
  'AI Product Photography',
  'AI Video Ads',
  'Short-form Social',
  'Brand Visuals',
  'Motion Design',
  'Prompt Engineering',
] as const;

export const CREDIBILITY = [
  { value: 'Top Rated', label: 'on Upwork' },
  { value: '100%', label: 'Job Success Score' },
  { value: '$2K+', label: 'earned · 15+ clients' },
  { value: '#1', label: 'Top of Batch · JUST' },
] as const;

export type Service = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  turnaround: string;
  pitch: string;
  forWho: string;
  deliverables: string[];
  notIncluded: string[];
  bestFor: string;
  badge?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'product-pack',
    name: 'AI Product Pack',
    price: '$400',
    cadence: 'fixed',
    turnaround: '3-day delivery',
    pitch:
      'Ten polished, on-brand product visuals built with AI — model shots, lifestyle scenes, ad-ready hero images. Shot day in your inbox, without the shoot day.',
    forWho:
      'Skincare, supplements, fashion, accessories — DTC brands launching or refreshing a product line.',
    deliverables: [
      '10 product images (4 hero · 3 lifestyle · 3 model)',
      '1080×1350, 1080×1080 + 1920×1080 export sizes',
      '1 round of revisions',
      'Print-resolution master files',
    ],
    notIncluded: [
      'No physical photoshoot (AI-generated, on-brand)',
      'Source .PSD files on request — billed separately',
    ],
    bestFor: 'Catalog refresh · Amazon A+ · DTC product pages',
  },
  {
    id: 'ad-sprint',
    name: 'AI Ad Sprint',
    price: '$700',
    cadence: 'fixed',
    turnaround: '5-day delivery',
    pitch:
      'Three short-form video ads (8–15s each) built with AI video, motion design and tight copy hooks. Meta-ready, TikTok-ready, paid-creative-ready.',
    forWho: 'DTC brands and SaaS startups running paid social — Meta, TikTok, Reels, Shorts.',
    deliverables: [
      '3 vertical (9:16) ad cuts · 1 horizontal master',
      '3 hook variants per ad (for A/B testing)',
      'Captions, sound design, kinetic type',
      '1 round of revisions per cut',
    ],
    notIncluded: [
      'No paid-ad management or media spend',
      'Talent licensing for real-person UGC sourced separately',
    ],
    bestFor: 'Launch campaign · creative refresh · winning ad iteration',
    badge: 'Most popular',
  },
  {
    id: 'social-retainer',
    name: 'Social Content Retainer',
    price: '$500',
    cadence: '/month',
    turnaround: 'weekly delivery',
    pitch:
      'A done-for-you monthly content engine: 12 on-brand statics + 4 short videos every month. Built with AI, polished by hand, scheduled to a content calendar.',
    forWho: 'DTC brands and startups that need consistent feed presence without hiring in-house.',
    deliverables: [
      '12 static posts (monthly)',
      '4 short-form videos (Reels / TikTok / Shorts)',
      '1 content calendar (Notion or Sheets)',
      'Async Slack/email support',
    ],
    notIncluded: [
      'No copywriting strategy beyond captions',
      'No community management',
      'Ad-spend management not included',
    ],
    bestFor: 'Brand consistency · feed growth · long-term content engine',
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  meta?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Mayyar turned around a full month of AI-generated social content faster than my last agency did in two weeks — and it actually looked on-brand.',
    author: 'Long-term Upwork client',
    role: 'Social media content · monthly retainer',
    meta: '6+ months, ongoing',
  },
  {
    quote:
      'The product images Mayyar generated looked like a full photoshoot. The cost difference was the budget for a whole second ad campaign.',
    author: 'DTC founder',
    role: 'AI product imagery · fixed engagement',
  },
  {
    quote:
      'Top Rated on Upwork with 100% job success across 15+ clients. The portfolio reflects the rating.',
    author: 'Upwork',
    role: 'Platform credential',
  },
];

export type ProjectCategory = 'film' | 'editing' | 'motion' | 'content' | 'design' | 'ai';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'film',
  'editing',
  'motion',
  'content',
  'design',
  'ai',
];

export type CategoryMeta = {
  id: ProjectCategory;
  label: string;
  description: string;
};

export const CATEGORIES: CategoryMeta[] = [
  { id: 'ai', label: 'AI Ads', description: 'AI-generated product visuals & video ads' },
  { id: 'design', label: 'Design', description: 'Brand identity, posters, campaigns' },
  { id: 'motion', label: 'Motion', description: 'Animation, kinetic type, transitions' },
  { id: 'editing', label: 'Editing', description: 'Reels, social cuts, story pacing' },
  { id: 'content', label: 'Content', description: 'Twig Tech — Arabic creator work' },
  { id: 'film', label: 'Film', description: 'Cinematic shorts, narrative, documentary' },
];
