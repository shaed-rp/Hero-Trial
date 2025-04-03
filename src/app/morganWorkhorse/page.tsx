'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import morganWhData from '@data/morganWhData.json';
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
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function MorganWorkhorse() {
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
    router.push('/morganworkhorse/thankyou');
  }, [closeModal, router]);

  const sectionTitles = useMemo(() => {
    const titles: { [key: string]: string } = {};

    Object.entries(morganWhData.sectionVisibility).forEach(
      ([sectionId, isVisible]) => {
        if (!isVisible) return;

        switch (sectionId) {
          case 'overview':
            if (
              morganWhData.overview.specs.some(
                (spec) => spec.description || spec.title || spec.imageUrl
              )
            ) {
              titles.overview = morganWhData.overview.navLinkText;
            }
            break;

          case 'technologies':
            if (
              morganWhData.technologies.technology.some(
                (tech) => tech.title || tech.description || tech.imageUrl
              )
            ) {
              titles.technologies = morganWhData.technologies.navLinkText;
            }
            break;

          case 'business':
            if (
              morganWhData.business.businessPoints.some(
                (point) => point.title || point.description
              )
            ) {
              titles.business = morganWhData.business.navLinkText;
            }
            break;

          case 'capabilities':
            if (
              morganWhData.capabilities.specs.some(
                (spec) =>
                  spec.label || spec.value || spec.imageUrl || spec.otherValue
              )
            ) {
              titles.capabilities = morganWhData.capabilities.navLinkText;
            }
            break;

          case 'charging':
            if (
              morganWhData.charging.chargingOptions.some(
                (option) =>
                  option.title || option.description || option.imageUrl
              )
            ) {
              titles.charging = morganWhData.charging.navLinkText;
            }
            break;

          case 'design':
            if (morganWhData.design.images.some((image) => image.imageUrl)) {
              titles.design = morganWhData.design.navLinkText;
            }
            break;

          case 'gallery':
            if (morganWhData.gallery.images.some((image) => image.url)) {
              titles.gallery = morganWhData.gallery.navLinkText;
            }
            break;

          case 'specs':
            if (
              morganWhData.specs.specDetails.some(
                (section) => section.title || section.data.some((item) => item)
              )
            ) {
              titles.specs = morganWhData.specs.navLinkText;
            }
            break;
        }
      }
    );

    titles['request-info'] = 'Get A Free Quote';

    return titles;
  }, []);

  return (
    <ThemeProvider brandColor={morganWhData.siteConfig.brandColor}>
      <div className={styles.home}>
        <Navbar
          vehicleId='morganWh'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />
        <div id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero
              heroPoints={morganWhData.hero}
              siteConfig={morganWhData.siteConfig}
              openModal={openModal}
            />
          </div>
        </div>
        {morganWhData.sectionVisibility.overview &&
          morganWhData.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          ) && (
            <div
              id='overview'
              className={`${styles.section} ${styles.overviewSection}`}
            >
              <div className={styles.sectionContent}>
                <Overview overview={morganWhData.overview} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.charging &&
          morganWhData.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          ) && (
            <div
              id='charging'
              className={`${styles.section} ${styles.chargingSection}`}
            >
              <div className={styles.sectionContent}>
                <Charging chargingPoints={morganWhData.charging} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.technologies &&
          morganWhData.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          ) && (
            <div
              id='technologies'
              className={`${styles.section} ${styles.technologySection}`}
            >
              <div className={styles.sectionContent}>
                <Technology technologyPoints={morganWhData.technologies} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.business &&
          morganWhData.business.businessPoints.some(
            (point) => point.title || point.description
          ) && (
            <div
              id='business'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={morganWhData.business} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.capabilities &&
          morganWhData.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          ) && (
            <div
              id='capabilities'
              className={`${styles.section} ${styles.capabilitySection}`}
            >
              <div className={styles.sectionContent}>
                <Capability capabilities={morganWhData.capabilities} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.design &&
          morganWhData.design.images.some((image) => image.imageUrl) && (
            <div
              id='design'
              className={`${styles.section} ${styles.designSection}`}
            >
              <div className={styles.sectionContent}>
                <Design designPoints={morganWhData.design} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.gallery &&
          morganWhData.gallery.images.some((image) => image.url) && (
            <div
              id='gallery'
              className={`${styles.section} ${styles.gallerySection}`}
            >
              <div className={styles.sectionContent}>
                <Gallery images={morganWhData.gallery.images} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.specs &&
          morganWhData.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          ) && (
            <div
              id='specs'
              className={`${styles.section} ${styles.specsSection}`}
            >
              <div className={styles.sectionContent}>
                <Specs specPoints={morganWhData.specs.specDetails} />
              </div>
            </div>
          )}

        {morganWhData.sectionVisibility.build &&
          morganWhData.build.buildSections.some(
            (section) => section.vehicleImageUrl
          ) && (
            <div
              id='build'
              className={`${styles.section} ${styles.buildSection}`}
            >
              <div className={styles.sectionContent}>
                <Build buildPoints={morganWhData.build.buildSections} />
              </div>
            </div>
          )}
        <PoweredByShaedFooter />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName={'Morgan Workhorse'}
          vehiclePath={'morganworkhorse'}
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={morganWhData.siteConfig.title}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
