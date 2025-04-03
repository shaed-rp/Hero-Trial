export interface Section {
  id: string;
  name: string;
  link?: string | null;
  hideFromNav?: boolean;
  isVisible?: boolean;
}

export interface SectionWithVisibility extends Section {
  isVisible: boolean;
}

export interface SectionVisibility {
  [key: string]: boolean;
}

export interface SiteConfig {
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

export interface VehicleConfig {
  sections: SectionWithVisibility[];
  siteConfig: SiteConfig;
  sectionVisibility: SectionVisibility;
}
