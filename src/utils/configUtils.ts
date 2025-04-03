import {
  Section,
  SectionWithVisibility,
  VehicleConfig,
} from '@/types/sections';

interface SiteConfig {
  title: string;
  description: string;
  url: string;
  faviconUrl: string;
  ogImage: string;
  logoUrl: string;
  logoUrlTwo?: string;
  brandName: string;
  link: string;
  brandColor: string;
}

interface VehicleConfigInput {
  sectionVisibility: { [key: string]: boolean };
  siteConfig: SiteConfig;
  [key: string]: string | number | boolean | object | undefined;
}

export const createVehicleConfig = (
  config: VehicleConfigInput,
  sections: Section[]
): VehicleConfig => {
  const sectionsMap = sections.reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {} as { [key: string]: Section });

  const orderedSections = Object.entries(config.sectionVisibility)
    .map(([id, isVisible]): SectionWithVisibility | null => {
      const baseSection = sectionsMap[id];

      if (!baseSection || !isVisible) {
        return null;
      }

      return {
        ...baseSection,
        name:
          (config[id] as { navLinkText?: string })?.navLinkText ||
          baseSection.name,
        isVisible: true,
        hideFromNav: baseSection.hideFromNav,
      };
    })
    .filter((section): section is SectionWithVisibility => section !== null);

  const requestInfoSection = sections.find((s) => s.id === 'request-info');
  if (requestInfoSection) {
    orderedSections.push({
      ...requestInfoSection,
      isVisible: true,
    });
  }

  return {
    sections: orderedSections,
    siteConfig: config.siteConfig,
    sectionVisibility: config.sectionVisibility,
  };
};
