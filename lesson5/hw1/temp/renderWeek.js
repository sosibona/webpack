import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import { generateNumber } from './generateNumber.js';
var dateOfMonthElem = document.querySelector('.date-of-month');
export var renderWeek = function renderWeek() {
  var numberOfWeek = generateNumber(1, 7).map(function (dayOfWeek) {
    return "<span class=\"curent-date-of-week\"></span>";
  }).join('');
  dateOfMonthElem.innerHTML = numberOfWeek;
};