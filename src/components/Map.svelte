<script context="module" lang="ts">
	import type Leaflet from 'leaflet';
	import type { Map, MapOptions, LayerGroup, Icon } from 'leaflet';
	import type { Place } from '$lib/types';

	const options: MapOptions = { zoomControl: false, minZoom: 15 };
	const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const createPopupContent = (place: Place): string => {
		const popup = document.createElement('div');
		const nameE = document.createElement('div');
		const editE = document.createElement('a');
		popup.appendChild(nameE);
		popup.appendChild(editE);
		nameE.textContent = place.name;
		editE.textContent = 'Editar';
		editE.href = `/places/edit?id=${place._id}`;

		return popup.outerHTML;
	};
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

	export let locate: () => void;
	export let currentLocation: [number, number] = null;

	export let results: Place[] = [];
	export let onMarkerClick: (result: Place, index: number) => void;

	let mapElement: HTMLElement;
	let L: typeof Leaflet;
	let map: Map;
	let markersLayer: LayerGroup;
	let icon: Icon;
	let locateControl: Leaflet.Control.Locate;

	$: {
		if (map) {
			markersLayer.clearLayers();
			results.forEach((result, i) => {
				const marker = L.marker(result.latLng.coordinates, { icon });
				marker.bindPopup(createPopupContent(result));
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
		const dummyElement = document.createElement('div');
		const dummyButtom = document.createElement('a');
		locate = () => dummyButtom.dispatchEvent(new Event('click'));
		locateControl = L.control
			.locate({ createButtonCallback: () => ({ link: dummyButtom, icon: dummyElement }) })
			.addTo(map);
	});
</script>

<div bind:this={mapElement} id="map" />

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
