import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	site: 'https://Applequist.github.io',
	trailingSlash: 'always',
	integrations: [
		mdx(), 
		sitemap(), 
		partytown({
			config: {
				forward: ["dataLayer.push"],
			}
		})
	],
	markdown: {
		syntaxHighlight: 'prism'
	}
});
