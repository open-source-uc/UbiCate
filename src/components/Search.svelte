<script lang="ts">
	import Icon from '$components/Material/Icon.svelte';

	export let query: string = '';
	export let isInFocus = false;
	export let inputElement: HTMLInputElement = undefined;
</script>

<div>
	<Icon iconName="search" clickable on:click={() => inputElement.focus()} />
	<input
		bind:this={inputElement}
		bind:value={query}
		on:focus={() => (isInFocus = true)}
		on:click
		type="text"
		name="query"
		id="search"
		placeholder="Buscar aquí"
	/>
	{#if isInFocus}
		<Icon iconName="clear" clickable on:click={() => (isInFocus = false)} />
	{:else}
		<a href="info">
			<Icon iconName="info" clickable />
		</a>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex: 1;
		gap: 8px;
		align-items: center;
		background: var(--dark-3);
		color: var(--light-2);
		border-radius: 20px;
		max-width: 600px;
		padding: 12px 18px;
	}
	input {
		display: block;
		width: 100%;
		border: none;
		color: inherit;
		flex: 1;
		font-size: 1.2em;
	}
	input::placeholder {
		color: var(--light-4);
	}
	input:active,
	input:focus-visible {
		border: none;
		outline: none;
	}
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
</style>
