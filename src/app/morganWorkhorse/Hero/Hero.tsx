'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import ContactSalesButton from '@components/Button/ContactButton';
import morganWhData from '@data/morganWhData.json';

interface HeroPoint {
  backgroundVideo?: string;
  backgroundImageUrl: string;
  imageUrl: string;
  title: string;
  description: string;
  topImageLogo: string;
}

interface SiteConfig {
  link: string;
  brandColor: string;
}

interface HeroProps {
  heroPoints: HeroPoint[];
  siteConfig: SiteConfig;
  openModal: () => void;
}

const Hero = ({ heroPoints, openModal }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDesktop } = useScreenSize();
  const point = heroPoints[0];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getVehicleImageSize = () => {
    if (isDesktop) {
      return {
        width: 600,
        height: 400,
      };
    } else if (window.innerWidth >= 768) {
      return {
        width: 500,
        height: 350,
      };
    } else if (window.innerWidth >= 468) {
      return {
        width: 400,
        height: 300,
      };
    } else {
      return {
        width: 350,
        height: 250,
      };
    }
  };

  const handleContactClick = () => {
    openModal();
  };

  return (
    <section className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          {isDesktop && point.backgroundVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={point.backgroundVideo}
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
              src={point.backgroundImageUrl}
              alt='Main Background Image'
              fill
              style={{
                objectFit: 'cover',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
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
              {...getVehicleImageSize()}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <h1>{point.title}</h1>
          <p>{point.description}</p>
          <Image
            src={'/icons/cevTextLogoBlk.png'}
            height={isDesktop ? 50 : 40}
            width={isDesktop ? 300 : 240}
            alt='CEV Logo'
            className={`${styles.cevLogo} ${styles.fadeIn}`}
          />
          <ContactSalesButton
            siteConfig={morganWhData.siteConfig}
            openModal={handleContactClick}
            buttonText='Get a Free Quote'
            id='contact-button-morgan-workhorse'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
