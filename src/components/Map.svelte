<script context="module" lang="ts">
	import type Leaflet from 'leaflet';
	import type { Map, MapOptions, LayerGroup, Icon } from 'leaflet';
	import type { Place } from '$constants/places';

	const options: MapOptions = { zoomControl: false, minZoom: 15 };
	const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
</script>

<script lang="ts">
	// TODO: ordenar esto

	import 'leaflet/dist/leaflet.css';
	// import 'leaflet.locatecontrol/dist/L.Control.Locate.css';

	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { staticPath } from '$lib/paths';

	export let location: [number, number] = [-33.4985693, -70.6129549];
	export let zoom: number = 16;

	export let locationButtom: HTMLElement;
	export let currentLocation: [number, number] = null;

	export let results: Place[] = [];
	export let onMarkerClick: (result: Place, index: number) => void;

	let mapElement: HTMLElement;
	let L: typeof Leaflet;
	let map: Map;
	let markersLayer: LayerGroup;
	let icon: Icon;

	$: {
		if (map) {
			markersLayer.clearLayers();
			results.forEach((result, i) => {
				const {
					latLng: [lat, lng]
				} = result;
				const marker = L.marker([lat, lng], { icon });
				marker.on('click', () => onMarkerClick(result, i));
				markersLayer.addLayer(marker);
			});
		}
	}

	$: if (map) map.flyTo(location, zoom);

	onMount(async () => {
		if (!browser || map) return;
		// Ver https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js
		L = await import('leaflet');
		await import('leaflet.locatecontrol');

		map = L.map(mapElement, options).setView(location, zoom);

		icon = L.icon({
			iconUrl: staticPath('assets/logo-dark.svg'),
			iconSize: [40, 40],
			shadowUrl: staticPath('assets/logo-shadow.svg'),
			shadowSize: [40, 40],
			shadowAnchor: [11, 18]
		});

		markersLayer = new L.LayerGroup();
		markersLayer.addTo(map);

		const mapLayer = L.tileLayer(mapURL, { attribution });
		mapLayer.addTo(map);

		const dummyElement = document.createElement('div');
		L.control
			.locate({ createButtonCallback: () => ({ link: locationButtom, icon: dummyElement }) })
			.addTo(map);

		// Event liseners
		map.on('locationfound', (locationEvent) => {
			const { lat, lng } = locationEvent.latlng;
			currentLocation = [lat, lng];
		});
		map.on('zoomend', () => {
			const newZoom = map.getZoom();
			if (newZoom !== zoom) zoom = newZoom;
		});
		map.on('moveend', () => {
			const { lat, lng } = map.getCenter();
			location = [lat, lng];
		});
	});
</script>

<div bind:this={mapElement} id="map" />

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
