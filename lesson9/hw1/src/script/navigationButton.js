// eslint-disable-next-line import/no-cycle
import { getMonday } from './getMonday';
// eslint-disable-next-line import/no-cycle
import { renderDateForWeek } from './renderDate';
// eslint-disable-next-line import/no-cycle
import { renderDayCell } from './renderDayCell';
// eslint-disable-next-line import/no-cycle
import { getWeek } from './getWeek';
import { getCurrentMonth } from './getCurrentMonth';
import { createEvent } from './createEvent';
import { startLine, timerId } from './countLineTime';

const daysOfWeek = document.querySelectorAll('.navigation__days');

export function addClassCurentDate() {
  const dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');
  let curentDayOfWeek = new Date().getDay();

  // eslint-disable-next-line no-use-before-define
  curentDayOfWeek = isSunday(curentDayOfWeek);

  dateOfMondayElem[curentDayOfWeek - 1].classList.add('date-today');
  daysOfWeek[curentDayOfWeek - 1].classList.add('day-today');
}

function removeClassCurentDate() {
  const dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');
  let curentDayOfWeek = new Date().getDay();

  // eslint-disable-next-line no-use-before-define
  curentDayOfWeek = isSunday(curentDayOfWeek);

  dateOfMondayElem[curentDayOfWeek - 1].classList.remove('date-today');
  daysOfWeek[curentDayOfWeek - 1].classList.remove('day-today');
}

const switchRigth = document.querySelector('.angle-rigth');
const switchRigthSpan = switchRigth.parentNode;

const switchLeft = document.querySelector('.angle-left');
const switchLeftSpan = switchLeft.parentNode;

export const dayToday = new Date();
const daysInWeek = 7;

function toNextWeek() {
  const nextWeekMonday = getMonday(new Date(dayToday.setDate(dayToday.getDate() + daysInWeek)));

  renderDateForWeek(nextWeekMonday);
  renderDayCell(nextWeekMonday);

  const week = getWeek(nextWeekMonday);
  // eslint-disable-next-line no-use-before-define
  checkCurentWeek(week);
  getCurrentMonth();
  createEvent();
}

function toPreviosWeek() {
  const PreviosWeekMonday = getMonday(new Date(dayToday.setDate(dayToday.getDate() - daysInWeek)));

  renderDateForWeek(PreviosWeekMonday);
  renderDayCell(PreviosWeekMonday);

  const week = getWeek(PreviosWeekMonday);
  getCurrentMonth();
  createEvent();
  // eslint-disable-next-line no-use-before-define
  checkCurentWeek(week);
}

switchRigthSpan.addEventListener('click', toNextWeek);
switchLeftSpan.addEventListener('click', toPreviosWeek);


function checkCurentWeek(week) {
  const curentDate = new Date();

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
