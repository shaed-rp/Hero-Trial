'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import mullenOneData from '@data/mullenOneData.json';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@components/Modal/Modal';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Technology from './Technology/Technology';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import Build from './Build/Build';
import VideoContainer from './Video/Video';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    _linkedin_data_partner_ids: string[];
    lintrk_q: Array<[string, { conversion_id: number }]>;
  }
}

export default function MullenOne() {
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
    router.push('/mullenone/thankyou');
  }, [closeModal, router]);

  const sectionTitles = useMemo(() => {
    const titles: { [key: string]: string } = {};

    if (
      mullenOneData.sectionVisibility.overview &&
      mullenOneData.overview.specs.some(
        (spec) => spec.description || spec.title || spec.imageUrl
      )
    ) {
      titles.overview = mullenOneData.overview.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.capabilities &&
      mullenOneData.capabilities.specs.some(
        (spec) => spec.label || spec.value || spec.imageUrl || spec.otherValue
      )
    ) {
      titles.capabilities = mullenOneData.capabilities.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.charging &&
      mullenOneData.charging.chargingOptions.some(
        (option) => option.title || option.description || option.imageUrl
      )
    ) {
      titles.charging = mullenOneData.charging.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.technologies &&
      mullenOneData.technologies.technology.some(
        (tech) => tech.title || tech.description || tech.imageUrl
      )
    ) {
      titles.technologies = mullenOneData.technologies.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.design &&
      mullenOneData.design.images.some((image) => image.imageUrl)
    ) {
      titles.design = mullenOneData.design.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.business &&
      mullenOneData.business.businessPoints.some(
        (point) => point.title || point.description
      )
    ) {
      titles.business = mullenOneData.business.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.gallery &&
      mullenOneData.gallery.images.some((image) => image.url)
    ) {
      titles.gallery = mullenOneData.gallery.navLinkText;
    }

    if (
      mullenOneData.sectionVisibility.specs &&
      mullenOneData.specs.specDetails.some(
        (section) => section.title || section.data.some((item) => item)
      )
    ) {
      titles.specs = mullenOneData.specs.navLinkText;
    }

    titles['request-info'] = 'Get A Free Quote';
    return titles;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: 18238308 });
    }
  }, []);

  return (
    <ThemeProvider brandColor={mullenOneData.siteConfig.brandColor}>
      <div className={styles.home}>
        <Navbar
          vehicleId='mullenOne'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />
        <div id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero heroPoints={mullenOneData.hero} openModal={openModal} />
          </div>
        </div>
        {mullenOneData.sectionVisibility.overview &&
          mullenOneData.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          ) && (
            <div
              id='overview'
              className={`${styles.section} ${styles.overviewSection}`}
            >
              <div className={styles.sectionContent}>
                <Overview overview={mullenOneData.overview} />
              </div>
            </div>
          )}

        <div className={`${styles.sectionContent} ${styles.videoSection}`}>
          <div className={styles.sectionContent}>
            <VideoContainer src={mullenOneData.video} />
          </div>
        </div>

        {mullenOneData.sectionVisibility.capabilities &&
          mullenOneData.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          ) && (
            <div
              id='capabilities'
              className={`${styles.section} ${styles.capabilitySection}`}
            >
              <div className={styles.sectionContent}>
                <Capability capabilities={mullenOneData.capabilities} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.charging &&
          mullenOneData.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          ) && (
            <div
              id='charging'
              className={`${styles.section} ${styles.chargingSection}`}
            >
              <div className={styles.sectionContent}>
                <Charging chargingPoints={mullenOneData.charging} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.technologies &&
          mullenOneData.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          ) && (
            <div
              id='technologies'
              className={`${styles.section} ${styles.technologySection}`}
            >
              <div className={styles.sectionContent}>
                <Technology technologyPoints={mullenOneData.technologies} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.design &&
          mullenOneData.design.images.some((image) => image.imageUrl) && (
            <div
              id='design'
              className={`${styles.section} ${styles.designSection}`}
            >
              <div className={styles.sectionContent}>
                <Design designPoints={mullenOneData.design} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.business &&
          mullenOneData.business.businessPoints.some(
            (point) => point.title || point.description
          ) && (
            <div
              id='business'
              className={`${styles.section} ${styles.businessSection}`}
            >
              <div className={styles.sectionContent}>
                <Business businessPoints={mullenOneData.business} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.gallery &&
          mullenOneData.gallery.images.some((image) => image.url) && (
            <div
              id='gallery'
              className={`${styles.section} ${styles.gallerySection}`}
            >
              <div className={styles.sectionContent}>
                <Gallery images={mullenOneData.gallery.images} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.specs &&
          mullenOneData.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          ) && (
            <div
              id='specs'
              className={`${styles.section} ${styles.specsSection}`}
            >
              <div className={styles.sectionContent}>
                <Specs specPoints={mullenOneData.specs.specDetails} />
              </div>
            </div>
          )}

        {mullenOneData.sectionVisibility.build &&
          mullenOneData.build.buildSections.some(
            (section) => section.vehicleImageUrl
          ) && (
            <div
              id='build'
              className={`${styles.section} ${styles.buildSection}`}
            >
              <div className={styles.sectionContent}>
                <Build buildPoints={mullenOneData.build.buildSections} />
              </div>
            </div>
          )}
        <PoweredByShaedFooter />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName='Mullen One'
          vehiclePath='mullenone'
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={mullenOneData.siteConfig.title}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
