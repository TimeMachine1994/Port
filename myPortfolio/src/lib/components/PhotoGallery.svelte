<script lang="ts">
	import { onMount } from 'svelte';
	import { getPhotosFromFolder, getPhotosByCategory, type PhotoItem } from '$lib/firebase';
	
	export let folders: string[] = ['portfolio/', 'events/', 'headshots/'];
	export let singleFolder: string = '';
	export let columns: number = 3;
	export let showCategories: boolean = true;
	
	let photos: PhotoItem[] = [];
	let categorizedPhotos: Record<string, PhotoItem[]> = {};
	let loading = true;
	let error = '';
	let selectedPhoto: PhotoItem | null = null;
	let lightboxOpen = false;
	
	onMount(async () => {
		try {
			if (singleFolder) {
				photos = await getPhotosFromFolder(singleFolder);
			} else if (showCategories) {
				categorizedPhotos = await getPhotosByCategory(folders);
			} else {
				// Combine all folders into one array
				for (const folder of folders) {
					const folderPhotos = await getPhotosFromFolder(folder);
					photos = [...photos, ...folderPhotos];
				}
			}
		} catch (err) {
			error = 'Failed to load photos. Please check your Firebase configuration.';
			console.error('Photo loading error:', err);
		} finally {
			loading = false;
		}
	});
	
	function openLightbox(photo: PhotoItem) {
		selectedPhoto = photo;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}
	
	function closeLightbox() {
		selectedPhoto = null;
		lightboxOpen = false;
		document.body.style.overflow = 'auto';
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeLightbox();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="photo-gallery">
	{#if loading}
		<div class="flex justify-center items-center py-16">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			<span class="ml-3 text-gray-600 dark:text-gray-400">Loading photos...</span>
		</div>
	{:else if error}
		<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
			<div class="text-red-600 dark:text-red-400 mb-2">
				<svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
				</svg>
			</div>
			<p class="text-red-800 dark:text-red-200">{error}</p>
		</div>
	{:else if showCategories && Object.keys(categorizedPhotos).length > 0}
		<!-- Categorized Gallery -->
		{#each Object.entries(categorizedPhotos) as [category, categoryPhotos]}
			{#if categoryPhotos.length > 0}
				<div class="mb-12">
					<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
						{category.replace(/[_-]/g, ' ')}
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{columns} gap-4">
						{#each categoryPhotos as photo}
							<div 
								class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-200 dark:bg-gray-700"
								on:click={() => openLightbox(photo)}
								on:keydown={(e) => e.key === 'Enter' && openLightbox(photo)}
								role="button"
								tabindex="0"
							>
								<img 
									src={photo.url} 
									alt={photo.name}
									class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
									<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 8.5l2.5-3 2.5 3h-5z" clip-rule="evenodd"/>
										</svg>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	{:else if photos.length > 0}
		<!-- Single Gallery -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{columns} gap-4">
			{#each photos as photo}
				<div 
					class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-200 dark:bg-gray-700"
					on:click={() => openLightbox(photo)}
					on:keydown={(e) => e.key === 'Enter' && openLightbox(photo)}
					role="button"
					tabindex="0"
				>
					<img 
						src={photo.url} 
						alt={photo.name}
						class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
						loading="lazy"
					/>
					<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
						<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 8.5l2.5-3 2.5 3h-5z" clip-rule="evenodd"/>
							</svg>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center py-16">
			<svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
				<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
			</svg>
			<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No photos found</h3>
			<p class="text-gray-600 dark:text-gray-400">Upload some photos to your Firebase Storage to get started.</p>
		</div>
	{/if}
</div>

<!-- Lightbox Modal -->
{#if lightboxOpen && selectedPhoto}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
		on:click={closeLightbox}
		role="dialog"
		aria-modal="true"
	>
		<div class="relative max-w-4xl max-h-full">
			<button 
				class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
				on:click={closeLightbox}
				aria-label="Close lightbox"
			>
				<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
				</svg>
			</button>
			<img 
				src={selectedPhoto.url} 
				alt={selectedPhoto.name}
				class="max-w-full max-h-full object-contain rounded-lg"
				on:click|stopPropagation
			/>
			<div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
				<p class="text-sm font-medium">{selectedPhoto.name}</p>
				{#if selectedPhoto.timeCreated}
					<p class="text-xs text-gray-300 mt-1">
						{new Date(selectedPhoto.timeCreated).toLocaleDateString()}
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.photo-gallery {
		@apply w-full;
	}
</style>
