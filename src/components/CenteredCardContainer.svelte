<div class="card-container">
	<slot />
</div>

<style>
	.card-container {
		width: 100vw;
		height: 100vh;
		padding: 20px 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}
</style>
