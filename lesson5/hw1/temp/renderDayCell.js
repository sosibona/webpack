import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import { getWeek } from './getWeek.js';
import { generateNumber } from './generateNumber.js';

var getCellHoursForDay = function getCellHoursForDay() {
  return generateNumber(1, 24).map(function (hoursDay) {
    return "<div class=\"row-hour\" data-hour=\"".concat(hoursDay, "\"></div>");
  }).join('');
};

export var renderDayCell = function renderDayCell(date) {
  var currentWeekElem = document.querySelector('.current-week');
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();
  var currentDate = new Date().getDate();
  var today = new Date(currentYear, currentMonth, currentDate).getTime();
  var currentWeek = getWeek(date);
  var CellHourForDay = getCellHoursForDay();
  var dayOfWeek = generateNumber(0, 6).map(function (day) {
    if (currentWeek[day] === today) {
      return "<div class=\"day-by-hours\" data-date-of-day=\"".concat(currentWeek[day], "\">\n      ").concat(CellHourForDay, "\n      <span class=\"line-now\"><span class=\"line-now__time\"></span></span>      \n      </div>");
    }

    return "<div class=\"day-by-hours\" data-date-of-day=\"".concat(currentWeek[day], "\">\n      ").concat(CellHourForDay, "\n      </div>");
  }).join('');
  currentWeekElem.innerHTML = dayOfWeek;
};