'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import ContactSalesButton from '@/app/components/Button/ContactButton';
import peterbilt520ev from '@data/peterbilt520ev.json';

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
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const { isDesktop } = useScreenSize();
  const point = heroPoints[0];

  useEffect(() => {
    setIsPageLoaded(true);

    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      }

      const video = videoRef.current;
      video.load();

      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const startFadeTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (!hasInteracted) {
        video.muted = false;
        video.play().catch((error) => {
          console.error('Error playing video:', error);
          video.muted = true;
          setIsAudioPlaying(false);
        });
        setIsAudioPlaying(true);
        setHasInteracted(true);
        startFadeTimer();
      } else {
        if (isAudioPlaying) {
          video.muted = true;
        } else {
          video.muted = false;
          video.play().catch((error) => {
            console.error('Error playing video:', error);
            video.muted = true;
          });
        }
        setIsAudioPlaying(!isAudioPlaying);
        setShowControls(true);
        startFadeTimer();
      }
    }
  };

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

  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center top',
    transition: 'opacity 0.5s ease-in-out',
  } as const;

  return (
    <section className={`${styles.hero} ${isPageLoaded ? styles.loaded : ''}`}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          <div
            className={styles.mediaWrapper}
            onClick={handleVideoClick}
            role='button'
            tabIndex={0}
          >
            <Image
              src={point.backgroundImageUrl}
              alt='Main Background Image'
              fill
              priority
              style={{
                ...mediaStyle,
                opacity: isVideoLoaded ? 0 : 1,
              }}
              className={styles.primaryBgImage}
            />
            {point.backgroundVideo && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload='auto'
                style={{
                  ...mediaStyle,
                  opacity: isVideoLoaded ? 1 : 0,
                }}
                className={styles.primaryBgVideo}
              >
                <source src={point.backgroundVideo} type='video/mp4' />
              </video>
            )}
            <div
              className={`${styles.videoControlsContainer} ${
                showControls ? styles.show : ''
              }`}
            >
              <div className={styles.videoControls}>
                <Image
                  src={
                    isAudioPlaying
                      ? '/icons/pauseBtn.svg'
                      : '/icons/playBtn.svg'
                  }
                  alt={isAudioPlaying ? 'Play Button' : 'Pause Button'}
                  width={50}
                  height={50}
                  className={styles.controlIcon}
                />
              </div>
            </div>
          </div>
          {!hasInteracted && (
            <div className={styles.audioPrompt}>
              <p>
                Experience the Peterbilt 520EV in action - click the video to
                hear the story <span className={styles.audioIcon}>🔊</span>
              </p>
            </div>
          )}
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
            siteConfig={peterbilt520ev.siteConfig}
            openModal={handleContactClick}
            buttonText='Get a Free Quote'
            id='contact-button-520-ev'
          />
          <div
            className={`${styles.vehicleImage} ${
              isPageLoaded ? styles.slideInFade : ''
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
      </div>
    </section>
  );
};

export default Hero;
