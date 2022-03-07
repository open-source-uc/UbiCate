<script lang="ts">
	export let iconName: string;
	export let clickable = false;
</script>

<span class="material-icons" class:clickable on:click>{iconName}</span>

<style>
	span {
		user-select: none;
		margin: 1px;
	}
	.clickable {
		cursor: pointer;
	}
</style>
