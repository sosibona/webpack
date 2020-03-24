import { setItem, getItem } from './storage';
import { renderDayCell } from './renderDayCell';
import { createEvent } from './createEvent';
import { updateEvent, getEvents, deleteEvent } from './tasks';

const modalDelete = document.querySelector('.modal-delete');
const modalDeleteClose = document.querySelector('.modal-delete__icon-close');
const btnDeleteEvent = document.querySelector('.modal-delete__btn-delete-event');
const btnChangeColor = document.querySelector('.modal-delete__btn-change-color');
const eventTitle = document.querySelector('.modal-delete__title');
const eventData = document.querySelector('.modal-delete__time');
const eventDescription = document.querySelector('.modal-delete__info');
const colorPickerElem = document.querySelector('#eventColor');

export function onEvent() {
  // eslint-disable-next-line no-restricted-globals
  const click = event.target;
  const isEventClose = click.closest('.event');

  if (!isEventClose) {
    return;
  }

  const idEvent = isEventClose.dataset.id;
  modalDelete.style.display = 'flex';

  const listOfEvent = getItem('events') || [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < listOfEvent.length; i++) {
    if (listOfEvent[i].id === idEvent) {
      eventTitle.innerHTML = listOfEvent[i].nameOfEvent;
      eventData.innerHTML = `${new Date(listOfEvent[i].data).toLocaleDateString()}, ${listOfEvent[i].startEvent} - ${listOfEvent[i].endEvent}`;
      eventDescription.innerHTML = listOfEvent[i].description;
      if (!eventDescription.textContent) eventDescription.innerHTML = 'No additional information';
      colorPickerElem.value = listOfEvent[i].eventColor;
    }
  }

  function isDelete() {
    const week = click.closest('.day-by-hours').dataset.dateOfDay;

    deleteEvent(idEvent)
      .then(() => getEvents())
      .then((events) => {
        setItem('events', events);
        renderDayCell(new Date(+week));
        createEvent();
        // eslint-disable-next-line no-use-before-define
        closeModalDelete();
      });
  }

  function onChangeColor() {
    const week = click.closest('.day-by-hours').dataset.dateOfDay;
    const events = getItem('events');
    const thisEvent = events.find((event) => event.id === idEvent);
    const {
      nameOfEvent, data, startEvent, endEvent, description, id,
    } = thisEvent;

    const updateEventColor = {
      nameOfEvent,
      data,
      startEvent,
      endEvent,
      description,
      id,
      eventColor: colorPickerElem.value,
    };

    updateEvent(idEvent, updateEventColor)
      .then(() => getEvents())
      // eslint-disable-next-line no-shadow
      .then((events) => {
        setItem('events', events);
        renderDayCell(new Date(+week));
        createEvent();
        // eslint-disable-next-line no-use-before-define
        closeModalDelete();
      });
  }

  function closeModalDelete() {
    btnDeleteEvent.removeEventListener('click', isDelete);
    btnChangeColor.removeEventListener('click', onChangeColor);
    modalDelete.style.display = 'none';
  }

  modalDeleteClose.addEventListener('click', closeModalDelete);
  btnDeleteEvent.addEventListener('click', isDelete);
  btnChangeColor.addEventListener('click', onChangeColor);
}
