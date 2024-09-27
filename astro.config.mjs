import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://Applequist.github.io',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	markdown: {
		syntaxHighlight: 'prism'
	}
});
