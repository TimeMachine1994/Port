<script lang="ts">
	let email = '';
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let message = '';

	async function handleSubscribe(event: Event) {
		event.preventDefault();
		
		if (isSubmitting) return;
		
		isSubmitting = true;
		submitStatus = 'idle';
		message = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const result = await response.json();

			if (response.ok) {
				submitStatus = 'success';
				message = 'Thank you for subscribing! Check your email for confirmation.';
				email = '';
			} else {
				submitStatus = 'error';
				message = result.error || 'Failed to subscribe. Please try again.';
			}
		} catch (error) {
			submitStatus = 'error';
			message = 'Network error. Please try again.';
			console.error('Newsletter subscription error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>My Creative Journey - Austin's Art</title>
	<meta name="description" content="Follow Austin's creative journey from childhood painting to professional filmmaking and entrepreneurship" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
			My Creative Journey
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
			A story of passion, growth, and the intersection of technology and creativity
		</p>
	</div>

	<!-- Journey Content -->
	<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
		<div class="prose prose-lg dark:prose-invert max-w-none">
			<p class="text-lg leading-relaxed mb-6">
				My creative journey started as a youngster, painting and making silly home videos. About the age of ten years old is when I got my first 35mm photography camera. Since then I've been focused on the cross section of tech and media, studying filmmaking and screenwriting in college, running a screenwriting club and taking business classes throughout my life.
			</p>
			<p class="text-lg leading-relaxed mb-6">
				For the past six years I've been dedicating my skillset to Tributestream and my clients. Join me on this magnificent journey of life and creation!
			</p>
		</div>
	</div>

	<!-- Newsletter Subscription -->
	<div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12">
		<div class="text-center mb-8">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
				Austin's Muses
			</h2>
			<p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
				Subscribe to my quarterly newsletter for insights, creative updates, and behind-the-scenes stories from my artistic journey.
			</p>
		</div>

		{#if submitStatus === 'success'}
			<div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
				<div class="flex items-center justify-center">
					<svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
					<p class="text-green-800 dark:text-green-200 font-medium text-center">{message}</p>
				</div>
			</div>
		{/if}

		{#if submitStatus === 'error'}
			<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
				<div class="flex items-center justify-center">
					<svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					<p class="text-red-800 dark:text-red-200 font-medium text-center">{message}</p>
				</div>
			</div>
		{/if}

		<form on:submit={handleSubscribe} class="max-w-md mx-auto">
			<div class="flex flex-col sm:flex-row gap-4">
				<input
					type="email"
					bind:value={email}
					required
					placeholder="Enter your email address"
					class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
				/>
				<button
					type="submit"
					disabled={isSubmitting}
					class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
				>
					{#if isSubmitting}
						<svg class="animate-spin w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
						</svg>
						Subscribing...
					{:else}
						Subscribe
					{/if}
				</button>
			</div>
		</form>

		<p class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
			Quarterly updates • No spam • Unsubscribe anytime
		</p>
	</div>
</div>
