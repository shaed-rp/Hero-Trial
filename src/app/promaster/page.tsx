'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import promasterData from '@/data/promasterData.json';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Technology from './Technology/Technology';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import { useCallback, useMemo, useState } from 'react';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Modal from '@components/Modal/Modal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Promaster() {
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
    router.push('/promaster/thankyou');
  }, [closeModal, router]);

  const sectionTitles = useMemo(() => {
    const titles: { [key: string]: string } = {};

    if (
      promasterData.sectionVisibility.overview &&
      promasterData.overview.specs.some(
        (spec) => spec.description || spec.title || spec.imageUrl
      )
    ) {
      titles.overview = promasterData.overview.navLinkText;
    }

    if (
      promasterData.sectionVisibility.capabilities &&
      promasterData.capabilities.specs.some(
        (spec) => spec.label || spec.value || spec.imageUrl || spec.otherValue
      )
    ) {
      titles.capabilities = promasterData.capabilities.navLinkText;
    }

    if (
      promasterData.sectionVisibility.charging &&
      promasterData.charging.chargingOptions.some(
        (option) => option.title || option.description || option.imageUrl
      )
    ) {
      titles.charging = promasterData.charging.navLinkText;
    }

    if (
      promasterData.sectionVisibility.technologies &&
      promasterData.technologies.technology.some(
        (tech) => tech.title || tech.description || tech.imageUrl
      )
    ) {
      titles.technologies = promasterData.technologies.navLinkText;
    }

    if (
      promasterData.sectionVisibility.design &&
      promasterData.design.images.some((image) => image.imageUrl)
    ) {
      titles.design = promasterData.design.navLinkText;
    }

    if (
      promasterData.sectionVisibility.business &&
      promasterData.business.businessPoints.some(
        (point) => point.title || point.description
      )
    ) {
      titles.business = promasterData.business.navLinkText;
    }

    if (
      promasterData.sectionVisibility.gallery &&
      promasterData.gallery.images.some((image) => image.url)
    ) {
      titles.gallery = promasterData.gallery.navLinkText;
    }

    if (
      promasterData.sectionVisibility.specs &&
      promasterData.specs.specDetails.some(
        (section) => section.title || section.data.some((item) => item)
      )
    ) {
      titles.specs = promasterData.specs.navLinkText;
    }

    titles['request-info'] = 'Get A Free Quote';
    return titles;
  }, []);

  return (
    <ThemeProvider brandColor={promasterData.siteConfig.brandColor}>
      <div className={styles.home}>
        <Navbar
          vehicleId='promaster'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />
        <div id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero
              heroPoints={promasterData.hero}
              siteConfig={promasterData.siteConfig}
              openModal={openModal}
            />
          </div>
        </div>
        {promasterData.sectionVisibility.overview &&
          promasterData.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          ) && (
            <div
              id='overview'
              className={`${styles.section} ${styles.overviewSection}`}
            >
              <div className={styles.sectionContent}>
                <Overview overview={promasterData.overview} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.capabilities &&
          promasterData.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          ) && (
            <div
              id='capabilities'
              className={`${styles.section} ${styles.capabilitySection}`}
            >
              <div className={styles.sectionContent}>
                <Capability capabilities={promasterData.capabilities} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.charging &&
          promasterData.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          ) && (
            <div
              id='charging'
              className={`${styles.section} ${styles.chargingSection}`}
            >
              <div className={styles.sectionContent}>
                <Charging chargingPoints={promasterData.charging} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.technologies &&
          promasterData.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          ) && (
            <div
              id='technologies'
              className={`${styles.section} ${styles.technologySection}`}
            >
              <div className={styles.sectionContent}>
                <Technology technologyPoints={promasterData.technologies} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.design &&
          promasterData.design.images.some((image) => image.imageUrl) && (
            <div
              id='design'
              className={`${styles.section} ${styles.designSection}`}
            >
              <div className={styles.sectionContent}>
                <Design designPoints={promasterData.design} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.business &&
          promasterData.business.businessPoints.some(
            (point) => point.title || point.description
          ) && (
            <div
              id='business'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={promasterData.business} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.gallery &&
          promasterData.gallery.images.some((image) => image.url) && (
            <div
              id='gallery'
              className={`${styles.section} ${styles.gallerySection}`}
            >
              <div className={styles.sectionContent}>
                <Gallery images={promasterData.gallery.images} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.specs &&
          promasterData.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          ) && (
            <div
              id='specs'
              className={`${styles.section} ${styles.specsSection}`}
            >
              <div className={styles.sectionContent}>
                <Specs specPoints={promasterData.specs.specDetails} />
              </div>
            </div>
          )}

        {promasterData.sectionVisibility.build &&
          promasterData.build.buildSections.some(
            (section) => section.vehicleImageUrl
          ) && (
            <div
              id='build'
              className={`${styles.section} ${styles.buildSection}`}
            >
              <div className={styles.sectionContent}>
                <Build buildPoints={promasterData.build.buildSections} />
              </div>
            </div>
          )}
        <PoweredByShaedFooter />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName='ProMaster'
          vehiclePath='promaster'
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={promasterData.siteConfig.title}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
