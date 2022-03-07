<script context="module" lang="ts">
	import type { DistpatchFn } from '$components/Option.svelte';

	type OptionType = {
		label: string;
		handleClick?: DistpatchFn;
		onClientMount?: DistpatchFn;
	};

	const checkLocationPermission = async (setReady) => {
		const result = await navigator.permissions.query({ name: 'geolocation' });
		if (result.state === 'granted') {
			setReady(true);
		} else {
			result.onchange = () => setReady(result.state === 'granted');
		}
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Option from '$components/Option.svelte';
	import CenteredCard from '$components/CenteredCard.svelte';
	import CenteredCardContainer from '$components/CenteredCardContainer.svelte';
	const options: OptionType[] = [
		{
			label: 'Ubicación',
			onClientMount: ({ setReady }) => {
				checkLocationPermission(setReady);
			},
			handleClick: ({ setReady }) => {
				checkLocationPermission(setReady);
				navigator.geolocation.getCurrentPosition(() => null);
			}
		}
	];
	const optionsReady: boolean[] = Array(options.length).fill(false);
</script>

<CenteredCardContainer>
	<img src="assets/logo.svg" alt="Icono de busqueda con una capa de graduación en vez de un circulo" />
	<CenteredCard>
		<h1 class="title">Hola 👋</h1>
		<p class="info">Antes de usar la aplicación, se necesita que otorgues algunso permisos</p>
		<div id="options">
			{#each options as { label, handleClick, onClientMount }, i (label)}
				<Option bind:ready={optionsReady[i]} {label} {handleClick} {onClientMount} />
			{/each}
		</div>
		<button disabled={!optionsReady.every(Boolean)} on:click={() => optionsReady.every(Boolean) && goto('map')}
			>Aceptar</button
		>
	</CenteredCard>
</CenteredCardContainer>

<style>
	.info {
		padding: 0 10px;
	}
	#options {
		padding: 30px 15px;
	}
	button {
		text-decoration: none;
		background: var(--success);
		color: var(--light-1);
		box-shadow: 1px 1px 4px rgba(var(--success) / 0.5);
		border-radius: 8px;
		padding: 8px 14px;
		transition: 0.7s cubic-bezier(0.65, 0.05, 0.36, 1);
	}
	button:disabled {
		background: var(--success);
		box-shadow: none;
		filter: grayscale(70%);
		/* color: var(--dark-1); */
	}
	button:hover:not(:disabled) {
		box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
		filter: saturate(110%);
		cursor: pointer;
	}
</style>
