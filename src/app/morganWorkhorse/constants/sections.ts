import { Section } from '@/types/sections';

export const sections: Section[] = [
  { name: 'Overview', id: 'overview' },
  { name: 'Technologies', id: 'technologies' },
  { name: 'Business', id: 'business' },
  { name: 'Capabilities', id: 'capabilities' },
  { name: 'Charging', id: 'charging' },
  { name: 'Design', id: 'design' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Specs', id: 'specs' },
  { name: 'Build', id: 'build', hideFromNav: true },
  {
    name: 'Request Info',
    id: 'request-info',
    link: null,
  },
];
