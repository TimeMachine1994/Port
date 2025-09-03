<script lang="ts">
	import { onMount } from 'svelte';
	
	let form: HTMLFormElement;
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let errorMessage = '';
	
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (isSubmitting) return;
		
		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				submitStatus = 'success';
				// Reset form
				formData = {
					name: '',
					email: '',
					subject: '',
					message: ''
				};
				form.reset();
			} else {
				submitStatus = 'error';
				errorMessage = result.error || 'Failed to send message';
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Network error. Please try again.';
			console.error('Contact form error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact - Austin's Art</title>
	<meta name="description" content="Get in touch with Austin Bryan Sanchez for filmmaking, photography, and creative collaboration opportunities" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
			Let's Connect
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
			Ready to bring your creative vision to life? Whether you need a filmmaker, photographer, 
			or creative consultant, I'd love to hear about your project.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Contact Info -->
		<div class="space-y-8">
			<div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
				<div class="space-y-4">
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Email</h3>
							<p class="text-gray-600 dark:text-gray-400">tributestream@tributestream.com</p>
						</div>
					</div>
					
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Location</h3>
							<p class="text-gray-600 dark:text-gray-400">Available for projects worldwide</p>
						</div>
					</div>
					
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Response Time</h3>
							<p class="text-gray-600 dark:text-gray-400">Usually within 24 hours</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
				<div class="grid grid-cols-2 gap-3">
					<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Filmmaking</span>
					</div>
					<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Photography</span>
					</div>
					<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Consulting</span>
					</div>
					<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Production</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Contact Form -->
		<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
			
			{#if submitStatus === 'success'}
				<div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
					<div class="flex items-center">
						<svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
						<p class="text-green-800 dark:text-green-200 font-medium">Message sent successfully! I'll get back to you soon.</p>
					</div>
				</div>
			{/if}

			{#if submitStatus === 'error'}
				<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<div class="flex items-center">
						<svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<p class="text-red-800 dark:text-red-200 font-medium">{errorMessage}</p>
					</div>
				</div>
			{/if}

			<form bind:this={form} on:submit={handleSubmit} class="space-y-6">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Name *
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							placeholder="Your name"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Email *
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							placeholder="your@email.com"
						/>
					</div>
				</div>

				<div>
					<label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Subject *
					</label>
					<input
						type="text"
						id="subject"
						bind:value={formData.subject}
						required
						class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						placeholder="What's this about?"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Message *
					</label>
					<textarea
						id="message"
						bind:value={formData.message}
						required
						rows="5"
						class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
						placeholder="Tell me about your project..."
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
				>
					{#if isSubmitting}
						<svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
						</svg>
						<span>Sending...</span>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
						</svg>
						<span>Send Message</span>
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>
