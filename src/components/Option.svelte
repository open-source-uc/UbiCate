<script context="module" lang="ts">
	import Icon from './Material/Icon.svelte';

	type DistpatchArgs = { ready: boolean; setReady: (value: boolean) => void };
	export type DistpatchFn = (data: DistpatchArgs) => void;
	const emptyFn = () => null;
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	export let ready = false;
	const setReady = (value: boolean) => (ready = value);

	export let label: string;
	export let info: string = undefined;

	export let handleClick: DistpatchFn = emptyFn;
	export let onClientMount: DistpatchFn = emptyFn;

	onMount(() => {
		if (browser) {
			onClientMount({ ready, setReady });
		}
	});
</script>

<button on:click={() => handleClick({ ready, setReady })}>
	<div class="info" title={info}>
		<Icon iconName="info" />
	</div>
	<div class="label">{label}</div>
	<div class="status">
		<span class="status-icon-container">
			<Icon iconName={ready ? 'check' : ''} />
		</span>
	</div>
</button>

<style>
	button {
		background: var(--dark-3);
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
		border-radius: 3px;
		height: 50px;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.info {
		color: var(--light-4);
		padding: 10px;
	}
	.label {
		flex: 1;
		color: var(--light-1);
		font-size: 1.5em;
		text-align: left;
	}
	.status {
		background: var(--light-3);
		height: 100%;
		width: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.status-icon-container {
		background: var(--dark-4);
		color: var(--light-1);
		border-radius: 2px;
		width: 25px;
		height: 25px;
	}
</style>
