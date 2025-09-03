<script lang="ts">
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';
</script>

<svelte:head>
	<title>Gallery - Austin's Art</title>
	<meta name="description" content="Photography portfolio showcasing Austin's creative vision through captured moments and artistic compositions" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<PhotoGallery 
		folder="Collections/Photos/"
		columns={3}
		showTitle={true}
	/>
</div>
