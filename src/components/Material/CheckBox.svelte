<script lang="ts">
	export let label: string;
	export let name: string = label;
	export let checked: boolean = false;
	export let onChecked: () => void = () => {};
	export let onUnchecked: () => void = () => {};
</script>

<div class="container">
	<label>
		<input type="checkbox" {name} value={checked} on:change={() => (checked ? onChecked() : onUnchecked())} />
		{label}
	</label>
</div>

<style>
	.container,
	label {
		padding: 0.1em 0.2em;
	}
	label {
		cursor: pointer;
		display: block;
		width: 100%;
		height: 100%;
	}
	input {
		border-radius: 9999px;
	}
</style>
