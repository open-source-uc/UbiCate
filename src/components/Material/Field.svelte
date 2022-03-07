<script lang="ts">
	type InputOptions = {
		number: { min?: number; max?: number };
		area: {};
		text: { list: string };
		select: { options: [string, string][] };
	};
	type InputType = $$Generic<'text' | 'area' | 'number' | 'select'>;
	interface $$Props {
		type?: InputType;
		label?: string;
		id?: string;
		value: number | string;
		options?: InputOptions[InputType];
		required?: boolean;
		helperText?: string;
		errorMessage?: string;
		clearCallback?: () => void;
	}

	export let type: 'text' | 'area' | 'number' | 'select' = 'text';
	export let id: string = null;
	export let label: string = null;
	export let value: string | number;
	export let required = false;
	export let helperText: string = null;
	export let errorMesage: string = null;
	export let clearCallback: () => void = null;
	export let options: Record<string, any> = {}; // Generics dont work here...

	options as InputOptions[typeof type];

	let _id = id || label.toLowerCase();
	let inputElement: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
	let focus = false;
	let valid = true;

	const handleFocus = () => (focus = true);
	const handleBlur = () => {
		focus = false;
		valid = inputElement.checkValidity();
	};
</script>

<div class="text-field-container" class:is-invalid={errorMesage || !valid}>
	<div class="input-container" class:is-active={focus || value || value === 0} class:is-focused={focus}>
		{#if type === 'area'}
			<textarea
				id={`input-${_id}`}
				class="input"
				{required}
				{...options}
				bind:value
				bind:this={inputElement}
				on:focus={handleFocus}
				on:blur={handleBlur}
			/>
		{:else if type === 'number'}
			<input
				type="number"
				class="input"
				id={`input-${_id}`}
				{...options}
				{required}
				bind:value
				bind:this={inputElement}
				on:focus={handleFocus}
				on:blur={handleBlur}
			/>
		{:else if type === 'select'}
			<select
				class="input"
				id={`input-${_id}`}
				bind:value
				bind:this={inputElement}
				on:focus={handleFocus}
				on:blur={handleBlur}
			>
				{#each options.options as [value, representation]}
					<option {value}>{representation}</option>
				{/each}
			</select>
		{:else}
			<input
				type="text"
				class="input"
				id={`input-${_id}`}
				{...options}
				{required}
				bind:value
				bind:this={inputElement}
				on:focus={handleFocus}
				on:blur={handleBlur}
			/>
		{/if}
		{#if clearCallback !== null}
			<div class="clear-callback" on:click={clearCallback}>
				<div>X</div>
			</div>
		{/if}
		<div class="label-overlay">
			<div class="label-left" />
			{#if label !== null}
				<div class="label-wrapper" class:center={type !== 'area'}>
					<label for={`input-${_id}`}>{label}</label>
				</div>
			{/if}
			<div class="label-right" />
		</div>
	</div>
	<div class="message">
		{errorMesage || helperText || ''}
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text-field-container {
		display: flex;
		flex-direction: column;
		margin: 0.6em 0.3em;
	}
	.input-container {
		--boder-color: var(--dark-1);
		--padding: 0.6em;
		position: relative;
		color: var(--light-2);
		position: relative;
		display: inline-flex;
		flex: 1;
	}
	.input {
		all: unset; /* reset */
		width: 100%;
		background-color: var(--dark-3);
		padding: var(--padding);
		box-shadow: none;
		border: 2px solid var(--boder-color);
		border-radius: 4px;
	}
	.is-active .input {
		--boder-color: transparent;
	}
	label {
		transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 0.1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 0.1),
			font-size 150ms cubic-bezier(0.4, 0, 0.2, 0.1);
	}
	.label-overlay {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
	}
	.clear-callback {
		position: absolute;
		right: 0;
		height: 100%;
		aspect-ratio: 1;
		margin-right: 2.5em;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--light-1);
	}
	.clear-callback:hover {
		color: var(--light-4);
	}
	.label-overlay > * {
		--border: transparent;
		border: var(--border);
		border-radius: 4px;
	}
	.is-active .label-overlay > * {
		--border: 2px solid var(--dark-1);
	}
	.is-focused .label-overlay > * {
		--border: 2px solid var(--light-2);
	}
	.is-invalid .label-overlay > * {
		--border: 2px solid var(--error);
	}
	.label-left {
		width: var(--padding);
		border-right: none;
		border-style: solid none solid solid;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.label-wrapper {
		display: flex;
		padding: var(--padding) 0;
		width: min-content;
		border-style: none none solid;
		border-radius: 0;
	}
	.is-invalid > :not(.is-active) .label-wrapper {
		border-style: solid none solid;
	}
	.is-active label {
		--font-size: 0.85em;
		font-size: var(--font-size);
		transform: translateY(calc(-0.85em - var(--padding)));
		padding: 0 4px;
		color: var(--light-4);
	}
	.is-focused label {
		color: var(--light-2);
	}
	.is-invalid label {
		color: var(--error);
	}
	.label-right {
		flex: 1;
		border-style: solid solid solid none;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.message {
		color: var(--light-4);
		padding: 0.2em 0.4em;
	}
	.is-invalid .message {
		color: var(--error);
	}
</style>
