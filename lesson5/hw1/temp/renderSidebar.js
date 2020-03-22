import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.pad-start";
import { generateNumber } from './generateNumber.js';
var sidebarElem = document.querySelector('.time');
export var renderSidebar = function renderSidebar() {
  var hoursByDay = generateNumber(1, 24).map(function (time) {
    return "<div class=\"time-in-day\" data-time-of-day=\"".concat(time, "\">\n      ").concat(time.toString().length < 2 ? time.toString().padStart(2, 0) : time, ":00\n      </div>");
  }).join('');
  sidebarElem.innerHTML = hoursByDay;
};