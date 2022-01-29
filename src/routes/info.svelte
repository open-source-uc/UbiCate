<script lang="ts">
	import { backRoute } from '$lib/paths';
	import CenteredCardContainer from '$components/CenteredCardContainer.svelte';
	import { VERSION } from 'svelte/compiler';
	import { userSession } from '$lib/userStore';

	const getApiStatus: () => Promise<{ version: string }> = async () => {
		const response = await fetch(import.meta.env.PUBLIC_API);
		return await response.json();
	};
</script>

<CenteredCardContainer>
	<img src="assets/logo.svg" alt="Icono de busqueda con una capa de graduación en vez de un circulo" />
	<div class="card">
		<div>
			<h1>UbiCate</h1>
			<!-- TODO: see how to remove this warning -->
			<!-- svelte-ignore missing-declaration -->
			<span>Versión {pkg.version}</span>
		</div>
		<div>
			<p>Creado por Benjamín Vicente</p>
			<p>Usando SvelteKit (Svelte {VERSION})</p>
			{#await getApiStatus()}
				<p>Conectandose con la API...</p>
			{:then { version }}
				<p>API en FastAPI + MongoDB ({version})</p>
			{:catch}
				<p>No se pudo conectar con la API</p>
			{/await}
			<p>Datos iniciales de Almapp</p>
		</div>
		{#if $userSession}
			Sesión iniciada como {$userSession.name}
		{/if}
		<div />
		<div>
			<a href="https://github.com/open-source-uc/UbiCate">Ir al repositorio</a>
		</div>
		<div>
			<div class="buttom-row">
				{#if $userSession}
					<a class="button" href="/places/new">Añadir ubicación</a>
					<button class="button" on:click={() => userSession.close()}>Cerrar sesión</button>
				{:else}
					<a class="button" href="/login">Inicia sesión para añadir ubicaciones</a>
				{/if}
			</div>
			<div class="buttom-row">
				<a class="button" href={backRoute()}>Volver</a>
			</div>
			<div class="buttom-row">
				<a class="button" href="/map">Ir al mapa</a>
			</div>
		</div>
	</div>
</CenteredCardContainer>

<style>
	h1 {
		margin: 0;
	}
	.card {
		background: var(--dark-3);
		padding: var(--padding-4);
		display: flex;
		flex-direction: column;
		gap: 20px;
		text-align: center;
		width: 18rem;
	}
	.buttom-row {
		display: flex;
		gap: 10px;
		margin-top: 0.5em;
	}
	.button {
		transition: 10ms;
		background: var(--dark-4);
		padding: 0.5em;
		color: var(--white-1);
		border-radius: var(--radius);
		text-decoration: none;
		box-shadow: var(--elevation-4);
		width: 100%;
		cursor: pointer;
	}
	.button:hover {
		color: var(--white-4);
		box-shadow: var(--elevation-6);
	}
</style>
