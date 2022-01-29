<script lang="ts">
	export let label: string;
	export let checked: boolean = false;
</script>

<div class="container">
	<label>
		<input type="checkbox" name="sdasd" value={checked} />
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
