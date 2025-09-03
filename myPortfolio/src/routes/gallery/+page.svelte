<script lang="ts">
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';
</script>

<svelte:head>
	<title>Gallery - Austin's Art</title>
	<meta name="description" content="Photo gallery showcasing Austin's creative work - photography, film projects, and events" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
			Gallery
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
			Explore my creative work through photography, film projects, and event documentation. 
			Each image tells a story of passion, creativity, and professional excellence.
		</p>
	</div>

	<!-- Photo Gallery -->
	<PhotoGallery 
		folders={['portfolio/', 'events/', 'headshots/', 'behind-the-scenes/']}
		columns={3}
		showCategories={true}
	/>
</div>
