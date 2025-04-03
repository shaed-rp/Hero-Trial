'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState } from 'react';
import ContactSalesButton from '@/app/components/Button/ContactButton';
import mullenOneData from '@data/mullenOneData.json';

interface HeroPoint {
  backgroundVideo: string;
  backgroundImageUrl: string;
  imageUrl: string;
  title: string;
  description: string;
}

interface HeroProps {
  heroPoints: HeroPoint[];
  openModal: () => void;
}

const Hero = ({ heroPoints, openModal }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const point = heroPoints[0];

  useEffect(() => {
    setIsLoaded(true);

    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleContactClick = () => {
    openModal();
  };

  return (
    <section className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          {isMobileOrTablet ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={`${point.backgroundVideo}`}
              style={{
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              className={styles.primaryBgVideo}
            />
          ) : (
            <Image
              src={`${point.backgroundImageUrl}`}
              alt='Main Background Image'
              fill
              style={{
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
                objectFit: 'cover',
              }}
              className={styles.primaryBgImage}
            />
          )}
          <div
            className={`${styles.vehicleImage} ${
              isLoaded ? styles.slideInFade : ''
            }`}
          >
            <Image
              src={point.imageUrl}
              alt='Demo Vehicle'
              width={500}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <h1>{point.title}</h1>
          <p>{point.description}</p>
          <Image
            src={'/icons/cevTextLogoBlk.png'}
            height={50}
            width={300}
            alt='CEV Logo'
            className={`${styles.cevLogo} ${styles.fadeIn}`}
          />
          <ContactSalesButton
            siteConfig={mullenOneData.siteConfig}
            openModal={handleContactClick}
            buttonText='Get a Free Quote'
            id='contact-button-mullen-one'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
