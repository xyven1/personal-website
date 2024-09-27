<script lang="ts">
	import { Icon } from '$lib/components';
	import type { PageData } from './$types';
	import { mdiLoading } from '@mdi/js';
	import type { EventHandler } from 'svelte/elements';

	enum State {
		Input,
		Submitting,
		Success,
		Failure
	}

	const from = 'Personal Site Form';
	let state = State.Input;
	const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (data) => {
		state = State.Submitting;
		const formData = new FormData(data.currentTarget);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});
		const result = await response.json();
		if (result.success) {
			state = State.Success;
		} else {
			state = State.Failure;
		}
	};
	export let data: PageData;
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact form" />
	<script src="https://web3forms.com/client/script.js" async defer></script>
</svelte:head>
{#if state === State.Success}
	<hgroup class="flex flex-col items-center justify-center">
		<h2 class="text-4xl font-bold">Success!</h2>
		<p class="text-xl">Your message has been sent.</p>
	</hgroup>
{:else}
	<form
		class="form-children relative flex w-full max-w-xl flex-grow flex-col justify-center gap-y-4 px-4"
		method="POST"
		action="https://api.web3forms.com/submit"
		on:submit|preventDefault={submit}
	>
		<!-- overlay -->
		{#if state === State.Submitting}
			<div class="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
				<Icon size={2} path={mdiLoading} class="jsonly animate-spin" />
			</div>
		{/if}
		<input type="hidden" name="access_key" value={data.api} />
		<input type="hidden" name="from_name" value={from} />
		<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />
		<input type="hidden" name="redirect" value={`${data.origin}/contact/success`} />
		<div>
			<label for="name">Name</label>
			<input type="text" name="name" id="name" placeholder="Name" required />
		</div>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" placeholder="Email" required />
		</div>
		<div>
			<label for="subject">Subject</label>
			<input type="text" name="subject" id="subject" placeholder="Subject" required />
		</div>
		<div class="flex max-h-96 min-h-32 flex-1 flex-col sm:max-h-80">
			<label class="mb-2 block text-sm font-bold" for="message">Message</label>
			<textarea name="message" id="message" required class="flex-grow"></textarea>
		</div>
		<!-- <div class="h-captcha flex justify-center" data-captcha="true" data-theme="dark"></div> -->
		<div class="flex justify-center">
			<button type="submit"> Submit Form </button>
		</div>
		{#if state === State.Failure}
			<p class=" text-center text-xl">Your message did not send properly.</p>
		{/if}
	</form>
{/if}

<style lang="postcss">
	.form-children label {
		@apply mb-2 block text-sm font-bold;
	}
	.form-children input,
	button,
	textarea {
		@apply w-full appearance-none rounded border border-current bg-inherit px-3 py-2 leading-tight outline-none transition-colors focus:outline-2 focus:-outline-offset-1 focus:outline-accent dark:focus:outline-daccent;
	}
</style>
