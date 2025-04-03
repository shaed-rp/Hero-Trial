'use client';

import Image from 'next/image';
import styles from './Capability.module.scss';
import { useEffect, useRef } from 'react';

interface CapabilitySpec {
  label: string;
  value?: string;
  imageUrl?: string;
}

interface CapabilitiesProps {
  specs: CapabilitySpec[];
}

const Capability = ({ capabilities }: { capabilities: CapabilitiesProps }) => {
  const { specs } = capabilities;
  const specItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.slideIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    specItemsRef.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.capability}>
      <div className={styles.capabilityContainer}>
        <h1 className={styles.title}>From Fairway to Roadway</h1>
        <div className={styles.content}>
          <div className={styles.specsContainer}>
            {specs.map((spec, index) => (
              <div
                key={index}
                ref={(el) => {
                  specItemsRef.current[index] = el;
                }}
                className={`${styles.specItem} ${
                  index === 2 ? styles.rightAligned : ''
                }`}
              >
                {spec.imageUrl ? (
                  <div className={styles.imageCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={spec.imageUrl}
                        alt={spec.label || 'Capability image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.zoomedImage}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.specContent}>
                    <div className={styles.labelWrapper}>
                      <p className={styles.specLabel}>{spec.label}</p>
                    </div>
                    {spec.value && (
                      <div className={styles.valueWrapper}>
                        <p className={styles.specValue}>{spec.value}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capability;
