<script lang="ts">
	import { onMount } from 'svelte';

	let repo = 'supabase/supabase';
	let type = 'image';

	let image: string;

	onMount(async () => {
		let response = await fetch(`http://127.0.0.1:3000/api/${repo}/${type}`);

		image = await response.text();
	});
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<div>
	{@html image}
</div>
