import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const yt = (id) => `https://www.youtube.com/embed/${id}`;
// hqdefault is reliable for all YouTube videos (480x360); maxresdefault often 404s.
const ytMaxThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/**
 * @typedef {Object} ProjectInput
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} [tagline]
 * @property {number} [year]
 * @property {boolean} [featured]
 * @property {boolean} [vertical]
 * @property {string} [thumbnail]
 * @property {{ type: string, src?: string, images?: any[] }} media
 * @property {string[]} [tags]
 * @property {number} [order]
 * @property {string} [body]
 */

/** @type {ProjectInput[]} */
const projects = [
  // ---------- Filmmaking ----------
  {
    slug: 'film-project',
    title: 'Cinematic Short — Project I',
    category: 'film',
    tagline: 'A character-driven cinematic piece exploring quiet moments.',
    year: 2024,
    featured: true,
    order: 10,
    thumbnail: ytMaxThumb('qA1KNwRX75c'),
    media: { type: 'youtube', src: yt('qA1KNwRX75c') },
    tags: ['filmmaking', 'cinematic', 'narrative'],
    body: 'Directed and edited cinematic short emphasising mood and pacing. Shot handheld with a colour-graded palette to support the emotional beat of the story.',
  },
  {
    slug: 'documentary',
    title: 'Documentary Feature',
    category: 'film',
    tagline: 'Observational documentary work — real people, real stakes.',
    year: 2024,
    featured: true,
    order: 9,
    thumbnail: ytMaxThumb('EhbIcBkhHMQ'),
    media: { type: 'youtube', src: yt('EhbIcBkhHMQ') },
    tags: ['filmmaking', 'documentary'],
    body: 'A documentary piece weaving interview footage and verité moments into a tight narrative arc.',
  },
  {
    slug: 'short-film',
    title: 'Short Film',
    category: 'film',
    tagline: 'A tightly-paced short with strong visual identity.',
    year: 2023,
    featured: false,
    order: 8,
    thumbnail: ytMaxThumb('5Q6o5hqm6w0'),
    media: { type: 'youtube', src: yt('5Q6o5hqm6w0') },
    tags: ['filmmaking', 'short'],
  },
  {
    slug: 'vertical-film',
    title: 'Vertical Film',
    category: 'film',
    tagline: 'Cinematic storytelling re-thought for 9:16.',
    year: 2024,
    featured: false,
    vertical: true,
    order: 7,
    thumbnail: ytMaxThumb('6uim12-Bk_Y'),
    media: { type: 'youtube', src: yt('6uim12-Bk_Y') },
    tags: ['filmmaking', 'vertical', 'social'],
  },

  // ---------- Editing ----------
  {
    slug: 'edit-reel',
    title: 'Editing Reel',
    category: 'editing',
    tagline: 'Cuts, rhythm, and pacing — a sampler of editing work.',
    year: 2024,
    featured: true,
    vertical: true,
    order: 6,
    thumbnail: ytMaxThumb('cPCQmcvWbC8'),
    media: { type: 'youtube', src: yt('cPCQmcvWbC8') },
    tags: ['editing', 'reel'],
  },
  {
    slug: 'social-edit',
    title: 'Social Edit',
    category: 'editing',
    tagline: 'Snappy, platform-native edits built for the feed.',
    year: 2024,
    vertical: true,
    order: 5,
    thumbnail: ytMaxThumb('NLh0d2R6DLw'),
    media: { type: 'youtube', src: yt('NLh0d2R6DLw') },
    tags: ['editing', 'social'],
  },
  {
    slug: 'quick-cut',
    title: 'Quick Cut',
    category: 'editing',
    tagline: 'High-energy cut that lives or dies on the first three seconds.',
    year: 2024,
    vertical: true,
    order: 4,
    thumbnail: ytMaxThumb('ps474JsLKXw'),
    media: { type: 'youtube', src: yt('ps474JsLKXw') },
    tags: ['editing', 'short'],
  },

  // ---------- Motion ----------
  {
    slug: 'motion-reel',
    title: 'Motion Reel',
    category: 'motion',
    tagline: 'Kinetic typography, branded transitions, and 2D animation.',
    year: 2024,
    featured: true,
    order: 3,
    thumbnail: ytMaxThumb('rXmMGMsptOY'),
    media: { type: 'youtube', src: yt('rXmMGMsptOY') },
    tags: ['motion', 'animation', 'reel'],
  },
  {
    slug: 'animated-piece',
    title: 'Animated Piece',
    category: 'motion',
    tagline: 'A standalone animated piece exploring shape and rhythm.',
    year: 2023,
    order: 2,
    thumbnail: ytMaxThumb('jVNj1tbTTC8'),
    media: { type: 'youtube', src: yt('jVNj1tbTTC8') },
    tags: ['motion', 'animation'],
  },

  // ---------- Content (Twig Tech) ----------
  {
    slug: 'twig-tech-feature',
    title: 'Twig Tech — Feature Episode',
    category: 'content',
    tagline: 'Cinematic Arabic tech storytelling.',
    year: 2024,
    featured: true,
    vertical: true,
    order: 12,
    thumbnail: ytMaxThumb('hqmtwFmK7Is'),
    media: { type: 'youtube', src: yt('hqmtwFmK7Is') },
    tags: ['content', 'arabic', 'twig-tech'],
    body: 'Episode from Twig Tech — an Arabic tech content brand exploring the intersection of technology and creativity.',
  },
  {
    slug: 'twig-tech-tips',
    title: 'Twig Tech — Tips',
    category: 'content',
    tagline: 'Tight, value-first vertical content.',
    year: 2024,
    vertical: true,
    order: 11,
    thumbnail: ytMaxThumb('PQCHz2eeuaM'),
    media: { type: 'youtube', src: yt('PQCHz2eeuaM') },
    tags: ['content', 'arabic', 'twig-tech'],
  },
  {
    slug: 'twig-tech-arabic',
    title: 'Twig Tech — Arabic Tech',
    category: 'content',
    tagline: 'Arabic-first explainer with a clean visual system.',
    year: 2024,
    vertical: true,
    order: 10,
    thumbnail: ytMaxThumb('ArONMzhOK-A'),
    media: { type: 'youtube', src: yt('ArONMzhOK-A') },
    tags: ['content', 'arabic', 'twig-tech'],
  },

  // ---------- AI ----------
  {
    slug: 'ai-content-pipeline',
    title: 'AI Content Pipeline',
    category: 'ai',
    tagline: 'Custom AI workflows that supercharge content production.',
    year: 2024,
    featured: true,
    order: 14,
    thumbnail: ytMaxThumb('RrR9pCQUQSM'),
    media: { type: 'youtube', src: yt('RrR9pCQUQSM') },
    tags: ['ai', 'workflow', 'automation'],
    body: 'Designed an end-to-end content pipeline blending generative tools with manual creative direction — drafting, visualising, editing and publishing at agency speed.',
  },
  {
    slug: 'generative-visuals',
    title: 'Generative Visuals',
    category: 'ai',
    tagline: 'Concept frames and worldbuilding via prompt engineering.',
    year: 2024,
    featured: true,
    order: 13,
    thumbnail: ytMaxThumb('17qZRm-F-wM'),
    media: { type: 'youtube', src: yt('17qZRm-F-wM') },
    tags: ['ai', 'midjourney', 'stable-diffusion'],
  },
  {
    slug: 'ai-video-generation',
    title: 'AI Video Generation',
    category: 'ai',
    tagline: 'Pushing motion further with AI video tools.',
    year: 2024,
    order: 12,
    thumbnail: ytMaxThumb('S6-O3k3a-FI'),
    media: { type: 'youtube', src: yt('S6-O3k3a-FI') },
    tags: ['ai', 'runwayml', 'video'],
  },
  {
    slug: 'creative-automation',
    title: 'Creative Automation',
    category: 'ai',
    tagline: 'Rapid prototyping and ideation, accelerated by AI.',
    year: 2024,
    order: 11,
    thumbnail: ytMaxThumb('fVBRfruf7Bc'),
    media: { type: 'youtube', src: yt('fVBRfruf7Bc') },
    tags: ['ai', 'prototyping'],
  },
];

// Designs (9) — stored as image projects
const designSrcs = [
  ['identity-01', 'PMV9AVi'],
  ['identity-02', 'GLBKPz8'],
  ['identity-03', 'wAe3umW'],
  ['poster-01', 'Y9d63TQ'],
  ['poster-02', 'QavGIo3'],
  ['poster-03', '2Imivvt'],
  ['campaign-01', 'll8Bzbk'],
  ['campaign-02', 'Rha8z9f'],
  ['campaign-03', 'wZ63vEG'],
];

designSrcs.forEach(([slug, id], i) => {
  projects.push({
    slug: `design-${slug}`,
    title: `Visual Identity · ${String(i + 1).padStart(2, '0')}`,
    category: 'design',
    tagline: 'Brand and editorial design work.',
    year: 2024,
    featured: i < 3,
    order: 100 - i,
    thumbnail: `https://i.imgur.com/${id}.jpg`,
    media: { type: 'image', src: `https://i.imgur.com/${id}.jpg` },
    tags: ['design', 'graphic'],
  });
});

// Write project files
mkdirSync(join(root, 'src/content/projects'), { recursive: true });
for (const p of projects) {
  const { slug, body, ...frontmatter } = p;
  const fm = JSON.stringify(frontmatter, null, 2);
  const md = `---\n${toYaml(frontmatter)}---\n\n${body ?? ''}\n`;
  writeFileSync(join(root, 'src/content/projects', `${slug}.md`), md);
}

// ---------- Experience ----------
const experience = [
  {
    slug: 'highgate',
    role: 'Head of Media Department',
    company: 'High Gate Academy for Excellence',
    type: 'experience',
    period: '08/2025 — Present',
    location: 'On-Site',
    employment: 'Full-time',
    order: 100,
    body: "Overseeing the institution's entire visual narrative. Combining hands-on technical expertise in filmmaking, video editing, and graphic design with strategic leadership. Supervising the media team to ensure seamless workflow and high-quality output, producing engaging content that highlights student achievements and school milestones.",
  },
  {
    slug: 'freelance-online',
    role: 'Video Editor · Graphic Designer · Motion Designer',
    company: 'Freelancing Online Platforms',
    type: 'experience',
    period: '05/2025 — Present',
    location: 'Remote',
    order: 90,
    body: 'Collaborating with international clients across diverse industries, delivering high-quality video editing, graphic design, motion graphics, and AI-generated visual content. Working with multicultural teams and audiences, creating innovative content for multiple social media platforms worldwide.',
  },
  {
    slug: 'freelance-onsite',
    role: 'Filmmaker and Video Editor',
    company: 'Freelance (On-Site)',
    type: 'experience',
    period: '07/2020 — Present',
    location: 'Jordan',
    order: 80,
    body: 'Delivering high-quality designs that consistently exceed client expectations. Successfully managing a wide range of projects including logos, branding materials, web graphics, and print collateral. Known for punctuality and versatility in handling various creative tasks.',
  },
  {
    slug: 'email-solutions',
    role: 'Social Media Visual Designer & Video Editor',
    company: 'Email Solutions',
    type: 'experience',
    period: '05/2024 — 05/2025',
    location: 'Amman, Jordan',
    order: 70,
    body: 'Boosted engagement, brand recognition, and sales through award-winning visuals and videos. Led teams to deliver high-impact projects on time and within budget.',
  },
  {
    slug: 'blacn',
    role: 'Graphic Designer & Video Editor',
    company: 'BLAC N Agency · Internship',
    type: 'experience',
    period: '07/2023 — 09/2023',
    location: 'Irbid, Jordan',
    order: 60,
    body: "Managed editorial and social media content for thousands of monthly unique users. Strategically developed and executed video marketing campaigns aimed at expanding the company's audience.",
  },
  {
    slug: 'jpsa',
    role: 'Graphic Designer',
    company: "JPSA-IPSF (Jordan Pharmaceutical Students' Association)",
    type: 'experience',
    period: '09/2020 — 10/2021',
    location: 'Amman, Jordan',
    order: 50,
    body: 'Conceptualized and designed over five visual identity projects. Managed up to 5 projects simultaneously while meeting weekly deadlines. Curated and designed monthly medical print campaigns for numerous healthcare events.',
  },
  {
    slug: 'just-bachelor',
    role: 'Bachelor of Arts in Design and Visual Communication',
    company: 'JUST — Jordanian University of Science and Technology',
    type: 'education',
    period: '09/2020 — 02/2024',
    location: 'Irbid, Jordan',
    award: 'Top Student of the Batch — Ranked 1st',
    order: 40,
    body: 'Studied graphic design and design for digital media, developing creative skills and knowledge that qualify participation in the design market and overall development process.',
  },
];

mkdirSync(join(root, 'src/content/experience'), { recursive: true });
for (const e of experience) {
  const { slug, body, ...frontmatter } = e;
  const md = `---\n${toYaml(frontmatter)}---\n\n${body ?? ''}\n`;
  writeFileSync(join(root, 'src/content/experience', `${slug}.md`), md);
}

console.log(`Wrote ${projects.length} projects and ${experience.length} experience entries.`);

function toYaml(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  let out = '';
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v === null) {
      out += `${pad}${k}: null\n`;
    } else if (typeof v === 'string') {
      out += `${pad}${k}: ${quote(v)}\n`;
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      out += `${pad}${k}: ${v}\n`;
    } else if (Array.isArray(v)) {
      if (v.length === 0) {
        out += `${pad}${k}: []\n`;
      } else if (v.every((x) => typeof x === 'string')) {
        out += `${pad}${k}: [${v.map(quote).join(', ')}]\n`;
      } else {
        out += `${pad}${k}:\n`;
        for (const item of v) {
          out += `${pad}  -\n`;
          for (const [ik, iv] of Object.entries(item)) {
            out += `${pad}    ${ik}: ${quote(String(iv))}\n`;
          }
        }
      }
    } else if (typeof v === 'object') {
      out += `${pad}${k}:\n`;
      out += toYaml(v, indent + 1);
    }
  }
  return out;
}

function quote(s) {
  if (/^[A-Za-z0-9_\-./:?#@&=%+ ,'’]+$/.test(s) && !s.includes(': ') && !s.startsWith('-') && !s.startsWith('!')) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return JSON.stringify(s);
}
