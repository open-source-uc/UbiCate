// https://kit.svelte.dev/docs#loading
// > load is similar to getStaticProps or getServerSideProps in Next.js,
// > except that it runs on both the server and the client.
import type { Load } from '@sveltejs/kit';
import type { Place } from '$lib/types';

export const loadPlace: Load = async ({ fetch, url: { searchParams } }) => {
	const placeId = searchParams.get('id');
	if (!placeId) return { redirect: '../', status: 422, error: new Error('missing place id') };

	const response = await fetch(`${import.meta.env.PUBLIC_API}/places/${placeId}`);
	const { status, statusText, ok } = response;

	if (status === 422) {
		return { status, error: new Error('Invalid ID') };
	}

	if (status === 404) {
		return { status, error: new Error("Coun't find place in the API") };
	}

	if (!ok) {
		return { status, error: new Error(`Something bad happened: ${statusText}`) };
	}

	const place: Place = await response.json();

	return { props: { place } };
};
