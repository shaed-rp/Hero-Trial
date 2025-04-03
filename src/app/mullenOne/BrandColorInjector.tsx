'use client';

import { useEffect } from 'react';
import vehicleData from './constants/vehicleData.json';

export default function BrandColorInjector() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--brand-color',
      vehicleData.siteConfig.brandColor
    );
  }, []);

  return null;
}
