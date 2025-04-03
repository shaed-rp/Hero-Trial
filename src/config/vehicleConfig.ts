import { VehicleConfig } from '@/types/sections';
import { createVehicleConfig } from '@/utils/configUtils';

import mullenOneData from '@/data/mullenOneData.json';
import promasterData from '@/data/promasterData.json';
import streetrodData from '@/data/streetrodData.json';
import morganWhData from '@/data/morganWhData.json';
import peterbilt520evData from '@/data/peterbilt520ev.json';

import { sections as mullenOneSections } from '@/app/mullenone/constants/sections';
import { sections as promasterSections } from '@/app/promaster/constants/sections';
import { sections as streetrodSections } from '@/app/streetrod/constants/sections';
import { sections as morganWhSections } from '@/app/morganworkhorse/constants/sections';
import { sections as peterbilt520evSections } from '@/app/520ev/constants/sections';

export const vehicleConfigs: { [key: string]: VehicleConfig } = {
  mullenOne: createVehicleConfig(mullenOneData, mullenOneSections),
  promaster: createVehicleConfig(promasterData, promasterSections),
  streetrod: createVehicleConfig(streetrodData, streetrodSections),
  morganWh: createVehicleConfig(morganWhData, morganWhSections),
  peterbilt520ev: createVehicleConfig(
    peterbilt520evData,
    peterbilt520evSections
  ),
};
