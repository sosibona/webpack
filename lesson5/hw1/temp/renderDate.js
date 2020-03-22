import "core-js/modules/es.array.for-each";
import "core-js/modules/web.dom-collections.for-each";
import { getMonday } from './getMonday.js';
export function renderDateForWeek(date) {
  var dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');
  var startWeek = getMonday(date);
  startWeek.setDate(new Date(startWeek).getDate() - 1);
  dateOfMondayElem.forEach(function (elem) {
    return elem.innerHTML = startWeek.getDate(startWeek.setDate(startWeek.getDate() + 1));
  });
}