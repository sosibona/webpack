import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-own-property-descriptors";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { setItem, getItem } from './storage.js';
import { createEvent } from './createEvent.js';
import { renderDayCell } from './renderDayCell.js';
import { createNewEvent, getEvents } from './tasks.js';
var btnAddEvent = document.querySelector('.header__create');
var btnClosePopUp = document.querySelector('.modal-form__icon-close');
var btnCreateEvent = document.querySelector('.create-event__button');
var popUp = document.querySelector('.modal-form');
export function openPopUp() {
  popUp.style.display = 'flex';
}
export function closePopUp() {
  popUp.style.display = 'none';
}
var formElem = document.querySelector('.create-event');
export function addEvent(event) {
  event.preventDefault();
  if (!isCorrect()) return;

  var formatData = _toConsumableArray(new FormData(formElem)).reduce(function (events, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        value = _ref2[1];

    return _objectSpread({}, events, _defineProperty({}, field, value));
  }, {});

  formatData.data = formatData.data.replace(/-/g, ",");
  var newEvent = {
    nameOfEvent: formatData.nameOfEvent,
    data: formatData.data,
    startEvent: formatData.startEvent,
    endEvent: formatData.endEvent,
    description: formatData.description,
    eventColor: formatData.eventColor
  };
  var currentDay = document.querySelector('.day-by-hours');
  var currentDate = currentDay.dataset.dateOfDay;
  createNewEvent(newEvent).then(function () {
    return getEvents();
  }).then(function (events) {
    setItem('events', events);
    renderDayCell(new Date(+currentDate));
    createEvent();
    closePopUp();
  });
}
btnAddEvent.addEventListener('click', openPopUp);
btnClosePopUp.addEventListener('click', closePopUp);
btnCreateEvent.addEventListener('click', addEvent);

function isCorrect() {
  var nameEvent = document.querySelector('.create-event__name');
  var calendarEvent = document.querySelector('.calendar-data'); // console.log(calendarEvent.value);

  var startTimeEvent = document.querySelector('.startTime');
  var endTimeEvent = document.querySelector('.endTime');
  var error = document.querySelector('.modal-form__error');
  error.innerHTML = '';
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var date = new Date().getDate();
  var fullDate = new Date(year, month, date).getTime();

  if (nameEvent.value === "") {
    error.innerHTML += '*You need give a name of your event';
    nameEvent.style.outline = '2px solid red';
    return false;
  }

  nameEvent.style.outline = 'none';

  if (new Date(calendarEvent.value.replace(/-/g, ",")).getTime() < fullDate) {
    calendarEvent.style.outline = '2px solid red';
    error.innerHTML += '*The date you selected has already expired';
    return false;
  }

  calendarEvent.style.outline = 'none';

  if (calendarEvent.value === "") {
    calendarEvent.style.outline = '2px solid red';
    error.innerHTML += '*You need select the date';
    return false;
  }

  calendarEvent.style.outline = 'none';

  if (startTimeEvent.value === "" || endTimeEvent.value === "") {
    startTimeEvent.style.outline = '2px solid red';
    endTimeEvent.style.outline = '2px solid red';
    error.innerHTML += '*You need to enter correct the time';
    return false;
  }

  startTimeEvent.style.outline = 'none';
  endTimeEvent.style.outline = 'none';

  var _startTimeEvent$value = startTimeEvent.value.split(':').map(function (elem) {
    return +elem;
  }),
      _startTimeEvent$value2 = _slicedToArray(_startTimeEvent$value, 2),
      StartHour = _startTimeEvent$value2[0],
      StartMinutes = _startTimeEvent$value2[1];

  var _endTimeEvent$value$s = endTimeEvent.value.split(':').map(function (elem) {
    return +elem;
  }),
      _endTimeEvent$value$s2 = _slicedToArray(_endTimeEvent$value$s, 2),
      EndHour = _endTimeEvent$value$s2[0],
      EndMinutes = _endTimeEvent$value$s2[1];

  if (StartHour > EndHour) {
    startTimeEvent.style.outline = '2px solid red';
    endTimeEvent.style.outline = '2px solid red';
    error.innerHTML += '*You entered wrong hour';
    return false;
  }

  startTimeEvent.style.outline = 'none';
  endTimeEvent.style.outline = 'none';

  if (StartHour === EndHour && StartMinutes > EndMinutes) {
    startTimeEvent.style.outline = '2px solid red';
    endTimeEvent.style.outline = '2px solid red';
    error.innerHTML += '*You entered wrong minutes';
    return false;
  }

  startTimeEvent.style.outline = 'none';
  endTimeEvent.style.outline = 'none';

  if (StartMinutes % 15 !== 0 || EndMinutes % 15 !== 0) {
    startTimeEvent.style.outline = '2px solid red';
    endTimeEvent.style.outline = '2px solid red';
    error.innerHTML += '*Step must be 15 minutes';
    return false;
  }

  return true;
}