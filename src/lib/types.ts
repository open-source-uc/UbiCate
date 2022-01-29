// Response models from UbicateAPI
export type UserInfo = {
	email: string;
	name: string;
	given_name: string;
	picture: string;
	iat: Date;
	exp: Date;
	token: string;
};

type Point = [number, number];
type Geometry<K extends string, T> = { type: K; coordinates: T };

type LatLng = Geometry<'Point', Point>;
type Polygon = Geometry<'Polygon', Point[][]>;

type Link = { name: string; href: string };

export type Place = {
	_id: string;
	name: string;
	campus: string;
	categories: string[];
	alternative_names: string[];
	description?: string;
	latLng: LatLng;
	links: Link[];
	floor: number;
	polygon?: Polygon;
	version: number;
	slug?: string;
	parent_id?: string;
	created_at: Date;
	updated_at: Date;
};
