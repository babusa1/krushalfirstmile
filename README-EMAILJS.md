
# EmailJS Integration Instructions

This application uses EmailJS to send emails directly from JavaScript without a server. Follow these steps to set it up:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and create an account

## Step 2: Connect Your Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service" 
3. Choose your email provider (for krushal.in domain)
4. Follow the authentication steps

## Step 3: Create Email Templates
1. Go to "Email Templates" in your dashboard
2. Create two templates:
   - One for contact form submissions (emails will be sent to info@krushal.in)
   - One for agent submissions (emails will be sent to agents@krushal.in)
3. Use these template parameters:
   - Contact form template: `from_name`, `reply_to`, `phone_number`, `message`, `to_email`
   - Agent form template: `to_email`, `from_name`, `from_email`, `subject`, `message`

## Step 4: Get Your API Keys
1. Get your "Public Key" from Account > API Keys
2. Note your "Service ID" from Email Services
3. Note your "Template IDs" from Email Templates

## Step 5: Add Environment Variables
Add these environment variables to your deployment platform:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_AGENT_TEMPLATE_ID=your_agent_template_id
```

## Testing
After setting up, test both forms to ensure emails are being sent correctly.

## Additional Resources
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
