<script context="module" lang="ts">
	import type { Place } from '$lib/types';
	export { loadPlace as load } from '$lib/loadPlace';
</script>

<script lang="ts">
	import PlaceForm from '$components/Places/Form.svelte';
	import PlaceLayout from '$components/Places/Layout.svelte';
	import { writable } from 'svelte/store';
	import { API } from '$lib/placesAPI';
	import { userSession } from '$lib/userStore';

	export let place: Place;

	let placeInput = writable(place);

	const onSubmit = async () => {
		return API.places.patch(place._id, $placeInput, $userSession.token);
	};
</script>

<PlaceLayout let:markerPosition markerPosition={$placeInput.latLng.coordinates} editable>
	<h1 slot="title">Editar ubicación</h1>
	<PlaceForm bind:placeInput {markerPosition} {onSubmit} actionName="Editar" />
</PlaceLayout>
