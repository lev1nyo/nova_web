import { defineConfig } from 'astro/config';

// build.format: 'file' зберігає оригінальні URL сайту: /about.html, /products.html тощо.
export default defineConfig({
  site: 'https://www.novacleanua.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'file' },
});
