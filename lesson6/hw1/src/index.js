import { renderWeek } from './script/renderWeek.js';
import { renderSidebar } from './script/renderSidebar.js';
import { renderDateForWeek } from './script/renderDate.js';
import { renderDayCell } from './script/renderDayCell.js'
import { getCurrentMonth } from './script/getCurrentMonth.js';
import { createEvent } from './script/createEvent.js';
import { addClassCurentDate } from './script/navigationButton.js';
import { startLine } from './script/countLineTime.js';
import { greenwichTime } from './script/greenwichTime.js'
import { setItem, getItem } from './script/storage.js';
import { getEvents } from './script/tasks.js';
import './index.scss';

renderWeek();
renderSidebar();
renderDateForWeek(new Date());
renderDayCell(new Date());
getCurrentMonth();
createEvent();
addClassCurentDate();
startLine()
greenwichTime(new Date());

document.addEventListener('DOMContentLoaded', () => {
  getEvents()
    .then(events => {
      setItem('events', events)
      createEvent();
    })
});

const onStorageChange = e => {
  if (e.key === 'events') {
    const week = document.querySelector('.day-by-hours').dataset.dateOfDay;
    
    renderDayCell(new Date(+week));
    createEvent();
  }
}

window.addEventListener('storage', onStorageChange)











