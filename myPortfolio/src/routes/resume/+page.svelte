<script lang="ts">
	import { onMount } from 'svelte';
	
	let navbar: HTMLElement;
	
	onMount(() => {
		// Smooth scroll for navigation links
		const navItems = document.querySelectorAll('a[href^="#"]');
		navItems.forEach(item => {
			item.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href && href.startsWith('#')) {
					e.preventDefault();
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}
				}
			});
		});
		
		// Navbar transparency on scroll
		const handleScroll = () => {
			if (navbar) {
				if (window.scrollY > 50) {
					navbar.classList.add('bg-white/80', 'dark:bg-gray-800/80', 'backdrop-blur-sm');
				} else {
					navbar.classList.remove('bg-white/80', 'dark:bg-gray-800/80', 'backdrop-blur-sm');
				}
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Austin B. Sanchez - Resume</title>
	<meta name="description" content="Professional resume of Austin B. Sanchez - Entrepreneur, Filmmaker, Technical Professional" />
</svelte:head>

<!-- Sticky Resume Navigation -->
<nav bind:this={navbar} class="fixed top-16 w-full z-40 transition-all duration-300 bg-transparent">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-center py-4">
			<div class="flex items-center space-x-6 text-sm font-medium">
				<a href="#summary" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors">
					Summary
				</a>
				<a href="#experience" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors">
					Experience
				</a>
				<a href="#education" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors">
					Education
				</a>
				<a href="#skills" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors">
					Skills
				</a>
				<a href="#achievements" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors">
					Achievements
				</a>
			</div>
		</div>
	</div>
</nav>

<div class="pt-32 pb-16">
	<!-- Hero Section -->
	<section class="text-center py-20 min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 rounded-xl mb-16 shadow-2xl mx-4 sm:mx-6 lg:mx-8">
		<div class="text-white animate-fade-in">
			<h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">Austin B. Sanchez</h1>
			<p class="text-xl md:text-2xl font-light mb-6">Entrepreneur | Filmmaker | Technical Professional</p>
			<div class="flex flex-wrap justify-center gap-6 text-lg">
				<a href="mailto:AustinBryanFilm@gmail.com" class="text-blue-300 hover:text-blue-100 hover:underline transition-colors">
					Email
				</a>
				<a href="tel:+14072215922" class="text-blue-300 hover:text-blue-100 hover:underline transition-colors">
					Phone
				</a>
				<a href="http://phoenixvideocreations.com" target="_blank" class="text-blue-300 hover:text-blue-100 hover:underline transition-colors">
					Website
				</a>
			</div>
		</div>
	</section>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Professional Summary -->
		<section id="summary" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 scroll-mt-32">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Professional Summary</h2>
			<p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
				A versatile entrepreneur, filmmaker, and technical professional with over 15 years of experience in 
				<strong>video production</strong>, <strong>brand development</strong>, and <strong>technical support</strong>. 
				A founder of <strong>Tributestream</strong>, a livestreaming company focused on celebrations of life, Austin has 
				extensive experience in the legal videography industry. He is recognized for his technical proficiency, business 
				acumen, and ability to lead teams, with a career focus on the intersection of video, technology, and human emotion.
			</p>
		</section>

		<!-- Work Experience -->
		<section id="experience" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 scroll-mt-32">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Work Experience</h2>
			
			<div class="space-y-10">
				<!-- The Presentation Group -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">The Presentation Group</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Trial Consultant, Litigation Graphic Designer, Video Editor | March 2024–Current</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Assisted attorneys in obtaining favorable jury verdicts by preparing case files and trial presentations.</li>
						<li>Used <strong>Photoshop</strong>, <strong>PowerPoint</strong>, and <strong>Premiere Pro</strong> to edit and modify images and videos.</li>
						<li>Provided live trial technician support by setting up equipment and troubleshooting.</li>
					</ul>
				</div>

				<!-- Veritext -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">Veritext / Lexitas / Orange Legal / Hybrid Depo</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Legal Videographer | July 2019–Current</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Filmed over 200 trial-ready video depositions and medical evaluations.</li>
						<li>Trained and mentored digital reporters, enabling them to become proficient videographers.</li>
						<li>Edited videos for clients based on timestamps using <strong>Adobe Premiere Pro</strong>.</li>
					</ul>
				</div>

				<!-- Tributestream -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">Tributestream</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Founder, Livestream Producer | September 2019–Current</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Coordinated over 100 livestreams, generating tens of thousands in annual sales.</li>
						<li>Hired and trained contractors by developing standard operating procedures (SOPs).</li>
						<li>Developed a business plan, filed for an LLC and EIN, and managed all marketing.</li>
					</ul>
				</div>

				<!-- Broadcast Med -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">Broadcast Med / Digitell</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Livestream Producer | September 2018–March 2024</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Executed over 200 corporate livestreams using <strong>Wirecast</strong> and <strong>Zoom</strong>.</li>
						<li>Installed complex computer systems for livestreaming in hotels and event centers.</li>
						<li>Provided hands-on training for new team members.</li>
					</ul>
				</div>

				<!-- The VOID -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">The VOID, at Disney Springs</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Virtual Reality Technician | December 2017–April 2019</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Installed low-voltage wiring for security cameras and internet.</li>
						<li>Repaired and maintained virtual reality hardware.</li>
						<li>Used proprietary software to accelerate troubleshooting and avoid delays.</li>
					</ul>
				</div>

				<!-- Lowe's -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">Lowe's Home Improvement Stores</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Customer Service Associate | September 2016–September 2017</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Operated heavy machinery, including forklifts and table saws.</li>
						<li>Developed organization systems and maps for the electrical department.</li>
					</ul>
				</div>

				<!-- CapTel -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">CapTel Service Specialists</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Caption Assistant and Coach | May 2013–November 2017</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Provided closed captioning for the hard of hearing, maintaining high accuracy and speed.</li>
						<li>Promoted to coach, helping employees become compliant with SOPs.</li>
					</ul>
				</div>

				<!-- TJ Maxx -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">TJ Maxx</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Cashier and Customer Associate | April 2012–October 2012</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Handled cash and credit transactions and assisted customers.</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Education -->
		<section id="education" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 scroll-mt-32">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
			
			<div class="space-y-10">
				<!-- UCF -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">University of Central Florida</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Bachelor's Degree in Film, Minor: Psychology | August 2011–May 2016</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Founded and served as President of <strong>The Screenwriting Club at UCF</strong> for three years.</li>
						<li>Produced two school-wide screenwriting festivals and secured thousands of dollars in funding.</li>
						<li>Volunteered as a studio intern for <strong>WUCF TV</strong>.</li>
					</ul>
				</div>
				
				<!-- Hagerty High School -->
				<div class="relative pl-8 border-l-4 border-blue-300 dark:border-blue-600">
					<div class="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md"></div>
					<h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">Paul J. Hagerty High School</h3>
					<p class="text-gray-600 dark:text-gray-400 font-medium">Business Professional of America Student Member | August 2008–May 2011</p>
					<ul class="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
						<li>Won 1st Place in Video Production and HTML Development at the local and state levels.</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Skills -->
		<section id="skills" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 scroll-mt-32">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Skills</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Filmmaking</h3>
					<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
						<li>Screenwriting & Copywriting</li>
						<li>Cinematography & Color Grading</li>
						<li>Video Production & Editing</li>
					</ul>
				</div>
				<div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Technology</h3>
					<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
						<li>Virtual Reality Development</li>
						<li>Low-Voltage Installation</li>
						<li>PC Troubleshooting</li>
						<li>Website Development</li>
					</ul>
				</div>
				<div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Business & Leadership</h3>
					<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
						<li>Project Management</li>
						<li>Corporate Event Planning</li>
						<li>Team Training & Branding</li>
						<li>Sales & Networking</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Achievements -->
		<section id="achievements" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-16 scroll-mt-32">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notable Achievements</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<span class="text-lg text-gray-700 dark:text-gray-300">Founder of <strong>The Screenwriting Club</strong></span>
				</div>
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<span class="text-lg text-gray-700 dark:text-gray-300"><strong>NPR How I Built This Fellow</strong></span>
				</div>
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<span class="text-lg text-gray-700 dark:text-gray-300"><strong>1st Place</strong> in State-Wide Championships for Business Professionals of America, 2009</span>
				</div>
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<span class="text-lg text-gray-700 dark:text-gray-300">Produced and filmed over <strong>20 short films</strong></span>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from { 
			opacity: 0; 
			transform: translateY(20px); 
		}
		to { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}
	
	.animate-fade-in {
		animation: fadeIn 1.5s ease-in-out;
	}
</style>
