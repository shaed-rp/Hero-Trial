'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import { useScreenSize } from '@/hooks/useScreenSize';

interface Vehicle {
  name: string;
  logoImageUrl: string | string[];
  imageUrl: string;
  route: string;
  imageScale?: number;
  mobileImageScale?: number;
  imagePosition?: string;
  mobileImagePosition?: string;
}

const vehicles: Vehicle[] = [
  {
    name: 'Peterbilt 520ev',
    logoImageUrl: '/assets/peterbilt520ev/peterbiltLogo.png',
    imageUrl: '/assets/peterbilt520ev/520evNoBG.png',
    route: '/520ev',
    imageScale: 1.4,
    mobileImageScale: 1.2,
    imagePosition: 'center 75%',
    mobileImagePosition: 'center 60%',
  },
  {
    name: 'Morgan Workhorse',
    logoImageUrl: [
      '/assets/morganWorkhorse/MorganLogo.png',
      '/assets/morganWorkhorse/WHLogo.png',
    ],
    imageUrl: '/assets/morganWorkhorse/NoBGSideEntryDoorClosedRemovedBG.png',
    route: '/morganworkhorse',
  },
  {
    name: 'Mullen One',
    logoImageUrl: '/assets/mullenOne/mullenLogo.svg',
    imageUrl: '/assets/mullenOne/mullenOneNobackground.webp',
    route: '/mullenone',
  },
  {
    name: 'ProMaster',
    logoImageUrl: '/assets/promaster/promasterEVLogo.webp',
    imageUrl: '/assets/promaster/promasterEV.webp',
    route: '/promaster',
  },
  {
    name: 'Streetrod',
    logoImageUrl: '/assets/streetrod/streetrodLogo.png',
    imageUrl: '/assets/streetrod/shaedCar.png',
    route: '/streetrod',
  },
];

const CommercialEVShowcase = () => {
  const { isDesktop } = useScreenSize();

  return (
    <>
      <div className={styles.showcaseContainer}>
        <div className={styles.headerSection}>
          <div className={styles.logo}>
            <a
              href='https://commercialevs.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/icons/cevTextLogoBlk.png'
                alt='Commercial EV Showcase'
                width={isDesktop ? 400 : 300}
                height={isDesktop ? 64 : 48}
                priority
              />
            </a>
          </div>
          <Image
            src={'/icons/showcaseText.png'}
            alt='Showcase Text Logo'
            height={isDesktop ? 120 : 80}
            width={isDesktop ? 500 : 300}
            style={{ marginTop: '2rem' }}
          />
        </div>

        <div
          className={`${styles.vehicleGrid} ${
            !isDesktop ? styles.mobileGrid : ''
          }`}
        >
          {vehicles.map((vehicle, index) => (
            <a href={vehicle.route} key={index} className={styles.cardLink}>
              <div
                className={styles.vehicleCard}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className={styles.logoContainer}>
                  {Array.isArray(vehicle.logoImageUrl) ? (
                    <div className={styles.multiLogoWrapper}>
                      {vehicle.logoImageUrl.map((logo, logoIndex) => (
                        <div key={logoIndex} className={styles.logoWrapper}>
                          <Image
                            src={logo}
                            alt={`${vehicle.name} logo ${logoIndex + 1}`}
                            fill
                            style={{
                              objectFit: 'contain',
                            }}
                            priority
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.logoWrapper}>
                      <Image
                        src={vehicle.logoImageUrl}
                        alt={`${vehicle.name} logo`}
                        fill
                        style={{
                          objectFit: 'contain',
                        }}
                        priority
                      />
                    </div>
                  )}
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition:
                        !isDesktop && vehicle.mobileImagePosition
                          ? vehicle.mobileImagePosition
                          : vehicle.imagePosition || 'center bottom',
                      transform: `scale(${
                        !isDesktop && vehicle.mobileImageScale
                          ? vehicle.mobileImageScale
                          : vehicle.imageScale || 1
                      })`,
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    priority
                  />
                </div>
                <h3 className={styles.vehicleName}>{vehicle.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommercialEVShowcase;
