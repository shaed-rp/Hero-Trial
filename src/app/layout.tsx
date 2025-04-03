import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@styles/global.scss';
import 'react-multi-carousel/lib/styles.css';
import Script from 'next/script';
import GTranslate from '@/utils/gtranslate';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com'
  ),
  title: {
    template: '%s | Commercial EVs',
    default: 'Commercial EVs Showcase',
  },
  description: 'Explore our collection of commercial electric vehicles',
  openGraph: {
    title: {
      template: '%s | Commercial EVs',
      default: 'Commercial EVs Showcase',
    },
    description: 'Explore our collection of commercial electric vehicles',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/icons/default-favicon.ico',
    apple: '/icons/default-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5ZKF55WH');
      `}
        </Script>
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-5ZKF55WH');
        `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5ZKF55WH'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GTranslate />
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
