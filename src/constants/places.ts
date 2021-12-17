import placesData from './places.json';

export const { places, updated_at: updatedAt } = placesData;
export type Place = (typeof places)[number];
