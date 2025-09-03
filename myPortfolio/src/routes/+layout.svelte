<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>Austin's Art - Portfolio</title>
	<meta name="description" content="Austin Bryan Sanchez - Filmmaker, Entrepreneur, Photographer, Producer, Consultant" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<Header />
	<main>
		{@render children?.()}
	</main>
</div>
