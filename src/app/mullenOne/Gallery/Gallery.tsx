import React from 'react';
import Image from 'next/image';
import styles from './Gallery.module.scss';

interface GalleryImage {
  url: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

const Gallery = ({ images, title = 'Vehicle Gallery' }: GalleryProps) => {
  const displayImages = images.slice(0, 9);

  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.staggeredGrid}>
        <div className={styles.sideColumn}>
          <div className={`${styles.imageWrapper} ${styles.halfTall}`}>
            <Image
              src={displayImages[0].url}
              alt={displayImages[0].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={`${styles.imageWrapper} ${styles.halfTall}`}>
            <Image
              src={displayImages[1].url}
              alt={displayImages[1].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.middleSection}>
          <div className={styles.topRow}>
            <div className={`${styles.imageWrapper} ${styles.mediumWide}`}>
              <Image
                src={displayImages[2].url}
                alt={displayImages[2].alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={`${styles.imageWrapper} ${styles.small}`}>
              <Image
                src={displayImages[3].url}
                alt={displayImages[3].alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={`${styles.imageWrapper} ${styles.fullWidth}`}>
            <Image
              src={displayImages[4].url}
              alt={displayImages[4].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.bottomRow}>
            <div className={`${styles.imageWrapper} ${styles.mediumNarrow}`}>
              <Image
                src={displayImages[5].url}
                alt={displayImages[5].alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={`${styles.imageWrapper} ${styles.medium}`}>
              <Image
                src={displayImages[6].url}
                alt={displayImages[6].alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className={styles.sideColumn}>
          <div className={`${styles.imageWrapper} ${styles.halfTall}`}>
            <Image
              src={displayImages[7]?.url}
              alt={displayImages[7]?.alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={`${styles.imageWrapper} ${styles.halfTall}`}>
            <Image
              src={displayImages[8]?.url}
              alt={displayImages[8]?.alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
