<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Code from '$lib/components/ui/code.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	type Param = {
		value: string | null;
		defaultValue: string | number;
		description: string;
	};

	type Params = {
		visible?: boolean;
		avatar_size: Param;
		gap: Param;
		border: Param;
		border_color: Param;
		username_size: Param;
		columns: Param;
		count: Param;
	};

	let repo: string = 'supabase/supabase';
	let type: 'image' | 'markdown' = 'image';
	let image: string;

	let params: Params = {
		visible: false,
		avatar_size: {
			value: null,
			defaultValue: 64,
			description: 'Size of the avatar'
		},
		gap: {
			value: null,
			defaultValue: 10,
			description: 'Gap between elements'
		},
		border: {
			value: null,
			defaultValue: 0,
			description: 'Border thickness'
		},
		border_color: {
			value: null,
			defaultValue: '#c0c0c0',
			description: 'Color of the border'
		},
		username_size: {
			value: null,
			defaultValue: 0,
			description: 'Size of the username text'
		},
		columns: {
			value: null,
			defaultValue: 10,
			description: 'Number of columns'
		},
		count: {
			value: null,
			defaultValue: 30,
			description: 'Number of elements'
		}
	};

	$: url = generateURL(repo, type, params);

	$: {
		copy = {
			url: url,
			markdown: `![Contributors Image](${url})`,
			html: `<img alt="Contributors Image" src="${url}">`
		};
	}

	type Copy = {
		url: string;
		markdown: string;
		html: string;
	};

	let copy: Copy = {
		url: '',
		markdown: '',
		html: ''
	};

	console.log(copy.url);

	const generateURL = (repo: string, type: string, params: Params): string => {
		let baseURL = `https://contributors.up.railway.app/api/${repo}/${type}`;

		const queryParams = Object.entries(params)
			.filter(([key]) => key !== 'visible')
			.map(([key, obj]: [string, any]) => {
				if (obj.value === null) {
					return undefined;
				}

				return `${key}=${encodeURIComponent(obj.value)}`;
			})
			.filter((item): item is string => item !== undefined);

		return queryParams.length ? `${baseURL}?${queryParams.join('&')}` : baseURL;
	};

	// Function to fetch data based on repo and type
	async function fetchData() {
		try {
			let response = await fetch(`https://contributors.up.railway.app/api/${repo}/${type}`);
			if (response.ok) {
				image = await response.text();
			} else {
				image = 'Error fetching data';
			}
		} catch (error: any) {
			image = 'Error: ' + error.message;
		}
	}

	// Fetch initial data on mount
	onMount(() => {
		fetchData();
	});
</script>

<div class="w-fit mx-auto text-center">
	<h1 class="text-6xl font-bold">Welcome to the <br /> Contributors Club</h1>
	<p class="text-lg font-medium">Making contributing to open source as easy as possible!</p>
</div>

<div class="w-fit mx-auto mt-10 space-y-6">
	<div>
		<div class="flex items-end space-x-2 mb-1">
			<Input placeholder={repo} bind:value={repo} />
			<Button on:click={fetchData}>generate</Button>
		</div>
		<Collapsible.Root>
			<Collapsible.Trigger on:click={() => (params.visible = !params.visible)}>
				<p class="text-sm">
					{params.visible ? 'x Hide optional parameters' : '+ Show optional parameters'}
				</p>
			</Collapsible.Trigger>
			{#each Object.entries(params) as [key, val]}
				{#if typeof val === 'object' && val !== null}
					<Collapsible.Content class="my-4">
						<div class="mb-2">
							<div class="flex items-center space-x-1">
								<span class="font-semibold">{key}</span><span>- {val.description}</span>
							</div>
							<div>default value: <Code>{val.defaultValue}</Code></div>
						</div>
						<Input placeholder={val.defaultValue.toString()} bind:value={val.value} />
					</Collapsible.Content>
				{/if}
			{/each}
		</Collapsible.Root>
	</div>

	<Card.Root class="p-4">
		{@html image}
	</Card.Root>

	<Card.Root>
		<Card.Header class="space-y-2">
			<Card.Title>Copy to README.md</Card.Title>
			<Card.Description>
				let your contributors know how much you aprecate them by includeing them in your repos
				README.md
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="space-y-2">
				<div class="flex h-5 items-center space-x-4 text-sm">
					{#each Object.entries(copy) as [key, _]}
						<button>{key}</button>
						<Separator class="last:hidden" orientation="vertical" />
					{/each}
				</div>
				<Separator />
			</div>
			<div class="flex items-center justify-between">
				<p>{copy.url}</p>
				<Button variant="ghost">x</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
