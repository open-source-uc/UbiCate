<script context="module" lang="ts">
	import type { Place } from '$lib/types';
	export { loadPlace as load } from '$lib/loadPlace';
</script>

<script lang="ts">
	import PlacesLayout from '$components/Places/Layout.svelte';
	export let place: Place;
</script>

<PlacesLayout>
	<h1 slot="title">Lugar</h1>
	<h2>{place.name}</h2>
</PlacesLayout>
