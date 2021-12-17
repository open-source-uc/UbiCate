<script lang="ts">
	import Icon from './Icon.svelte';

	export let iconName: string;
	export let isSecondary = false;
	export let self: HTMLElement = undefined;
</script>

<button bind:this={self} on:click class="mdc-elevation-transition" class:isSecondary>
	<Icon {iconName} />
</button>

<style>
	/* https://material.io/components/buttons-floating-action-button#specs */
	button {
		box-shadow: var(--elevation-6);
		pointer-events: auto;
		width: 56px;
		height: 56px;
		padding: 0 16px;
		margin: 7px;
		border-radius: 50%;
		background: var(--dark-2);
		color: var(--light-2);
		cursor: pointer;
		transition: 0.1s;
	}
	button:hover,
	button:focus {
		box-shadow: var(--elevation-12);
		background: var(--dark-1);
	}

	.isSecondary {
		background: var(--light-3);
		color: var(--dark-2);
	}
	.isSecondary:hover,
	.isSecondary:focus {
		background: var(--light-2);
	}
</style>
