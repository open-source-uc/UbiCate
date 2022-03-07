<script>
	import '../global.css';
	import { base as basePath } from '$app/paths';
</script>

<svelte:head>
	<base href={basePath || '/'} />
</svelte:head>

<slot />
