<script lang="ts">
	import type { PlaceInput, Response } from '$lib/placesAPI';
	import type { Place, Point } from '$lib/types';
	import { writable } from 'svelte/store';
	import Field from '$components/Material/Field.svelte';
	import { categories } from '$constants/categories';
	import { goto } from '$app/navigation';
	import 'leaflet/dist/leaflet.css';

	const posibleCampuses: [string, string][] = [['SJ', 'San joaquín']];

	export let placeInput = writable<PlaceInput>({
		categories: [],
		campus: posibleCampuses[0][0],
		floor: 0
	});
	export let markerPosition: Point;
	export let actionName: string;
	export let onSubmit: (input: PlaceInput) => Response<Place>;

	let loading: boolean = false;
	let error: string;

	const handleSubmit = async () => {
		loading = true;
		$placeInput.latLng = { coordinates: markerPosition, type: 'Point' };
		$placeInput.categories = Array.from(new Set($placeInput.categories));
		console.info($placeInput);
		const [place, responseError] = await onSubmit($placeInput);
		if (responseError) {
			const { detail } = responseError;
			console.log(detail);
			if (typeof detail === 'string') {
				error = detail;
			} else {
				error = 'Invalid place';
				formsErrors = detail;
			}
		} else {
			await goto(`/places?id=${place._id}`);
		}
		loading = false;
	};

	const addCategory = () => {
		$placeInput.categories.push('');
		$placeInput = $placeInput;
	};

	// TODO
	let formsErrors: Record<string, any>;
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Field label="Nombre" bind:value={$placeInput.name} required helperText={'Requerido'} />
	<Field label="Capus" type="select" bind:value={$placeInput.campus} options={{ options: posibleCampuses }} />
	<Field
		label="Piso"
		type="number"
		helperText="Entre -2 y 30"
		bind:value={$placeInput.floor}
		options={{ min: -2, max: 30 }}
	/>
	<Field label="Descripción" type="area" bind:value={$placeInput.description} />
	<div>
		<h2 class="sub-title">Categorias</h2>
		<button class="add-category" type="button" on:click={addCategory}> Añadir categoria </button>
		{#each $placeInput.categories as _, index}
			<Field
				type="text"
				id="category-{index}"
				options={{ list: 'categories-list' }}
				clearCallback={() => {
					$placeInput.categories = $placeInput.categories.filter((_, i) => i !== index);
					$placeInput.categories = $placeInput.categories;
				}}
				bind:value={$placeInput.categories[index]}
			/>
		{/each}
		<datalist id="categories-list">
			{#each categories as category}
				<option value={category.name}>
					{category.name}
				</option>
			{/each}
		</datalist>
	</div>
	<div class="submit-container">
		{#if loading}
			Cargando...
		{:else}
			{#if error}
				<span class="error">{error}</span>
			{/if}
			<button type="submit" class="submit">{actionName}</button>
		{/if}
	</div>
</form>

<style>
	form {
		padding: 2em;
	}
	.sub-title {
		font-size: 2em;
	}
	.submit-container {
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 10px;
	}
	button {
		padding: 0.5em 0.8em;
		border-radius: 0.3em;
		cursor: pointer;
	}
	.add-category {
		background: var(--light-1);
		color: var(--dark-2);
	}
	.submit {
		background: var(--success);
		color: var(--light-1);
	}
	.error {
		color: var(--error);
	}
</style>
