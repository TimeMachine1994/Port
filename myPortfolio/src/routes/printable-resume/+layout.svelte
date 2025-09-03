<script lang="ts">
	import '../../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>Austin B. Sanchez - Printable Resume</title>
	<meta name="description" content="Printable resume of Austin B. Sanchez - Entrepreneur, Filmmaker, Technical Professional" />
</svelte:head>

<div class="min-h-screen bg-gray-900">
	<main>
		{@render children?.()}
	</main>
</div>
