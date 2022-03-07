<!-- __layout.svelte is not enought for this use case -->
<script context="module" lang="ts">
	import type Leaflet from 'leaflet';
	import type { Map, Marker, MapOptions } from 'leaflet';

	const options: MapOptions = { zoomControl: false, minZoom: 15 };
	const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
</script>

<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import Icon from '$components/Material/Icon.svelte';
	import { goback, staticPath } from '$lib/paths';

	let L: typeof Leaflet = undefined;
	let map: Map;
	let mapElement: HTMLElement;
	let marker: Marker;

	export let editable: boolean = false;
	export let markerPosition: [number, number] = [-33.4985693, -70.6129549];

	onMount(async () => {
		if (!browser || map) return;
		L = await import('leaflet');
		map = L.map(mapElement, options).setView([-33.4985693, -70.6129549], 16);
		const mapLayer = L.tileLayer(mapURL, { attribution });
		mapLayer.addTo(map);

		const icon = L.icon({
			iconUrl: staticPath('assets/logo-dark.svg'),
			iconSize: [40, 40],
			shadowUrl: staticPath('assets/logo-shadow.svg'),
			shadowSize: [40, 40],
			shadowAnchor: [11, 18]
		});

		marker = L.marker([-33.4985693, -70.6129549], { draggable: editable, icon });
		marker.on('dragend', () => {
			const { lat, lng } = marker.getLatLng();
			markerPosition = [lat, lng];
		});
		marker.addTo(map);
	});
</script>

<div>
	<div class="title-container">
		<Icon iconName="arrow_back" clickable on:click={() => goback()} />
		<h1><slot name="title" /></h1>
	</div>
	<div id="map" bind:this={mapElement}>Map</div>
	<main>
		<slot {L} {map} {marker} {markerPosition} />
	</main>
</div>

<style>
	h1 {
		font-size: 0.6em;
	}
	.title-container {
		display: flex;
		align-items: center;
		padding: 1em 0.6em;
		gap: 10px;
	}
	#map {
		height: 300px;
	}
</style>
