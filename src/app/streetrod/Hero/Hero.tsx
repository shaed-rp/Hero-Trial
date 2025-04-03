'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState } from 'react';
import ContactSalesButton from '@/app/components/Button/ContactButton';
import streetrodData from '@data/streetrodData.json';

interface HeroPoint {
  imageUrl: string;
  title: string;
  description: string;
  backgroundImageUrl?: string;
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

const Hero = ({ heroPoints, siteConfig, openModal }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const point = heroPoints[0];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} style={{ color: siteConfig.brandColor }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleContactClick = () => {
    openModal();
  };

  return (
    <section className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={`${point.backgroundImageUrl}`}
            alt='Beach Image'
            fill
            style={{
              borderTopLeftRadius: '30px',
              borderTopRightRadius: '30px',
              objectFit: 'cover',
            }}
            className='primaryBgImage'
          />
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
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <h2 className={`${styles.asSeenOn} ${styles.fadeIn}`}>AS SEEN ON</h2>
          <Image
            src={'/icons/cevTextLogoBlk.png'}
            height={50}
            width={300}
            alt='CEV Logo'
            className={`${styles.cevLogo} ${styles.fadeIn}`}
          />
          <h1>{highlightText(point.title, 'EV')}</h1>
          <p>{point.description}</p>
          <ContactSalesButton
            siteConfig={streetrodData.siteConfig}
            openModal={handleContactClick}
            buttonText='Get A Free Quote'
            id='contact-button-streetrod'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
