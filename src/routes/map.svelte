<script context="module" lang="ts">
	import type { Place } from '$lib/types';
	import { API } from '$lib/placesAPI';
	import { categories } from '$constants/categories';
	import { fallback_places } from '$constants/places';

	let places: Place[] = fallback_places as any;

	// TODO: añadir algoritmo de busqueda decente (con WebAssembly?)
	const search = async (query: string) => {
		const q = query.toLowerCase();
		return places.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 100);
	};
</script>

<script lang="ts">
	import { distanceH } from '$lib/mapUtils';
	import type { ArrayPoint } from '$lib/mapUtils';
	import SegmentedControl from '$components/SegmentedControl.svelte';
	import Search from '$components/Search.svelte';
	import Map from '$components/Map.svelte';
	import FAB from '$components/Material/FAB.svelte';
	import SlidingSelection from '$components/SlidingSelection.svelte';
	import Icon from '$components/Material/Icon.svelte';
	import { onMount } from 'svelte';

	let offset: number;
	let location: ArrayPoint;
	let inputElement: HTMLInputElement;
	let zoom: number;
	let isInFocus: boolean;
	let query: string;
	let results: typeof places = [];
	let currentLocation: ArrayPoint = null;
	let locate: () => void;

	onMount(async () => {
		const [fetched_places, error] = await API.places.all();
		if (!error) places = fetched_places;
	});

	$: query ? search(query).then((r) => (results = r)) : [];

	const showItem = (i: number, itemLocation: ArrayPoint) => {
		isInFocus = false;
		location = itemLocation;
		zoom = 18;
	};

	const onMarkerClick = (_: Place, index: number) => (offset = index);
</script>

<!-- TODO: no hay mucho JS, pero el HTML y CSS se podría separa en partes diferentes -->

<div id="mapContainer">
	<Map bind:locate {results} {onMarkerClick} bind:currentLocation bind:location bind:zoom />
</div>

<div id="mainContainer" class:solid={isInFocus}>
	<div id="navegation">
		<!-- Busqueda y selección de campus, siempre visibles -->
		<Search bind:inputElement bind:isInFocus bind:query on:click={() => (offset = 0)} />
		<SegmentedControl />
	</div>
	{#if isInFocus}
		<!-- Mostrado al buscar -->
		<div class="results-container ss">
			{#if query}
				{#each results as { name, latLng: { coordinates: [lat, lng] }, _id }, index (_id)}
					<div class="result" on:click={() => (showItem(index, [lat, lng]), (offset = index))}>
						<div class="result-icon">
							<Icon iconName="place" />
						</div>
						<div class="result-info">
							<div>{name}</div>
							{#if currentLocation}
								<div>{distanceH(currentLocation, [lat, lng])}</div>
							{/if}
						</div>
						<div class="results-goto">
							<Icon iconName="chevron_right" />
						</div>
					</div>
				{:else}
					<div class="results-base">No hay resultados :(</div>
				{/each}
			{:else}
				<div class="results-base">Busca algo!</div>
			{/if}
		</div>
	{:else}
		<!-- Mostrado al ver el mapa -->
		<div id="interactionArea">
			<FAB on:click={() => inputElement.focus()} iconName="search" />
			<FAB on:click={locate} iconName="my_location" isSecondary />
		</div>
		<SlidingSelection bind:offset>
			{#if query && results.length > 0}
				<!-- Si hay consulta con resultados, mostrarlos en la selección -->
				{#each results as { name, latLng: { coordinates: [lat, lng] }, _id }, index (_id)}
					<div class="selection-element" class:selected={index === offset} on:click={() => showItem(index, [lat, lng])}>
						<div>{name}</div>
						{#if currentLocation}
							<div>{distanceH(currentLocation, [lat, lng])}</div>
						{/if}
					</div>
				{/each}
			{:else if false}
				<!-- En otro caso, mostrar categorias -->
				{#each categories as { name, slug, img }, i (slug)}
					<div class="selection-element category" style="background-image: url({img});">{name}</div>
				{/each}
			{/if}
		</SlidingSelection>
	{/if}
</div>

<style>
	#mainContainer {
		display: flex;
		flex-direction: column;
		position: fixed;
		pointer-events: none;
		width: 100%;
		height: 100%;
	}
	#mainContainer.solid {
		background: var(--dark-2);
		pointer-events: auto;
	}
	#mapContainer {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	#navegation {
		padding: 16px;
		pointer-events: auto;
		display: flex;
		justify-content: center;
	}
	#interactionArea {
		flex: 1;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
	}
	.selection-element {
		background: var(--dark-3);
		border-radius: 8px;
		padding: 8px 4px;
		height: 80px;
		min-height: 80px;
		width: 100px;
		min-width: 100px;
		cursor: pointer;
	}
	.selected {
		background: var(--dark-4);
	}
	.results-container {
		flex: 1;
		gap: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		margin: 0 auto;
		width: 600px;
		max-width: 100%;
	}
	.results-base {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.result {
		display: flex;
		align-items: center;
		gap: 15px;
		width: 100%;
		padding: 5px 20px;
		background: var(--dark-3);
		cursor: pointer;
	}
	.result-info {
		flex: 1;
	}
	.category {
		background-size: contain;
		text-shadow: 0 0 8px black;
	}
</style>
