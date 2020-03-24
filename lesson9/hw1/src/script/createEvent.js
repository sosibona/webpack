import { getItem } from './storage';

export function createEvent() {
  const listOfEvent = getItem('events') || [];
  const days = [...document.querySelectorAll('.day-by-hours')];
  let getStartHour; let getStartMinutes; let getEndHour; let
    getEndMinutes;

  function styleForEvent() {
    if (getEndHour - getStartHour === 0) {
      return `
        height: ${getEndMinutes - getStartMinutes}px; 
        top: ${getStartMinutes}px`;
    } if (getEndHour - getStartHour === 1 && getStartMinutes > getEndMinutes) {
      getEndMinutes += 60;
      return `
          height: ${getEndMinutes - getStartMinutes}px; 
          top: ${getStartMinutes}px`;
    }
    return `
          height: ${60 * (getEndHour - getStartHour) + (getEndMinutes - getStartMinutes)}px; 
          top: ${getStartMinutes}px`;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const event of listOfEvent) {
    const thisDays = days
      .find((elem) => new Date(event.data).getTime() === +elem.dataset.dateOfDay);

    if (!thisDays) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const thisDay = thisDays.children;
    const thisHoursInThisDay = [...thisDay];

    [getStartHour, getStartMinutes] = event.startEvent.split(':').map((elem) => +elem);
    [getEndHour, getEndMinutes] = event.endEvent.split(':').map((elem) => +elem);

    // eslint-disable-next-line no-continue
    if (getStartHour > getEndHour) continue;
    // eslint-disable-next-line no-continue
    if (getStartHour === getEndHour && getStartMinutes > getEndMinutes) continue;

    thisHoursInThisDay[getStartHour].innerHTML
      += `<div data-id="${event.id}" class='event' style="${styleForEvent()}; background-color: ${event.eventColor}">
        <span>${event.startEvent} - ${event.endEvent}</span>
        <span>${event.nameOfEvent}</span>
        <span class="event__description">${event.description}</span>
      </div>`;
  }
}
