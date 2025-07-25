// Environment validation utility for server-side use only
interface EnvironmentConfig {
  // Email Configuration
  EMAIL_USER: string;
  EMAIL_PASS?: string; // Optional if using OAuth2
  EMAIL_TO: string;
  EMAIL_FROM_NAME?: string;
  
  // OAuth2 Configuration (preferred over app password)
  GMAIL_CLIENT_ID?: string;
  GMAIL_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
  
  // reCAPTCHA Configuration
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
  RECAPTCHA_SECRET_KEY: string;
  
  // Analytics
  NEXT_PUBLIC_GTM_ID?: string;
  
  // Base URL
  NEXT_PUBLIC_BASE_URL?: string;
}

function validateEnvironmentVariables(): EnvironmentConfig {
  // Only run validation on server side
  if (typeof window !== 'undefined') {
    throw new Error('Environment validation should only run on the server side');
  }

  const env = process.env as Record<string, string | undefined>;

  const requiredVars = [
    'EMAIL_USER',
    'EMAIL_TO',
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
    'RECAPTCHA_SECRET_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }

  // Check email authentication method
  const hasOAuth2 = env.GMAIL_CLIENT_ID && 
                   env.GMAIL_CLIENT_SECRET && 
                   env.GMAIL_REFRESH_TOKEN;
  
  const hasAppPassword = env.EMAIL_PASS;

  if (!hasOAuth2 && !hasAppPassword) {
    throw new Error(
      'Email authentication not configured. Please set up either OAuth2 credentials ' +
      '(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN) or app password (EMAIL_PASS).'
    );
  }

  if (hasOAuth2 && hasAppPassword) {
    console.warn(
      'Both OAuth2 and app password are configured. OAuth2 will be used (recommended).'
    );
  }

  return {
    EMAIL_USER: env.EMAIL_USER!,
    EMAIL_PASS: env.EMAIL_PASS,
    EMAIL_TO: env.EMAIL_TO!,
    EMAIL_FROM_NAME: env.EMAIL_FROM_NAME,
    GMAIL_CLIENT_ID: env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: env.GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN: env.GMAIL_REFRESH_TOKEN,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
    RECAPTCHA_SECRET_KEY: env.RECAPTCHA_SECRET_KEY!,
    NEXT_PUBLIC_GTM_ID: env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_BASE_URL: env.NEXT_PUBLIC_BASE_URL,
  };
}

export function getValidatedEnv(): EnvironmentConfig {
  try {
    return validateEnvironmentVariables();
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw error;
  }
}

export function isProduction(): boolean {
  return (process.env as Record<string, string | undefined>).NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return (process.env as Record<string, string | undefined>).NODE_ENV === 'development';
} 