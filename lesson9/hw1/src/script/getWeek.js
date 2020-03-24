// eslint-disable-next-line import/no-cycle
import { getMonday } from './getMonday';

export const getWeek = (date) => {
  const newDate = getMonday(date);
  const week = [];
  const oneDay = 86400000;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 6; i++) {
    week.push(newDate.getTime() + oneDay * i);
  }

  const weekUp = week.map((elem) => {
    const getDate = new Date(elem).getDate();

    const getMonth = new Date(elem).getMonth();
    const getFullYear = new Date(elem).getFullYear();

    // eslint-disable-next-line no-shadow
    const newDate = new Date(getFullYear, getMonth, getDate).getTime();
    return newDate;
  });

  return weekUp;
};
