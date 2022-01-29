<script context="module" lang="ts">
	import type { Place } from '$lib/types';
	import { loadPlace } from '$lib/loadPlace';
	export const load = loadPlace;
</script>

<script lang="ts">
	export let place: Place;
</script>
