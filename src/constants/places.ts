import fallback_places_json from './places.json';

export const fallback_places = fallback_places_json;
export type Place = typeof fallback_places[number];
