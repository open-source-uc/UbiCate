<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';
	export const load: ErrorLoad = ({ error, status }) => ({ props: { error, status } });
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export let error: Error;
	export let status: number;

	if (browser) {
		setTimeout(() => goto(document.referrer && '/map'), 5000);
	}
</script>

<h1>{status}</h1>
<h2>{error.message}</h2>

<p>Serás redirigido atrás en unos instantes</p>
