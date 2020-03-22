import { isSunday } from './navigationButton.js';
export function getMonday(date) {
  var getDate = date.getDate();
  var getDay = date.getDay();
  getDay = isSunday(getDay);
  var getMonday = date.setDate(getDate - getDay + 1);
  return new Date(getMonday);
}