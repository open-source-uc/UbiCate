<script lang="ts">
	import { goto } from '$app/navigation';
	import CenteredCard from '$components/CenteredCard.svelte';
	import CenteredCardContainer from '$components/CenteredCardContainer.svelte';
	import { userSession } from '$lib/userStore';
	import { onMount } from 'svelte';
	import jwt_decode from 'jwt-decode';
	import type { UserInfo } from '$lib/types';

	let signInButtom: HTMLElement;
	let googleAuthScript: HTMLElement;

	// Validate credentials with the API
	const handleCredentials = async ({ credential: token }: CredentialResponse) => {
		const data: { [k: string]: any } = jwt_decode(token);
		console.log(data);
		$userSession = { ...data, token } as UserInfo;
	};

	// Crate the google auth bottom
	const initializeGoogleAuthButtom = () => {
		window.google.accounts.id.initialize({
			client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
			callback: handleCredentials
		});
		window.google.accounts.id.renderButton(signInButtom, {
			theme: 'outline',
			type: 'standard'
		});
	};

	onMount(() => {
		if (!$userSession) {
			// The script tag might load after on mount, in that case the load event should setup the buttom
			window.google
				? initializeGoogleAuthButtom()
				: googleAuthScript.addEventListener('load', initializeGoogleAuthButtom, { once: true });
		}
	});

	// Redirect when the user logs in
	let backPage: string;

	$: if ($userSession) {
		const { referrer: rfr } = document;
		console.log(rfr);
		backPage = rfr && !rfr.includes('login') ? rfr : '/map';
		setTimeout(() => goto(backPage || '/map'), 3000);
	}
</script>

<svelte:head>
	<!-- Google Auth -->
	<script src="https://accounts.google.com/gsi/client" async defer bind:this={googleAuthScript}></script>
</svelte:head>

<CenteredCardContainer>
	<img src="assets/logo.svg" alt="Icono de busqueda con una capa de graduación en vez de un circulo" />
	<CenteredCard>
		{#if $userSession}
			<div>
				<img class="user-image" src={$userSession.picture} alt="Yourserf!" />
			</div>
			<h2>Hola {$userSession.given_name} 👋</h2>
			<p>Serás redirigido en unos segundos...</p>
			<a class="back" href={backPage}>Puedes hacer click aquí si no funciona</a>
		{:else}
			<h1>Inicia Sesión</h1>
			<h2>Hola! Loggueate con Google</h2>
			<div class="sign-in-buttom" bind:this={signInButtom} />
		{/if}
	</CenteredCard>
</CenteredCardContainer>

<style>
	h2 {
		font-size: 1.5em;
	}
	.sign-in-buttom {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.user-image {
		border-radius: var(--full-rounded);
	}
	.back {
		color: var(--white-1);
	}
</style>
