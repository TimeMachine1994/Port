import { json } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Initialize SendGrid
const sendgridApiKey = env.SENDGRID_API_KEY;
if (!sendgridApiKey) {
	throw new Error('SENDGRID_API_KEY environment variable is required');
}
sgMail.setApiKey(sendgridApiKey);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return json(
				{ error: 'All fields are required' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Email configuration
		const msg = {
			to: 'tributestream@tributestream.com', // Your email address
			from: 'tributestream@tributestream.com', // Must be verified in SendGrid
			replyTo: email, // User's email for replies
			subject: `Portfolio Contact: ${subject}`,
			text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
			`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #2563eb;">New Contact Form Submission</h2>
					<div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Subject:</strong> ${subject}</p>
					</div>
					<div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
						<h3 style="color: #374151; margin-top: 0;">Message:</h3>
						<p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
					</div>
					<div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
						<p style="margin: 0; font-size: 14px; color: #1e40af;">
							This message was sent from your portfolio contact form.
						</p>
					</div>
				</div>
			`
		};

		// Send email
		await sgMail.send(msg);

		return json(
			{ success: true, message: 'Email sent successfully' },
			{ status: 200 }
		);

	} catch (error) {
		console.error('SendGrid error:', error);
		
		return json(
			{ error: 'Failed to send email. Please try again later.' },
			{ status: 500 }
		);
	}
};
