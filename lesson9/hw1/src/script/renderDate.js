// eslint-disable-next-line import/no-cycle
import { getMonday } from './getMonday';

export function renderDateForWeek(date) {
  const dateOfMondayElem = document.querySelectorAll('.curent-date-of-week');

  const startWeek = getMonday(date);

  startWeek.setDate(new Date(startWeek).getDate() - 1);

  dateOfMondayElem
    .forEach((elem) => {
      // eslint-disable-next-line no-param-reassign
      elem.innerHTML = startWeek.getDate(startWeek.setDate(startWeek.getDate() + 1));
    });
}
