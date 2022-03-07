import type pkgJSON from '~/package.json';
export type PKG = typeof pkgJSON;

declare global {
	const pkg: PKG;
}
