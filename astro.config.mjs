import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	server: {
		host: true
	},
	integrations: [
		compress(), 
		mdx(), 
		tailwind(), 
		icon({
			include: {
				// Conjuntos de ícones que estão sendo usados no projeto
				'mdi': ['rocket'],
				'ion': ['star-outline', 'bookmark-outline']
			}
		})
	],
	vite: {
		cacheDir: path.resolve(__dirname, '.vite-cache')
	}
})
