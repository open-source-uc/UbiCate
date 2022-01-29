<script context="module" lang="ts">
	import type Leaflet from 'leaflet';
	import type { Map, Marker, MapOptions } from 'leaflet';
	import type { Place } from '$lib/types';

	const options: MapOptions = { zoomControl: false, minZoom: 15 };
	const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
</script>

<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Field from '$components/Material/Field.svelte';
	import { categories } from '$constants/categories';
	import CheckBox from '$components/Material/CheckBox.svelte';

	const place = writable({} as unknown as Place);

	const posibleCampuses: [string, string][] = [['SJ', 'San joaquín']];

	let L: typeof Leaflet;
	let map: Map;
	let mapElement: HTMLElement;
	let marker: Marker;

	onMount(async () => {
		if (!browser || map) return;
		L = await import('leaflet');
		map = L.map(mapElement, options).setView([-33.4985693, -70.6129549], 16);
		marker = L.marker([-33.4985693, -70.6129549], { draggable: true });

		const mapLayer = L.tileLayer(mapURL, { attribution });

		mapLayer.addTo(map);
		marker.addTo(map);
	});

	$: {
		console.log($place);
	}
</script>

<div>
	<div id="map" bind:this={mapElement} />
	<form action="">
		<h1>Crear ubicación</h1>
		<Field label="Nombre" value={$place.name} required helperText={'Requerido'} />
		<Field label="Capus" type="select" value={$place.campus} options={{ options: posibleCampuses }} />
		<Field label="Piso" type="number" helperText="Entre -2 y 30" value={$place.floor} options={{ min: -2, max: 30 }} />
		<Field label="Descripción" type="area" value={$place.description} />
		<div>
			<h2 class="sub-title">Categorias</h2>
			{#each categories as category}
				<div>
					<CheckBox label={category.name} />
				</div>
			{/each}
		</div>
	</form>
</div>

<style>
	#map {
		height: 300px;
	}
	form {
		padding: 2em;
	}
	.sub-title {
		font-size: 2em;
	}
</style>
