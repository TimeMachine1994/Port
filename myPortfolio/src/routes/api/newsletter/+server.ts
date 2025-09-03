import { json } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

// Initialize SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email) {
			return json(
				{ error: 'Email is required' },
				{ status: 400 }
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Welcome email to subscriber
		const welcomeMsg = {
			to: email,
			from: 'tributestream@tributestream.com',
			subject: "Welcome to Austin's Muses! 🎨",
			text: `
Welcome to Austin's Muses!

Thank you for subscribing to my quarterly newsletter. You'll receive creative insights, behind-the-scenes stories, and updates from my artistic journey.

What to expect:
• Quarterly creative updates and reflections
• Behind-the-scenes stories from my projects
• Insights on the intersection of tech and media
• Personal stories from my creative journey

I'm excited to share this journey with you!

Best regards,
Austin Bryan Sanchez

---
You're receiving this because you subscribed to Austin's Muses at austinsart.com
To unsubscribe, reply with "UNSUBSCRIBE"
			`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<div style="text-align: center; margin-bottom: 30px;">
						<h1 style="color: #2563eb; margin: 0;">Welcome to Austin's Muses! 🎨</h1>
					</div>
					
					<div style="background-color: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
						<p style="font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
							Thank you for subscribing to my quarterly newsletter. You'll receive creative insights, 
							behind-the-scenes stories, and updates from my artistic journey.
						</p>
					</div>

					<div style="margin-bottom: 30px;">
						<h3 style="color: #374151; margin-bottom: 15px;">What to expect:</h3>
						<ul style="line-height: 1.8; color: #4b5563;">
							<li>Quarterly creative updates and reflections</li>
							<li>Behind-the-scenes stories from my projects</li>
							<li>Insights on the intersection of tech and media</li>
							<li>Personal stories from my creative journey</li>
						</ul>
					</div>

					<div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
						<p style="margin: 0; color: #1e40af; font-weight: 500;">
							I'm excited to share this journey with you!
						</p>
					</div>

					<div style="text-align: center; margin-bottom: 30px;">
						<p style="font-size: 16px; margin: 0;">
							Best regards,<br>
							<strong>Austin Bryan Sanchez</strong>
						</p>
					</div>

					<div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
						<p style="font-size: 12px; color: #6b7280; margin: 0;">
							You're receiving this because you subscribed to Austin's Muses at austinsart.com<br>
							To unsubscribe, reply with "UNSUBSCRIBE"
						</p>
					</div>
				</div>
			`
		};

		// Notification email to Austin
		const notificationMsg = {
			to: 'tributestream@tributestream.com',
			from: 'tributestream@tributestream.com',
			subject: "New Austin's Muses Subscriber",
			text: `
New subscriber to Austin's Muses newsletter:

Email: ${email}
Subscribed at: ${new Date().toLocaleString()}

This subscriber has been sent a welcome email automatically.
			`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #2563eb;">New Austin's Muses Subscriber</h2>
					<div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
					</div>
					<p style="margin-top: 20px; color: #4b5563;">
						This subscriber has been sent a welcome email automatically.
					</p>
				</div>
			`
		};

		// Send both emails
		await Promise.all([
			sgMail.send(welcomeMsg),
			sgMail.send(notificationMsg)
		]);

		return json(
			{ success: true, message: 'Successfully subscribed to newsletter' },
			{ status: 200 }
		);

	} catch (error) {
		console.error('Newsletter subscription error:', error);
		
		return json(
			{ error: 'Failed to subscribe. Please try again later.' },
			{ status: 500 }
		);
	}
};
