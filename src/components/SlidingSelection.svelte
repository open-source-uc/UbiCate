<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	export let offset = -1;

	let carousel: HTMLElement;
	let itemWidth = 0;

	$: if (carousel) carousel.scrollLeft = itemWidth * offset;

	onMount(() => {
		if (browser) {
			const carouselGap = parseFloat(window.getComputedStyle(carousel, null).getPropertyValue('gap'));
			const firstChild = carousel.firstElementChild;

			if (firstChild) itemWidth = firstChild.clientWidth + carouselGap;
		}
	});
</script>

<div bind:this={carousel}>
	<slot {offset} />
</div>

<style>
	div {
		margin-bottom: 1.2em;
		pointer-events: auto;
		gap: 10px;
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
		padding: 12px;
		scroll-behavior: smooth;
	}
	div::-webkit-scrollbar {
		display: none;
	}
</style>
