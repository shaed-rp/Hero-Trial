'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ThankYou from '@/app/components/ThankYou/ThankYou';

const ThankYouPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.lintrk) {
      window.lintrk('track', { conversion_id: 6694604 });
    }

    const timer = setTimeout(() => {
      const returnPath = localStorage.getItem('returnPath');
      localStorage.removeItem('returnPath');
      router.push(returnPath || `/${window.location.pathname.split('/')[1]}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return <ThankYou />;
};

export default ThankYouPage;
