import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/vcpe-knowledge-base/',
  site: 'https://oystero.github.io',
  integrations: [tailwind()],
});
