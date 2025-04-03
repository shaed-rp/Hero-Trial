'use client';

import Image from 'next/image';
import styles from './Overview.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface OverviewPoint {
  title?: string;
  description: string;
  imageUrl?: string;
}

interface OverviewProps {
  overview: {
    title: string;
    navLinkText: string;
    specs: OverviewPoint[];
  };
}

const Overview = ({ overview }: OverviewProps) => {
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);
  const cardSizes = [
    'large',
    'small',
    'medium',
    'large',
    'vertical',
    'small',
    'small',
    'small',
    'medium',
    'medium',
  ];

  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    pointsRef.current[index] = el;
  }, []);

  useEffect(() => {
    setAnimatedItems(new Array(cardSizes.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pointsRef.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setAnimatedItems((prev) => {
                const newAnimatedItems = [...prev];
                newAnimatedItems[index] = true;
                return newAnimatedItems;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    pointsRef.current.forEach((point) => {
      if (point) observer.observe(point);
    });

    return () => observer.disconnect();
  }, [cardSizes.length]);

  return (
    <section className={styles.overview}>
      <div className={styles.overviewContainer}>
        <h2 className={styles.title}>Overview</h2>
        <div className={styles.pointsContainer}>
          {cardSizes.map((size, index) => (
            <div
              key={index}
              className={`${styles.point} ${styles[size]} ${
                animatedItems[index] ? styles.animate : ''
              }`}
              ref={(el) => setRef(el, index)}
            >
              {overview.specs[index] && (
                <React.Fragment>
                  {size === 'medium' && index !== 9 ? (
                    <>
                      <div className={styles.content}>
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        <p className={styles.pointDescription}>
                          {overview.specs[index].description}
                        </p>
                      </div>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title ||
                              overview.specs[index].description
                            }
                            fill
                            objectFit={
                              overview.specs[index].imageUrl.includes(
                                'turnRadius.png'
                              )
                                ? 'contain'
                                : 'cover'
                            }
                            className={`${styles.mainImage} ${
                              overview.specs[index].imageUrl.includes(
                                'turnRadius.png'
                              )
                                ? styles.turnRadiusImage
                                : ''
                            }`}
                          />
                          <div className={styles.imageGradientRight}></div>
                        </div>
                      )}
                    </>
                  ) : size === 'medium' ? (
                    <>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title ||
                              overview.specs[index].description
                            }
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.mainImage}
                          />
                          <div className={styles.imageGradientLeft}></div>
                        </div>
                      )}
                      <div className={styles.content}>
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        <p className={styles.pointDescription}>
                          {overview.specs[index].description}
                        </p>
                      </div>
                    </>
                  ) : size === 'vertical' ? (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={overview.specs[index].imageUrl || ''}
                          alt={
                            overview.specs[index].title ||
                            overview.specs[index].description
                          }
                          fill
                          style={{ objectFit: 'cover' }}
                          className={styles.mainImage}
                        />
                        <div className={styles.imageGradient}></div>
                      </div>
                      <div className={styles.content}>
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        <p className={styles.pointDescription}>
                          {overview.specs[index].description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title ||
                              overview.specs[index].description
                            }
                            width={size === 'large' ? 200 : 200}
                            height={size === 'large' ? 200 : 100}
                            style={{ objectFit: 'contain' }}
                            className={styles.mainImage}
                          />
                        </div>
                      )}
                      <div className={styles.content}>
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        <p className={styles.pointDescription}>
                          {overview.specs[index].description}
                        </p>
                      </div>
                    </>
                  )}
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
