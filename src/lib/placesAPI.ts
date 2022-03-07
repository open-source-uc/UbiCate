import type { Load } from '@sveltejs/kit';
import type { LatLng, Place, Point } from '$lib/types';

type RequestOptions = RequestInit & { fetch?: typeof fetch; token?: string };
type StrRecord = Record<string, any>;
export type Response<T extends StrRecord> = Promise<[T, null] | [null, { status: number; detail?: StrRecord }]>;

export type PlaceInput = {
	name?: string;
	campus?: string;
	description?: string;
	floor?: number;
	categories?: string[];
	latLng?: LatLng;
	markerPosition?: Point;
};

const request = async <T>(
	path: string,
	{ token, fetch = window?.fetch, ...options }: RequestOptions = {}
): Response<T> => {
	if (!options.headers) options.headers = {};
	if (token) options.headers['Auth-Token'] = token;
	options.headers['Content-Type'] = 'application/json';
	let response: globalThis.Response;
	try {
		response = await fetch(`${import.meta.env.PUBLIC_API}/${path}`, options);
	} catch (error) {
		return [null, { status: 503, detail: error instanceof Error ? error.message : error }];
	}
	const { status, ok } = response;
	const data = await response.json();
	return ok ? [data, null] : [null, { status, detail: data?.detail }];
};

export const API = {
	places: {
		all(): Response<Place[]> {
			return request('places');
		},
		get(id: string, token: string) {
			return request<Place>(`places/${id}`, { token });
		},
		create(place: PlaceInput, token: string): Response<Place> {
			return request('places', { body: JSON.stringify(place), method: 'POST', token });
		},
		patch(id: string, place: PlaceInput, token: string): Response<Place> {
			return request(`places/${id}`, { body: JSON.stringify(place), method: 'PATCH', token });
		}
	}
};

/**
 * Load is similar to getStaticProps or getServerSideProps in Next.js,
 * except that it runs on both the server and the client.
 */
export const loadPlace: Load = async ({ fetch, url: { searchParams } }) => {
	const placeId = searchParams.get('id');
	if (!placeId) return { redirect: '../', status: 422, error: new Error('missing place id') };

	const response = await request<Place>(`places/${placeId}`, { fetch });
	const [data, error] = response;
	return error ? { status: error.status, datails: error.detail } : { props: { place: data } };
};
