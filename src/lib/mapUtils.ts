export type ArrayPoint = [number, number];

const earthRadius = 6371; // km
const toRad = (coordinate: number) => (coordinate * Math.PI) / 180;

/** Distancia como número */
export const distance = ([lat1, lon1]: ArrayPoint, [lat2, lon2]: ArrayPoint): number => {
	// https://en.wikipedia.org/wiki/Haversine_formula
	const rDLat = toRad(lat2 - lat1);
	const rDLon = toRad(lon2 - lon1);
	const rLat1 = toRad(lat1);
	const rLat2 = toRad(lat2);

	const partial =
		Math.pow(Math.sin(rDLat / 2), 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.pow(Math.sin(rDLon / 2), 2);
	return 2 * earthRadius * Math.asin(Math.sqrt(partial));
};

/** Distancia com string */
export const distanceH = (p1: ArrayPoint, p2: ArrayPoint): string => {
	const d = distance(p1, p2);
	const scale = Math.log10(d);

	if (scale > 0) {
		return `${Math.round(d)}Km`;
	} else {
		return `${Math.round(d * 1e3)}m`;
	}
};
