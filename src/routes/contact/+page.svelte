<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { mdiLoading } from '@mdi/js';
	import { onMount } from 'svelte';
	import type { EventHandler } from 'svelte/elements';
	enum State {
		None,
		Input,
		Submitting,
		Success,
		Failure
	}

	let api = '';
	let from = 'Personal Site Form';
	let state = State.None;
	onMount(() => {
		api =
			{
				localhost: '1cb1191f-2cf4-4cb8-a895-2b83e91a2be5',
				'xyven.dev': '5b3ec125-a470-42d7-bda4-1b2f2dc124aa',
				'personal-website-svelte.pages.dev': '5b3ec125-a470-42d7-bda4-1b2f2dc124aa',
				'blake.bruell.com': 'eb0d973f-8562-4ac4-a138-8488d6fac2a0'
			}[window.location.hostname] || api;
		state = State.Input;
	});
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
		class="relative flex w-full max-w-xl flex-grow flex-col justify-center px-8"
		on:submit|preventDefault={submit}
	>
		<!-- overlay -->
		{#if state === State.Submitting || state === State.None}
			<div
				class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50"
			>
				<noscript class="text-center text-3xl">
					This form requires JavaScript, appologies for the inconvenience.
				</noscript>
				<Icon size={2} path={mdiLoading} class="jsonly animate-spin" />
			</div>
		{/if}
		<input type="hidden" name="access_key" value={api} />
		<input type="hidden" name="from_name" value={from} />
		<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="name">Name</label>
			<input
				class="w-full appearance-none rounded border border-white bg-inherit px-3 py-2 leading-tight transition-colors focus:border-accent focus:outline-none"
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				required
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="email">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				class="w-full appearance-none rounded border border-white bg-inherit px-3 py-2 leading-tight transition-colors focus:border-accent focus:outline-none"
				required
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="subject">Subject</label>
			<input
				class="w-full appearance-none rounded border border-white bg-inherit px-3 py-2 leading-tight transition-colors focus:border-accent focus:outline-none"
				type="text"
				name="subject"
				id="subject"
				placeholder="Subject"
				required
			/>
		</div>
		<div class="mb-4 flex max-h-64 flex-1 flex-col">
			<label class="mb-2 block text-sm font-bold" for="message">Message</label>
			<textarea
				name="message"
				id="message"
				required
				class="w-full flex-grow appearance-none rounded border border-white bg-inherit px-3 py-2 leading-tight transition-colors focus:border-accent focus:outline-none"
			></textarea>
		</div>
		<div class="h-captcha" data-captcha="true"></div>
		<div class="flex justify-center">
			<button
				class="rounded border border-white px-2 py-1 transition-colors hover:border-accent"
				type="submit"
			>
				Submit Form
			</button>
		</div>
		{#if state === State.Failure}
			<p class=" text-center text-xl">Your message did not send properly.</p>
		{/if}
	</form>
{/if}
