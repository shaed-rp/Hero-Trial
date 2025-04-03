'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import peterbilt520ev from '@data/peterbilt520ev.json';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import Modal from '@components/Modal/Modal';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Peterbilt520ev() {
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
    router.push('/520ev/thankyou');
  }, [closeModal, router]);

  const orderedSections = useMemo(() => {
    return Object.entries(peterbilt520ev.sectionVisibility)
      .filter(([, isVisible]) => isVisible)
      .map(([sectionId]) => sectionId);
  }, []);

  const renderSection = useCallback(
    (sectionId: string) => {
      switch (sectionId) {
        case 'overview':
          return peterbilt520ev.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          ) ? (
            <div
              id='overview'
              className={`${styles.section} ${styles.overviewSection}`}
            >
              <div className={styles.sectionContent}>
                <Overview overview={peterbilt520ev.overview} />
              </div>
            </div>
          ) : null;

        case 'capabilities':
          return peterbilt520ev.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          ) ? (
            <div
              id='capabilities'
              className={`${styles.section} ${styles.capabilitySection}`}
            >
              <div className={styles.sectionContent}>
                <Capability capabilities={peterbilt520ev.capabilities} />
              </div>
            </div>
          ) : null;

        case 'charging':
          return peterbilt520ev.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          ) ? (
            <div
              id='charging'
              className={`${styles.section} ${styles.chargingSection}`}
            >
              <div className={styles.sectionContent}>
                <Charging chargingPoints={peterbilt520ev.charging} />
              </div>
            </div>
          ) : null;

        case 'technologies':
          return peterbilt520ev.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          ) ? (
            <div
              id='technologies'
              className={`${styles.section} ${styles.technologySection}`}
            >
              <div className={styles.sectionContent}>
                <Technology technologyPoints={peterbilt520ev.technologies} />
              </div>
            </div>
          ) : null;

        case 'design':
          return peterbilt520ev.design.images.some(
            (image) => image.imageUrl
          ) ? (
            <div
              id='design'
              className={`${styles.section} ${styles.designSection}`}
            >
              <div className={styles.sectionContent}>
                <Design designPoints={peterbilt520ev.design} />
              </div>
            </div>
          ) : null;

        case 'business':
          return peterbilt520ev.business.businessPoints.some(
            (point) => point.title || point.description
          ) ? (
            <div
              id='business'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={peterbilt520ev.business} />
              </div>
            </div>
          ) : null;

        case 'businessTwo':
          return peterbilt520ev.businessTwo.businessPoints.some(
            (point) => point.title || point.description
          ) ? (
            <div
              id='businessTwo'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={peterbilt520ev.businessTwo} />
              </div>
            </div>
          ) : null;

        case 'gallery':
          return peterbilt520ev.gallery.images.some((image) => image.url) ? (
            <div
              id='gallery'
              className={`${styles.section} ${styles.gallerySection}`}
            >
              <div className={styles.sectionContent}>
                <Gallery images={peterbilt520ev.gallery.images} />
              </div>
            </div>
          ) : null;

        case 'specs':
          return peterbilt520ev.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          ) ? (
            <div
              id='specs'
              className={`${styles.section} ${styles.specsSection}`}
            >
              <div className={styles.sectionContent}>
                <Specs
                  specPoints={peterbilt520ev.specs.specDetails}
                  openModal={openModal}
                />
              </div>
            </div>
          ) : null;

        case 'build':
          return peterbilt520ev.build.buildSections.some(
            (section) => section.vehicleImageUrl
          ) ? (
            <div
              id='build'
              className={`${styles.section} ${styles.buildSection}`}
            >
              <div className={styles.sectionContent}>
                <Build buildPoints={peterbilt520ev.build.buildSections} />
              </div>
            </div>
          ) : null;

        default:
          return null;
      }
    },
    [openModal]
  );

  const sectionTitles = useMemo(() => {
    const titles: { [key: string]: string } = {};

    Object.entries(peterbilt520ev.sectionVisibility).forEach(
      ([sectionId, isVisible]) => {
        if (!isVisible) return;

        switch (sectionId) {
          case 'overview':
            if (
              peterbilt520ev.overview.specs.some(
                (spec) => spec.description || spec.title || spec.imageUrl
              )
            ) {
              titles.overview = peterbilt520ev.overview.navLinkText;
            }
            break;

          case 'technologies':
            if (
              peterbilt520ev.technologies.technology.some(
                (tech) => tech.title || tech.description || tech.imageUrl
              )
            ) {
              titles.technologies = peterbilt520ev.technologies.navLinkText;
            }
            break;

          case 'business':
            if (
              peterbilt520ev.business.businessPoints.some(
                (point) => point.title || point.description
              )
            ) {
              titles.business = peterbilt520ev.business.navLinkText;
            }
            break;

          case 'capabilities':
            if (
              peterbilt520ev.capabilities.specs.some(
                (spec) =>
                  spec.label || spec.value || spec.imageUrl || spec.otherValue
              )
            ) {
              titles.capabilities = peterbilt520ev.capabilities.navLinkText;
            }
            break;

          case 'charging':
            if (
              peterbilt520ev.charging.chargingOptions.some(
                (option) =>
                  option.title || option.description || option.imageUrl
              )
            ) {
              titles.charging = peterbilt520ev.charging.navLinkText;
            }
            break;

          case 'design':
            if (peterbilt520ev.design.images.some((image) => image.imageUrl)) {
              titles.design = peterbilt520ev.design.navLinkText;
            }
            break;

          case 'gallery':
            if (peterbilt520ev.gallery.images.some((image) => image.url)) {
              titles.gallery = peterbilt520ev.gallery.navLinkText;
            }
            break;

          case 'specs':
            if (
              peterbilt520ev.specs.specDetails.some(
                (section) => section.title || section.data.some((item) => item)
              )
            ) {
              titles.specs = peterbilt520ev.specs.navLinkText;
            }
            break;
        }
      }
    );

    titles['request-info'] = 'Get A Free Quote';
    return titles;
  }, []);

  return (
    <ThemeProvider brandColor={peterbilt520ev.siteConfig.brandColor}>
      <div className={styles.home}>
        <Navbar
          vehicleId='peterbilt520ev'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />

        <div id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero
              heroPoints={peterbilt520ev.hero}
              siteConfig={peterbilt520ev.siteConfig}
              openModal={openModal}
            />
          </div>
        </div>

        {orderedSections.map((sectionId) => {
          const section = renderSection(sectionId);
          return section ? (
            <React.Fragment key={sectionId}>{section}</React.Fragment>
          ) : null;
        })}

        <PoweredByShaedFooter />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName={'Peterbilt 520EV'}
          vehiclePath='520ev'
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={peterbilt520ev.siteConfig.title}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
