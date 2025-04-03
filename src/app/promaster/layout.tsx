import { Metadata } from 'next';
import promasterData from '@/data/promasterData.json';
import Script from 'next/script';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: promasterData.siteConfig.title,
    description: promasterData.siteConfig.description,
    openGraph: {
      title: promasterData.siteConfig.title,
      description: promasterData.siteConfig.description,
      url: promasterData.siteConfig.url,
      siteName: promasterData.siteConfig.title,
      images: [
        {
          url: promasterData.siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: promasterData.siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: promasterData.siteConfig.title,
      description: promasterData.siteConfig.description,
      images: [promasterData.siteConfig.ogImage],
    },
    icons: {
      icon: promasterData.siteConfig.faviconUrl,
      apple: promasterData.siteConfig.faviconUrl,
    },
  };
}

export default function ProMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=AW-16652557826'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16652557826');
        `}
      </Script>

      <Script id='google-analytics-conversion' strategy='afterInteractive'>
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-16652557826/vNXkCPz79NoZEIK8x4Q-',
            'value': 50.0,
            'currency': 'USD'
          });
        `}
      </Script>

      <Script id='linkedin-insight' strategy='afterInteractive'>
        {`
          window._linkedin_partner_id = "6694604";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>

      <noscript>
        <Image
          src='https://px.ads.linkedin.com/collect/?pid=6694604&fmt=gif'
          alt=''
          height={1}
          width={1}
          style={{ display: 'none' }}
          unoptimized
          priority={false}
        />
      </noscript>

      {children}
    </>
  );
}
