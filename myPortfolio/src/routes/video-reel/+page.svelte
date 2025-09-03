<script lang="ts">
	import { onMount } from 'svelte';

	// Video data extracted from your embeds
	const videos = [
		{
			id: '1086224473',
			title: 'Head Games Master Sauce',
			embedUrl: 'https://player.vimeo.com/video/1086224473?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1074841232',
			title: 'Tributestream Advertisement',
			embedUrl: 'https://player.vimeo.com/video/1074841232?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1097907516',
			title: '01 Intro',
			embedUrl: 'https://player.vimeo.com/video/1097907516?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '377685386',
			title: 'KS112419_V1',
			embedUrl: 'https://player.vimeo.com/video/377685386?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '723805584',
			title: 'IMG_0027',
			embedUrl: 'https://player.vimeo.com/video/723805584?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1097922358',
			title: 'Com_Kats Pet Sitting Video',
			embedUrl: 'https://player.vimeo.com/video/1097922358?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '789322524',
			title: 'Tributestream Advert Jan 2023',
			embedUrl: 'https://player.vimeo.com/video/789322524?h=7a822c9ca4&badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '554016629',
			title: 'Presenting: Tributestream',
			embedUrl: 'https://player.vimeo.com/video/554016629?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '562201975',
			title: 'Celebration of Life for Shantilal Pandya​ - Part B',
			embedUrl: 'https://player.vimeo.com/video/562201975?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1097923489',
			title: 'Com_Rob Final Cut AR083019',
			embedUrl: 'https://player.vimeo.com/video/1097923489?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1097936618',
			title: 'Doc_Edit Version 5',
			embedUrl: 'https://player.vimeo.com/video/1097936618?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			id: '1097972400',
			title: 'Travel Hungry S01E01 YouTube',
			embedUrl: 'https://player.vimeo.com/video/1097972400?badge=0&autopause=0&player_id=0&app_id=58479'
		}
	];

	onMount(() => {
		// Load Vimeo player script once
		if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
			const script = document.createElement('script');
			script.src = 'https://player.vimeo.com/api/player.js';
			script.async = true;
			document.head.appendChild(script);
		}
	});
</script>

<svelte:head>
	<title>Video Gallery - Austin's Art</title>
	<meta name="description" content="Video portfolio showcasing Austin's filmmaking work, commercials, documentaries, and creative projects" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
			Video Gallery
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
			A showcase of my filmmaking work spanning commercials, documentaries, promotional content, 
			and creative projects. Each video represents a unique story and creative vision.
		</p>
	</div>

	<!-- Video Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
		{#each videos as video}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
				<!-- Video Embed -->
				<div class="relative" style="padding-bottom: 56.25%; height: 0;">
					<iframe 
						src={video.embedUrl}
						title={video.title}
						frameborder="0" 
						allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
						referrerpolicy="strict-origin-when-cross-origin"
						class="absolute top-0 left-0 w-full h-full rounded-t-lg"
						loading="lazy"
					></iframe>
				</div>
				
				<!-- Video Info -->
				<div class="p-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
						{video.title}
					</h3>
					<div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 100 2h3a1 1 0 100-2H11z"/>
						</svg>
						Video Production
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Call to Action -->
	<div class="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
			Ready to Create Something Amazing?
		</h2>
		<p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
			Let's collaborate on your next video project. From concept to completion, 
			I bring stories to life through compelling visual narratives.
		</p>
		<a 
			href="/contact" 
			class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
		>
			<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
				<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
				<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
			</svg>
			Get In Touch
		</a>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
