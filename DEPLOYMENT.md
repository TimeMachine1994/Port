# Firebase App Hosting Deployment Guide

## Setup

1. **Copy the configuration template:**
   ```bash
   cp myPortfolio/apphosting.yaml.template myPortfolio/apphosting.yaml
   ```

2. **Set up Firebase secrets:**
   ```bash
   firebase apphosting:secrets:set SENDGRID_API_KEY
   firebase apphosting:secrets:grantaccess SENDGRID_API_KEY --backend myportfolio
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only apphosting
   ```

## Important Notes

- `apphosting.yaml` is gitignored for security (contains secret references)
- Always use the template to recreate the config file locally
- Never commit actual API keys or secrets to the repository
- The SendGrid API key is stored securely in Firebase Secret Manager

## Configuration

The app uses:
- **Runtime:** Node.js 22
- **Adapter:** @sveltejs/adapter-node
- **Build output:** `build/` directory
- **Secrets:** SENDGRID_API_KEY (for contact form)
