'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import streetrodData from '@data/streetrodData.json';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import { useCallback, useMemo, useState } from 'react';
import Modal from '@components/Modal/Modal';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import { useRouter } from 'next/navigation';

export default function Streetrod() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    closeModal();
    router.push('/streetrod/thankyou');
  }, [closeModal, router]);

  const sectionTitles = useMemo(() => {
    const titles: { [key: string]: string } = {};

    if (
      streetrodData.sectionVisibility.overview &&
      streetrodData.overview.specs.some(
        (spec) => spec.description || spec.title || spec.imageUrl
      )
    ) {
      titles.overview = streetrodData.overview.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.capabilities &&
      streetrodData.capabilities.specs.some(
        (spec) => spec.label || spec.value || spec.imageUrl || spec.otherValue
      )
    ) {
      titles.capabilities = streetrodData.capabilities.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.charging &&
      streetrodData.charging.chargingOptions.some(
        (option) => option.title || option.description || option.imageUrl
      )
    ) {
      titles.charging = streetrodData.charging.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.technologies &&
      streetrodData.technologies.technology.some(
        (tech) => tech.title || tech.description || tech.imageUrl
      )
    ) {
      titles.technologies = streetrodData.technologies.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.design &&
      streetrodData.design.images.some((image) => image.imageUrl)
    ) {
      titles.design = streetrodData.design.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.business &&
      streetrodData.business.businessPoints.some(
        (point) => point.title || point.description
      )
    ) {
      titles.business = streetrodData.business.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.gallery &&
      streetrodData.gallery.images.some((image) => image.url)
    ) {
      titles.gallery = streetrodData.gallery.navLinkText;
    }

    if (
      streetrodData.sectionVisibility.specs &&
      streetrodData.specs.specDetails.some(
        (section) => section.title || section.data.some((item) => item)
      )
    ) {
      titles.specs = streetrodData.specs.navLinkText;
    }

    titles['request-info'] = 'Get A Free Quote';
    return titles;
  }, []);

  return (
    <ThemeProvider brandColor={streetrodData.siteConfig.brandColor}>
      <div className={styles.home}>
        <Navbar
          vehicleId='streetrod'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />
        <div id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero
              heroPoints={streetrodData.hero}
              siteConfig={streetrodData.siteConfig}
              openModal={openModal}
            />
          </div>
        </div>
        {streetrodData.sectionVisibility.overview &&
          streetrodData.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          ) && (
            <div
              id='overview'
              className={`${styles.section} ${styles.overviewSection}`}
            >
              <div className={styles.sectionContent}>
                <Overview overview={streetrodData.overview} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.capabilities &&
          streetrodData.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          ) && (
            <div
              id='capabilities'
              className={`${styles.section} ${styles.capabilitySection}`}
            >
              <div className={styles.sectionContent}>
                <Capability capabilities={streetrodData.capabilities} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.charging &&
          streetrodData.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          ) && (
            <div
              id='charging'
              className={`${styles.section} ${styles.chargingSection}`}
            >
              <div className={styles.sectionContent}>
                <Charging chargingPoints={streetrodData.charging} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.technologies &&
          streetrodData.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          ) && (
            <div
              id='technologies'
              className={`${styles.section} ${styles.technologySection}`}
            >
              <div className={styles.sectionContent}>
                <Technology technologyPoints={streetrodData.technologies} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.design &&
          streetrodData.design.images.some((image) => image.imageUrl) && (
            <div
              id='design'
              className={`${styles.section} ${styles.designSection}`}
            >
              <div className={styles.sectionContent}>
                <Design designPoints={streetrodData.design} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.business &&
          streetrodData.business.businessPoints.some(
            (point) => point.title || point.description
          ) && (
            <div
              id='business'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={streetrodData.business} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.gallery &&
          streetrodData.gallery.images.some((image) => image.url) && (
            <div
              id='gallery'
              className={`${styles.section} ${styles.gallerySection}`}
            >
              <div className={styles.sectionContent}>
                <Gallery images={streetrodData.gallery.images} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.specs &&
          streetrodData.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          ) && (
            <div
              id='specs'
              className={`${styles.section} ${styles.specsSection}`}
            >
              <div className={styles.sectionContent}>
                <Specs specPoints={streetrodData.specs.specDetails} />
              </div>
            </div>
          )}

        {streetrodData.sectionVisibility.build &&
          streetrodData.build.buildSections.some(
            (section) => section.vehicleImageUrl
          ) && (
            <div
              id='build'
              className={`${styles.section} ${styles.buildSection}`}
            >
              <div className={styles.sectionContent}>
                <Build buildPoints={streetrodData.build.buildSections} />
              </div>
            </div>
          )}
        <PoweredByShaedFooter />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName='Streetrod'
          vehiclePath='streetrod'
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={streetrodData.siteConfig.title}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
