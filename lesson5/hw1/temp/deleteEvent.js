import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import { setItem, getItem } from './storage.js';
import { renderDayCell } from './renderDayCell.js';
import { createEvent } from './createEvent.js';
import { updateEvent, getEvents, deleteEvent } from './tasks.js';
var eventForDelete = document.querySelector('.current-week');
var modalDelete = document.querySelector('.modal-delete');
var modalDeleteClose = document.querySelector('.modal-delete__icon-close');
var btnDeleteEvent = document.querySelector('.modal-delete__btn-delete-event');
var btnChangeColor = document.querySelector('.modal-delete__btn-change-color');
var eventTitle = document.querySelector('.modal-delete__title');
var eventData = document.querySelector('.modal-delete__time');
var eventDescription = document.querySelector('.modal-delete__info');
var colorPickerElem = document.querySelector('#eventColor');
eventForDelete.addEventListener('click', onEvent);
export function onEvent() {
  var click = event.target;
  var idEvent;
  var isEventClose = click.closest('.event');

  if (!isEventClose) {
    return;
  }

  idEvent = isEventClose.dataset.id;
  modalDelete.style.display = 'flex';
  var listOfEvent = getItem('events') || [];

  for (var i = 0; i < listOfEvent.length; i++) {
    if (listOfEvent[i].id === idEvent) {
      eventTitle.innerHTML = listOfEvent[i].nameOfEvent;
      eventData.innerHTML = "".concat(new Date(listOfEvent[i].data).toLocaleDateString(), ", ").concat(listOfEvent[i].startEvent, " - ").concat(listOfEvent[i].endEvent);
      eventDescription.innerHTML = listOfEvent[i].description;
      if (!eventDescription.textContent) eventDescription.innerHTML = 'No additional information';
      colorPickerElem.value = listOfEvent[i].eventColor;
    }
  }

  modalDeleteClose.addEventListener('click', closeModalDelete);
  btnDeleteEvent.addEventListener('click', isDelete);
  btnChangeColor.addEventListener('click', onChangeColor);

  function isDelete() {
    var week = click.closest('.day-by-hours').dataset.dateOfDay;
    deleteEvent(idEvent).then(function () {
      return getEvents();
    }).then(function (events) {
      setItem('events', events);
      renderDayCell(new Date(+week));
      createEvent();
      closeModalDelete();
    });
  }

  function onChangeColor() {
    var week = click.closest('.day-by-hours').dataset.dateOfDay;
    var events = getItem('events');
    var thisEvent = events.find(function (event) {
      return event.id === idEvent;
    });
    var nameOfEvent = thisEvent.nameOfEvent,
        data = thisEvent.data,
        startEvent = thisEvent.startEvent,
        endEvent = thisEvent.endEvent,
        description = thisEvent.description,
        id = thisEvent.id;
    var updateEventColor = {
      nameOfEvent: nameOfEvent,
      data: data,
      startEvent: startEvent,
      endEvent: endEvent,
      description: description,
      id: id,
      eventColor: colorPickerElem.value
    };
    updateEvent(idEvent, updateEventColor).then(function () {
      return getEvents();
    }).then(function (events) {
      setItem('events', events);
      renderDayCell(new Date(+week));
      createEvent();
      closeModalDelete();
    });
  }

  function closeModalDelete() {
    btnDeleteEvent.removeEventListener('click', isDelete);
    btnChangeColor.removeEventListener('click', onChangeColor);
    modalDelete.style.display = 'none';
  }
}