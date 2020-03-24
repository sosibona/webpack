import { dayToday, addClassCurentDate } from './navigationButton';
import { renderDayCell } from './renderDayCell';
import { renderDateForWeek } from './renderDate';
import { getCurrentMonth } from './getCurrentMonth';
import { createEvent } from './createEvent';
import { startLine } from './countLineTime';

const btnCurrentWeek = document.querySelector('.header__today');

export function showCurrentWeek() {
  const todayYear = dayToday.getFullYear();
  const todayMonth = dayToday.getMonth();
  const todayDate = dayToday.getDate();
  const today = new Date(todayYear, todayMonth, todayDate);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const current = new Date(currentYear, currentMonth, currentDate);

  if (today === current) {
    return;
  }

  renderDayCell(new Date());
  renderDateForWeek(new Date());
  getCurrentMonth();
  addClassCurentDate();
  createEvent();
  startLine();


  dayToday.setFullYear(currentYear, currentMonth, currentDate);
}

btnCurrentWeek.addEventListener('click', showCurrentWeek);
