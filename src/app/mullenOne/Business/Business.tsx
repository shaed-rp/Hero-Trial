'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Business.module.scss';

interface BusinessItem {
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLinkUrl?: string;
}

interface BusinessProps {
  businessPoints: {
    title: string;
    businessPoints: BusinessItem[];
  };
  brandColor?: string;
}

const Business = ({ businessPoints, brandColor }: BusinessProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(
      `.${styles.animatedElement}`
    );
    animatedElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.transitionDelay = `${index * 0.1}s`;
      }
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className={styles.business}>
      <h2 className={styles.title}>{businessPoints.title}</h2>
      <div className={styles.content}>
        {businessPoints.businessPoints.map((point, index) => (
          <div key={index} className={styles.businessItem}>
            <div
              className={`${styles.imageContainer} ${styles.animatedElement} ${styles.fadeInUp}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={point.imageUrl}
                  alt={point.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={point.imageUrl}
                  alt={point.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
              </div>
            </div>
            <div
              className={`${styles.textContent} ${styles.animatedElement} ${styles.fadeInUp}`}
            >
              <h3 className={styles.pointTitle}>{point.title}</h3>
              <p className={styles.pointDescription}>{point.description}</p>
              <a
                href={point.buttonLinkUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.button}
                style={{ backgroundColor: brandColor }}
              >
                {point.buttonText} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Business;
