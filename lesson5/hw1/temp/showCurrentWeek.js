import { dayToday, addClassCurentDate } from './navigationButton.js';
import { renderDayCell } from './renderDayCell.js';
import { renderDateForWeek } from './renderDate.js';
import { getCurrentMonth } from './getCurrentMonth.js';
import { createEvent } from './createEvent.js';
import { startLine } from './countLineTime.js';
var btnCurrentWeek = document.querySelector('.header__today');
export function showCurrentWeek() {
  var todayYear = dayToday.getFullYear();
  var todayMonth = dayToday.getMonth();
  var todayDate = dayToday.getDate();
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();
  var currentDate = new Date().getDate();
  if (new Date(todayYear, todayMonth, todayDate) === new Date(currentYear, currentMonth, currentDate)) return;
  renderDayCell(new Date());
  renderDateForWeek(new Date());
  getCurrentMonth();
  addClassCurentDate();
  createEvent();
  startLine();
  dayToday.setFullYear(currentYear, currentMonth, currentDate);
}
btnCurrentWeek.addEventListener('click', showCurrentWeek);