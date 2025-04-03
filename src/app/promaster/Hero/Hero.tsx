'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import ContactSalesButton from '@/app/components/Button/ContactButton';
import promasterData from '@/data/promasterData.json';

interface HeroPoint {
  backgroundVideo?: string;
  backgroundImageUrl?: string;
  imageUrl: string;
  title: string;
  description: string;
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
  const { isDesktop } = useScreenSize();
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

  const renderBackground = () => {
    if (isDesktop && point.backgroundVideo) {
      return (
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
      );
    } else if (point.backgroundImageUrl) {
      return (
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
      );
    }
    return null;
  };

  const handleContactClick = () => {
    openModal();
  };

  return (
    <section className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          {renderBackground()}
          <div
            className={`${styles.vehicleImage} ${
              isLoaded ? styles.slideInFade : ''
            }`}
          >
            <Image
              src={point.imageUrl}
              alt='Demo Vehicle'
              width={isDesktop ? 500 : 400}
              height={isDesktop ? 400 : 300}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <h1>{highlightText(point.title, 'EV')}</h1>
          <p>{point.description}</p>
          <Image
            src={'/icons/cevTextLogoBlk.png'}
            height={isDesktop ? 50 : 40}
            width={isDesktop ? 300 : 240}
            alt='CEV Logo'
            className={`${styles.cevLogo} ${styles.fadeIn}`}
          />
          <ContactSalesButton
            siteConfig={promasterData.siteConfig}
            openModal={handleContactClick}
            buttonText='Get A Free Quote'
            id='contact-button-promaster'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
