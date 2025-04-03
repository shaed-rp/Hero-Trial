'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Specs.module.scss';

interface SpecItem {
  type: string;
  value: string;
}

interface SpecSection {
  title: string;
  data: SpecItem[] | string[];
}

interface SpecsProps {
  specPoints: SpecSection[];
  openModal: () => void;
}

const Specs = ({ specPoints, openModal }: SpecsProps) => {
  const { brandColor } = useTheme();
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

    const animatedElements = document.querySelectorAll(
      `.${styles.specSection}`
    );
    animatedElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.transitionDelay = `${index * 0.2}s`;
      }
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderPricingPowertrain = (section: SpecSection) => (
    <div className={`${styles.specSection} ${styles.pricingPowertrain}`}>
      <h3 className={styles.sectionTitle}>{section.title}</h3>
      <div className={styles.sectionContent}>
        {(section.data as SpecItem[]).map((item, itemIndex) => (
          <div key={itemIndex} className={styles.specItem}>
            <span className={styles.specType}>{item.type}</span>
            <span className={styles.specValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.specs}>
      <div className={styles.specsContainer}>
        <h2 className={styles.title}>Specs</h2>
        <div className={styles.specGrid}>
          <div className={styles.leftColumn}>
            {renderPricingPowertrain(specPoints[0])}
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.specSection}>
              <div className={styles.sectionContent}>
                <p className={styles.thankYouText}>
                  Thank you for exploring the Peterbilt 520EV. Reach out to us
                  today for more information!
                </p>
                <button
                  onClick={openModal}
                  className={styles.moreInfoButton}
                  style={{ backgroundColor: brandColor }}
                  id='specs-more-info-button'
                >
                  More Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specs;
