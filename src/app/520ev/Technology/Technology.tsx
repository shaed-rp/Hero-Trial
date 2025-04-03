'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './Technology.module.scss';
import type { ResponsiveType } from 'react-multi-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });

interface TechnologyPoint {
  imageUrl: string;
  title: string;
  description: string;
}

interface TechnologyProps {
  technologyPoints: {
    title: string;
    technology: TechnologyPoint[];
  };
}

interface CustomButtonGroupProps {
  next?: () => void;
  previous?: () => void;
}

const CustomButtonGroup = ({ next, previous }: CustomButtonGroupProps) => (
  <div className={styles.customButtonGroup}>
    <button
      className={`${styles.customArrow} ${styles.leftArrow}`}
      onClick={previous}
      aria-label='Previous'
    >
      <ChevronLeft size={36} />
    </button>
    <button
      className={`${styles.customArrow} ${styles.rightArrow}`}
      onClick={next}
      aria-label='Next'
    >
      <ChevronRight size={36} />
    </button>
  </div>
);

const Technology = ({ technologyPoints }: TechnologyProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section className={styles.technologies}>
      <h2 className={styles.title} style={{ color: '#fff' }}>
        {technologyPoints.title}
      </h2>
      <div className={styles.carouselContainer}>
        {mounted && (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            className={styles.carousel}
            arrows={false}
            customButtonGroup={<CustomButtonGroup />}
            renderButtonGroupOutside={true}
          >
            {technologyPoints.technology.map((point, index) => (
              <div key={index} className={styles.chargingOptions}>
                <div className={styles.imageContainer} data-title={point.title}>
                  <Image
                    src={point.imageUrl}
                    alt={point.title}
                    fill
                    style={{
                      objectFit:
                        point.title === 'Peterbilt 579EV' ? 'contain' : 'cover',
                      transform:
                        point.title === 'Peterbilt 579EV'
                          ? 'scale(0.6)'
                          : 'none',
                    }}
                    className={`${styles.image} ${
                      point.title === 'Peterbilt 579EV' ? styles.semiImage : ''
                    }`}
                  />
                </div>
                <div className={styles.infoContainer}>
                  <h3 className={styles.optionTitle}>{point.title}</h3>
                  <p className={styles.optionDescription}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Technology;
