import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.scss';

interface GalleryImage {
  url: string;
  urlHover?: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

const Gallery = ({ images, title = 'Vehicle Gallery' }: GalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getHoverUrl = (image: GalleryImage) => {
    return image.urlHover || image.url;
  };

  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.staggeredGrid}>
        <div className={styles.sideColumn}>
          <div
            className={`${styles.imageWrapper} ${styles.fullHeight}`}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={hoveredIndex === 0 ? getHoverUrl(images[0]) : images[0].url}
              alt={images[0].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.middleSection}>
          <div
            className={`${styles.imageWrapper} ${styles.halfHeight}`}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={hoveredIndex === 1 ? getHoverUrl(images[1]) : images[1].url}
              alt={images[1].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            className={`${styles.imageWrapper} ${styles.halfHeight}`}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={hoveredIndex === 2 ? getHoverUrl(images[2]) : images[2].url}
              alt={images[2].alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.sideColumn}>
          <div
            className={`${styles.imageWrapper} ${styles.fullHeight}`}
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={hoveredIndex === 3 ? getHoverUrl(images[3]) : images[3].url}
              alt={images[3].alt}
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
