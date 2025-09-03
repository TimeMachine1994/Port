<script lang="ts">
	import { onMount } from 'svelte';
	import { getPhotosFromFolder, type PhotoItem } from '$lib/firebase';
	
	export let folder: string = 'Collections/Photos/';
	export let columns: number = 3;
	export let showTitle: boolean = true;
	
	let photos: PhotoItem[] = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		await loadPhotos();
	});

	async function loadPhotos() {
		try {
			loading = true;
			error = '';
			console.log('Loading photos from:', folder);
			photos = await getPhotosFromFolder(folder);
			console.log('Loaded photos:', photos);
			if (photos.length === 0) {
				error = 'No photos found in this collection.';
			}
		} catch (err) {
			console.error('Error loading photos:', err);
			error = 'Failed to load photos. Please try again later.';
		} finally {
			loading = false;
		}
	}
</script>


<div class="photo-gallery">
	{#if showTitle}
		<div class="text-center mb-8">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
				Photo Gallery
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				A curated collection of my photography work, capturing moments and stories through the lens.
			</p>
		</div>
	{/if}

	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	{:else if error}
		<div class="text-center py-12">
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
				<svg class="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<p class="text-red-800 dark:text-red-200 font-medium">{error}</p>
				<button 
					on:click={loadPhotos}
					class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
				>
					Try Again
				</button>
			</div>
		</div>
	{:else if photos.length === 0}
		<div class="text-center py-12">
			<svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path>
			</svg>
			<p class="text-gray-600 dark:text-gray-400">No photos found in this collection.</p>
		</div>
	{:else}
		<div class="masonry-grid" style="--columns: {columns};">
			{#each photos as photo}
				<div class="masonry-item group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
					<img 
						src={photo.url} 
						alt={photo.name}
						class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
						on:load={() => console.log(`Image loaded: ${photo.name}`)}
						on:error={() => console.error(`Failed to load image: ${photo.name}`)}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.photo-gallery {
		@apply w-full;
	}

	.masonry-grid {
		column-count: var(--columns);
		column-gap: 1rem;
		column-fill: balance;
	}

	@media (max-width: 768px) {
		.masonry-grid {
			column-count: 1;
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		.masonry-grid {
			column-count: calc(var(--columns) - 1);
		}
	}

	.masonry-item {
		display: inline-block;
		width: 100%;
		margin-bottom: 1rem;
		break-inside: avoid;
	}
</style>
