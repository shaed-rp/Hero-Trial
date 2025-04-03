'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [showRedirectText, setShowRedirectText] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    if (path !== path.toLowerCase()) {
      router.replace(path.toLowerCase());
    }

    const timeout = setTimeout(() => {
      setShowRedirectText(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.notFoundContainer}>
      <Image
        src='/icons/cevPulseLogo.gif'
        alt='Loading'
        width={450}
        height={250}
        priority
      />
      {showRedirectText && (
        <div className={styles.redirectText}>
          <p>
            It appears the page you&apos;re looking for doesn&apos;t exist.{' '}
            <Link href='/'>Click here to go home.</Link>
          </p>
        </div>
      )}
    </div>
  );
}
