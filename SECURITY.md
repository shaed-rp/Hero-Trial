# Security Documentation

## Overview

This document outlines the security measures implemented in the Hero-Trial project and provides guidance for maintaining security best practices.

## 🔒 Security Features Implemented

### 1. Input Validation & Sanitization

- **Form Validation**: All contact form inputs are validated on both client and server side
- **Email Validation**: Proper email format validation using regex patterns
- **Length Limits**: Input fields have maximum length restrictions to prevent buffer overflow attacks
- **Data Sanitization**: All user inputs are trimmed and sanitized before processing

### 2. reCAPTCHA Protection

- **Google reCAPTCHA v2**: All contact forms are protected with reCAPTCHA
- **Server-side Verification**: reCAPTCHA tokens are verified on the server before processing
- **Rate Limiting**: Helps prevent automated form submissions and spam

### 3. Email Security

- **OAuth2 Authentication**: Preferred method for Gmail authentication (more secure)
- **App Password Fallback**: Secure app password authentication as fallback
- **Environment Variables**: All sensitive credentials stored in environment variables
- **Input Sanitization**: Email content is sanitized to prevent injection attacks

### 4. Environment Security

- **Environment Variables**: All sensitive data stored in `.env.local` (not committed to git)
- **Validation**: Environment variables are validated on application startup
- **Documentation**: Comprehensive setup instructions in `env.example`

### 5. API Security

- **Input Validation**: All API endpoints validate input data
- **Error Handling**: Generic error messages prevent information disclosure
- **CORS**: Proper CORS configuration for cross-origin requests
- **HTTPS**: Production deployments use HTTPS only

## 🛡️ Security Best Practices

### Environment Variables

```bash
# ✅ DO: Use environment variables for sensitive data
EMAIL_USER=your-email@gmail.com
RECAPTCHA_SECRET_KEY=your-secret-key

# ❌ DON'T: Hardcode sensitive data in source code
const emailUser = "your-email@gmail.com";
```

### Email Authentication

```typescript
// ✅ DO: Use OAuth2 when possible
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

// ⚠️ FALLBACK: Use app password only if OAuth2 not available
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});
```

### Input Validation

```typescript
// ✅ DO: Validate all user inputs
function validateContactData(data: any): data is ContactFormData {
  if (!data || typeof data !== 'object') return false;
  
  const { firstName, lastName, email, siteTitle, captchaToken } = data;
  
  // Check required fields
  if (!firstName || !lastName || !email || !siteTitle || !captchaToken) {
    return false;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Validate string lengths
  if (firstName.length > 50 || lastName.length > 50 || email.length > 100) {
    return false;
  }
  
  return true;
}
```

## 🔧 Security Configuration

### Required Environment Variables

```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_TO=recipient@example.com

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key

# OAuth2 Configuration (Recommended)
GMAIL_CLIENT_ID=your-client-id
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token

# OR App Password (Fallback)
EMAIL_PASS=your-app-password
```

### Git Security

```bash
# ✅ DO: Ensure .env.local is in .gitignore
.env*
!.env.example

# ✅ DO: Never commit sensitive files
*.key
*.pem
*.crt
secrets/
credentials/
```

## 🚨 Security Checklist

### Before Deployment

- [ ] All environment variables are properly configured
- [ ] OAuth2 credentials are set up (preferred) or app password is configured
- [ ] reCAPTCHA keys are valid and domain-restricted
- [ ] HTTPS is enabled in production
- [ ] Environment variables are not committed to version control
- [ ] All dependencies are up to date
- [ ] Security headers are configured

### Regular Maintenance

- [ ] Rotate OAuth2 refresh tokens periodically
- [ ] Update app passwords regularly
- [ ] Monitor reCAPTCHA analytics for suspicious activity
- [ ] Keep dependencies updated
- [ ] Review access logs for unusual patterns
- [ ] Test form submissions regularly

## 🆘 Incident Response

### If Credentials Are Compromised

1. **Immediate Actions**:
   - Revoke compromised credentials immediately
   - Generate new OAuth2 tokens or app passwords
   - Update environment variables
   - Restart application

2. **Investigation**:
   - Review access logs
   - Check for unauthorized email usage
   - Monitor for suspicious form submissions

3. **Prevention**:
   - Implement additional monitoring
   - Review security practices
   - Consider additional security measures

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Contact the development team privately
3. Provide detailed information about the vulnerability
4. Allow time for assessment and remediation

## 📚 Additional Resources

- [Google Cloud Console](https://console.cloud.google.com/) - OAuth2 setup
- [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) - reCAPTCHA configuration
- [Gmail App Passwords](https://myaccount.google.com/apppasswords) - App password generation
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers) - Security headers
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web application security risks

## 🔄 Security Updates

This document should be reviewed and updated regularly to reflect:

- New security features implemented
- Changes in security best practices
- Updates to dependencies with security implications
- Lessons learned from security incidents

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Maintained By**: Development Team 