import { generateNumber } from './generateNumber';

const dateOfMonthElem = document.querySelector('.date-of-month');

export const renderWeek = () => {
  const numberOfWeek = generateNumber(1, 7)
    // eslint-disable-next-line no-unused-vars
    .map((dayOfWeek) => '<span class="curent-date-of-week"></span>').join('');

  dateOfMonthElem.innerHTML = numberOfWeek;
};
