import { Section } from '@/types/sections';

const SECTION_ORDER = [
  'overview',
  'technologies',
  'capabilities',
  'charging',
  'design',
  'business',
  'businessTwo',
  'gallery',
  'specs',
  'build',
  'request-info',
] as const;

const SECTIONS_MAP: { [key: string]: Omit<Section, 'id'> } = {
  overview: { name: 'Overview', isVisible: true },
  capabilities: { name: 'Capabilities', isVisible: true },
  charging: { name: 'Charging', isVisible: true },
  technologies: { name: 'Technologies', isVisible: false },
  design: { name: 'Design', isVisible: false },
  business: { name: 'Business', isVisible: true },
  businessTwo: { name: 'BusinessTwo', isVisible: true },
  gallery: { name: 'Gallery', isVisible: false },
  specs: { name: 'Specs', isVisible: false },
  build: { name: 'Build', isVisible: false, hideFromNav: true },
  'request-info': {
    name: 'Request Info',
    isVisible: true,
    link: null,
  },
};

export const sections: Section[] = SECTION_ORDER.map((id) => ({
  id,
  ...SECTIONS_MAP[id],
}));
