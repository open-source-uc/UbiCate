<script lang="ts">
	import type { Writable } from 'svelte/store';
	import PlaceForm from '$components/Places/Form.svelte';
	import PlaceLayout from '$components/Places/Layout.svelte';
	import { API, PlaceInput } from '$lib/placesAPI';
	import { userSession } from '$lib/userStore';

	let placeInput: Writable<PlaceInput>;

	// TODO
	const onSubmit = () => API.places.create($placeInput, $userSession?.token);
</script>

<PlaceLayout let:markerPosition editable>
	<h1 slot="title">Editar ubicación</h1>
	<PlaceForm bind:placeInput {markerPosition} {onSubmit} actionName="Crear" />
</PlaceLayout>
