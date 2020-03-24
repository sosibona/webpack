// eslint-disable-next-line import/no-cycle
import { isSunday } from './navigationButton';

export function getMonday(date) {
  const getDate = date.getDate();
  let getDay = date.getDay();

  getDay = isSunday(getDay);
  // eslint-disable-next-line no-shadow
  const getMonday = date.setDate(getDate - getDay + 1);

  return new Date(getMonday);
}
