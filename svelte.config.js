import adapterStatic from '@sveltejs/adapter-static';
import adapterAuto from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import dotenv from "dotenv";
import path from 'path';
import { readFileSync } from 'fs';

dotenv.config()

const staticMode = process.env.STATIC === 'true';

const basePath = process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://github.com/sveltejs/svelte-preprocess
	preprocess: preprocess(),
	kit: {
		adapter: staticMode ? adapterStatic() : adapterAuto(),
		paths: {
			base: staticMode ? basePath : '',
		},
		vite: {
			envPrefix: "PUBLIC_",
			define: {
				pkg: JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))
			},
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$constants: path.resolve('./src/constants'),
				}
			}
		}
	}
};

export default config;
