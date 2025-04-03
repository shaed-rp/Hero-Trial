'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Design.module.scss';

interface DesignItem {
  imageUrl: string;
  alt: string;
}

interface DesignProps {
  designPoints: {
    title: string;
    images: DesignItem[];
  };
}

const Design: React.FC<DesignProps> = ({ designPoints }) => {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Memoize the startAnimation function using useCallback
  const startAnimation = useCallback(() => {
    designPoints.images.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 200);
    });
  }, [designPoints.images]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observerRef.current?.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [startAnimation]);

  return (
    <section ref={sectionRef} className={styles.design}>
      <h2 className={styles.title}>{designPoints.title}</h2>
      <div className={styles.imageGrid}>
        {designPoints.images.map((image, index) => {
          let sizeClass = '';
          if (index === 0) sizeClass = styles.large;
          else if (index === 1) sizeClass = styles.tall;
          else sizeClass = styles.small;

          return (
            <div
              key={index}
              className={`${styles.imageContainer} ${sizeClass} ${
                visibleImages.includes(index) ? styles.visible : ''
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Design;
