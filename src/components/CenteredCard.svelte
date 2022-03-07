<div class="card">
	<slot />
</div>

<style>
	.card {
		background: var(--dark-3);
		padding: var(--padding-4);
		display: flex;
		flex-direction: column;
		gap: 20px;
		text-align: center;
		width: fit-content;
		max-width: 400px;
	}
</style>
