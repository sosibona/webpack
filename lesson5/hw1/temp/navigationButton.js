import { getMonday } from './getMonday.js';
import { renderDateForWeek } from './renderDate.js';
import { renderDayCell } from './renderDayCell.js';
import { getWeek } from './getWeek.js';
import { getCurrentMonth } from './getCurrentMonth.js';
import { createEvent } from './createEvent.js';
import { startLine, timerId } from './countLineTime.js';
var daysOfWeek = document.querySelectorAll('.navigation__days');
export function addClassCurentDate() {
  var dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');
  var curentDayOfWeek = new Date().getDay();
  curentDayOfWeek = isSunday(curentDayOfWeek);
  dateOfMondayElem[curentDayOfWeek - 1].classList.add('date-today');
  daysOfWeek[curentDayOfWeek - 1].classList.add('day-today');
}

function removeClassCurentDate() {
  var dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');
  var curentDayOfWeek = new Date().getDay();
  curentDayOfWeek = isSunday(curentDayOfWeek);
  dateOfMondayElem[curentDayOfWeek - 1].classList.remove('date-today');
  daysOfWeek[curentDayOfWeek - 1].classList.remove('day-today');
}

var switchRigth = document.querySelector('.angle-rigth');
var switchRigthSpan = switchRigth.parentNode;
var switchLeft = document.querySelector('.angle-left');
var switchLeftSpan = switchLeft.parentNode;
export var dayToday = new Date();
var daysInWeek = 7;

function toNextWeek() {
  var nextWeekMonday = getMonday(new Date(dayToday.setDate(dayToday.getDate() + daysInWeek)));
  renderDateForWeek(nextWeekMonday);
  renderDayCell(nextWeekMonday);
  var week = getWeek(nextWeekMonday);
  checkCurentWeek(week);
  getCurrentMonth();
  createEvent();
}

function toPreviosWeek() {
  var PreviosWeekMonday = getMonday(new Date(dayToday.setDate(dayToday.getDate() - daysInWeek)));
  renderDateForWeek(PreviosWeekMonday);
  renderDayCell(PreviosWeekMonday);
  var week = getWeek(PreviosWeekMonday);
  getCurrentMonth();
  createEvent();
  checkCurentWeek(week);
}

switchRigthSpan.addEventListener('click', toNextWeek);
switchLeftSpan.addEventListener('click', toPreviosWeek);

function checkCurentWeek(week) {
  var curentDate = new Date();

  if (week[0] < curentDate.getTime() && week[week.length - 1] > curentDate.getTime()) {
    addClassCurentDate();
    startLine();
  } else {
    removeClassCurentDate();
    clearInterval(timerId);
  }
}

export function isSunday(numberOfWeek) {
  if (numberOfWeek === 0) return 7;
  return numberOfWeek;
}