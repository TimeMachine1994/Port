<script lang="ts">
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="bg-white dark:bg-gray-800 shadow-sm">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex items-center">
				<div class="flex-shrink-0 mr-3">
					<img 
						src="/favicon.svg" 
						alt="Austin's Art Logo" 
						class="h-8 w-8"
					/>
				</div>
				<span class="text-xl font-semibold text-gray-900 dark:text-white">Austin's Art</span>
			</div>
			
			<!-- Desktop Navigation Links -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8">
					<a href="/creative-journey" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						About
					</a>
					<a href="/blog" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						Blog
					</a>
					<a href="/gallery" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						Photo Gallery
					</a>
					<a href="/video-reel" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						Video Gallery
					</a>
					<a href="/resume" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						Resume
					</a>
					<a href="/contact" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
						Contact
					</a>
				</div>
			</div>

			<!-- Mobile Hamburger Button -->
			<div class="md:hidden">
				<button 
					onclick={toggleMobileMenu}
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle navigation menu"
				>
					<!-- Hamburger Icon -->
					<svg 
						class="h-6 w-6 {mobileMenuOpen ? 'hidden' : 'block'}" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
					<!-- Close Icon -->
					<svg 
						class="h-6 w-6 {mobileMenuOpen ? 'block' : 'hidden'}" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		<div class="md:hidden {mobileMenuOpen ? 'block' : 'hidden'}">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
				<a 
					href="/creative-journey" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					About
				</a>
				<a 
					href="/blog" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					Blog
				</a>
				<a 
					href="/gallery" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					Photo Gallery
				</a>
				<a 
					href="/video-reel" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					Video Gallery
				</a>
				<a 
					href="/resume" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					Resume
				</a>
				<a 
					href="/contact" 
					onclick={closeMobileMenu}
					class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium rounded-md transition-colors"
				>
					Contact
				</a>
			</div>
		</div>
	</nav>
</header>
