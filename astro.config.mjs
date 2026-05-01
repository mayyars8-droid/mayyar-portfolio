// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei', 'detect-gpu'],
    },
    optimizeDeps: {
      include: ['detect-gpu'],
    },
  },

  image: {
    domains: ['img.youtube.com', 'i.imgur.com'],
  },

  adapter: cloudflare(),
});