export interface Section {
  name: string;
  id: string;
  link?: string | null;
  hideFromNav?: boolean;
}

export const sections: Section[] = [
  { name: 'Overview', id: 'overview' },
  { name: 'Capability', id: 'capabilities' },
  { name: 'Charging', id: 'charging' },
  { name: 'Technology', id: 'technologies' },
  { name: 'Design', id: 'design' },
  { name: 'Business', id: 'business' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Specs', id: 'specs' },
  { name: 'Build', id: 'build', hideFromNav: true },
  {
    name: 'Request Info',
    id: 'request-info',
    link: null,
  },
];

export const hasSectionContent = (section: unknown): boolean => {
  if (!section) return false;

  if (Array.isArray(section)) {
    return section.length > 0;
  }

  if (typeof section === 'object' && section !== null) {
    return Object.values(section).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== '' &&
        (typeof value !== 'object' || hasSectionContent(value))
    );
  }

  return false;
};
