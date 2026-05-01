import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCategories = [
  'film',
  'editing',
  'motion',
  'content',
  'design',
  'ai',
] as const;

const mediaSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('youtube'),
    src: z.string().url(),
    poster: z.string().optional(),
  }),
  z.object({
    type: z.literal('video'),
    src: z.string(),
    poster: z.string().optional(),
  }),
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string().optional(),
  }),
  z.object({
    type: z.literal('gallery'),
    images: z.array(z.object({ src: z.string(), alt: z.string().optional() })),
  }),
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(projectCategories),
    tagline: z.string().optional(),
    year: z.number().int().optional(),
    featured: z.boolean().default(false),
    vertical: z.boolean().default(false),
    thumbnail: z.string(),
    media: mediaSchema,
    tags: z.array(z.string()).default([]),
    order: z.number().int().default(0),
    external: z.string().url().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    type: z.enum(['experience', 'education']),
    period: z.string(),
    location: z.string().optional(),
    employment: z.string().optional(),
    award: z.string().optional(),
    order: z.number().int().default(0),
  }),
});

export const collections = { projects, experience };

export type ProjectCategory = (typeof projectCategories)[number];
export const PROJECT_CATEGORIES = projectCategories;
