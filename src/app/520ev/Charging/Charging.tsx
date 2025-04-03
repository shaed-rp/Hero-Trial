'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Charging.module.scss';

interface ChargingOption {
  imageUrl: string;
  title: string;
  description: string;
}

interface ChargingProps {
  chargingPoints: {
    title: string;
    chargingOptions: ChargingOption[];
  };
}

const Charging = ({ chargingPoints }: ChargingProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!chargingPoints) {
    return null;
  }

  const option = chargingPoints.chargingOptions[0];

  return (
    <section className={styles.charging}>
      <h2 className={styles.title}>{chargingPoints.title}</h2>
      <div className={styles.content}>
        <div
          className={`${styles.chargingOptions} ${styles.fadeIn} ${styles.fromLeft}`}
          ref={cardRef}
        >
          <div className={styles.imageContainer}>
            <Image
              src={option.imageUrl}
              alt={option.title}
              fill
              style={{ scale: 1.2, objectFit: 'contain' }}
            />
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.optionDescription}>{option.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charging;
