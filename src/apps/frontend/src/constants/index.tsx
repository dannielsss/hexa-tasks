import { MenuElements } from '../types/SelectMenu';
import moment from 'moment-timezone';

export const API_URL = import.meta.env.VITE_API_URL;

export const PRIORITIES: MenuElements[] = [
  {
    name: 'Low',
    color: 'green',
  },
  {
    name: 'Medium',
    color: 'orange',
  },
  {
    name: 'High',
    color: 'red',
  },
];

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
};

export const TODAY_MOMENT = moment().tz(TIME_ZONE);
export const TODAY = TODAY_MOMENT.format(DATE_FORMATS.ISO);
export const TOMORROW = TODAY_MOMENT.clone()
  .add(1, 'day')
  .format(DATE_FORMATS.ISO);
