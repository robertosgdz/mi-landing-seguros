// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react')) {
              return 'react-vendor';
            }
          }
        }
      }
    }
  },
  integrations: [react()]
});
