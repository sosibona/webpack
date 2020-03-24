// eslint-disable-next-line no-unused-vars
import { generateNumber } from './script/generateNumber';
import { renderWeek } from './script/renderWeek';
import { renderSidebar } from './script/renderSidebar';
// eslint-disable-next-line no-unused-vars
import { getWeek } from './script/getWeek';
// eslint-disable-next-line no-unused-vars
import { getMonday } from './script/getMonday';
// eslint-disable-next-line no-unused-vars
import { openPopUp, addEvent } from './script/popUp';
// eslint-disable-next-line no-unused-vars
import { showCurrentWeek } from './script/showCurrentWeek';
// eslint-disable-next-line no-unused-vars
import { onEvent } from './script/deleteEvent';
import { renderDateForWeek } from './script/renderDate';
import { renderDayCell } from './script/renderDayCell';
import { getCurrentMonth } from './script/getCurrentMonth';
import { createEvent } from './script/createEvent';
import { addClassCurentDate } from './script/navigationButton';
import { startLine } from './script/countLineTime';
import { greenwichTime } from './script/greenwichTime';
import { setItem } from './script/storage';
import { getEvents } from './script/tasks';
import './index.scss';

renderWeek();
renderSidebar();
renderDateForWeek(new Date());
renderDayCell(new Date());
getCurrentMonth();
addClassCurentDate();
startLine();
greenwichTime(new Date());

document.addEventListener('DOMContentLoaded', () => {
  getEvents()
    .then((events) => {
      setItem('events', events);
      createEvent();
    });
});

const onStorageChange = (e) => {
  if (e.key === 'events') {
    const week = document.querySelector('.day-by-hours').dataset.dateOfDay;

    renderDayCell(new Date(+week));
    createEvent();
  }
};

window.addEventListener('storage', onStorageChange);
