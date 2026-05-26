// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'http://178.105.17.88',
  integrations: [react(), icon()],
});