'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Build.module.scss';
import Image from 'next/image';

interface ProcessSteps {
  [key: string]: string;
}

interface BuildItem {
  vehicleImageUrl: string;
  alt: string;
  process: ProcessSteps[];
}

interface BuildProps {
  buildPoints: BuildItem[];
}

const Build = ({ buildPoints }: BuildProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(`.${styles.animated}`);
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className={styles.build}>
      <div className={styles.buildContainer}>
        <h2 className={styles.title}>Build yours!</h2>
        <div className={styles.buildContent}>
          {buildPoints.map((item, index) => (
            <div key={index} className={styles.buildItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.vehicleImageUrl}
                  alt={item.alt}
                  className={`${styles.image} ${styles.animated} ${styles.slideFromLeft}`}
                />
              </div>
              <div className={styles.processSteps}>
                {item.process.map((stepObj, idx) => (
                  <div key={idx} className={styles.processList}>
                    {Object.entries(stepObj).map(
                      ([step, description], stepIdx) => (
                        <div
                          key={step}
                          className={`${styles.processItem} ${styles.animated} ${styles.slideFromRight}`}
                          style={{
                            transitionDelay: `${
                              (idx * Object.keys(stepObj).length + stepIdx) *
                                0.1 +
                              0.3
                            }s`,
                          }}
                        >
                          <strong>{step}:</strong> {description}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Build;
