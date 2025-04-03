'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      const vehiclePath = window.location.pathname.split('/')[1];
      router.push(`/${vehiclePath}`);
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className={styles.thankyouContainer}>
      <h1 className={styles.header}>Thank You!</h1>
      <p className={styles.thankyouText}>
        We&apos;ve successfully received your inquiry and appreciate your
        interest.
      </p>
      <p className={styles.thankyouText}>Our team will be in contact soon.</p>
      <p className={styles.redirectText}>
        Redirecting you back in {countdown} seconds...
      </p>
    </div>
  );
};

export default ThankYou;
