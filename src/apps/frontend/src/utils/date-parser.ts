import moment, { Moment } from 'moment-timezone';
import { TIME_ZONE } from '../constants';

/**
 *
 * @param date The date that needs to be parsed
 * @param hoursOffset Additional hours to add to the date
 * @returns A moment-timezone object representing the adjusted date and time.
 */
export const toMoment = (date: Date | string, hoursOffset?: number): Moment => {
  return moment(date).tz(TIME_ZONE).add(hoursOffset, 'hour');
};
