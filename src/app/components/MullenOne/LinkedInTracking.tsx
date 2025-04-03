'use client';

import Script from 'next/script';
import Image from 'next/image';
import { useEffect } from 'react';

declare global {
  interface Window {
    _linkedin_data_partner_ids: string[];
    lintrk: {
      (command: string, params: { conversion_id: number }): void;
      q?: Array<[string, { conversion_id: number }]>;
    };
  }
}

export default function LinkedInTracking() {
  useEffect(() => {
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push('6694604');
  }, []);

  return (
    <>
      <Script id='linkedin-tracking' strategy='afterInteractive'>
        {`
          window._linkedin_partner_id = "6694604";
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      <noscript>
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <Image
            src='https://px.ads.linkedin.com/collect/?pid=6694604&fmt=gif'
            alt=''
            width={1}
            height={1}
            unoptimized
          />
        </div>
      </noscript>
    </>
  );
}
