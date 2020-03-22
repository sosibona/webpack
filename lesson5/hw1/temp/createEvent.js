import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { setItem, getItem } from './storage.js';
export function createEvent() {
  var listOfEvent = getItem('events') || [];

  var days = _toConsumableArray(document.querySelectorAll('.day-by-hours')); // отримую поточний тиждень


  var getStartHour, getStartMinutes, getEndHour, getEndMinutes;

  var _iterator = _createForOfIteratorHelper(listOfEvent),
      _step;

  try {
    var _loop = function _loop() {
      var event = _step.value;
      //перепбираю всі івенти і перевіряю чи в цьому тижні, що на екрані 
      var thisDays = days.find(function (elem) {
        return new Date(event.data).getTime() === +elem.dataset.dateOfDay;
      }); //знаходжу день для подї

      if (!thisDays) {
        return "continue";
      } // якщо її тут немає, то переходжу до наступної


      var thisDay = thisDays.children; //   стоврюю колекцію з годин в цьому дні

      var thisHoursInThisDay = _toConsumableArray(thisDay);

      var _event$startEvent$spl = event.startEvent.split(':').map(function (elem) {
        return +elem;
      });

      var _event$startEvent$spl2 = _slicedToArray(_event$startEvent$spl, 2);

      getStartHour = _event$startEvent$spl2[0];
      getStartMinutes = _event$startEvent$spl2[1];

      var _event$endEvent$split = event.endEvent.split(':').map(function (elem) {
        return +elem;
      });

      var _event$endEvent$split2 = _slicedToArray(_event$endEvent$split, 2);

      getEndHour = _event$endEvent$split2[0];
      getEndMinutes = _event$endEvent$split2[1];
      if (getStartHour > getEndHour) return "continue";
      if (getStartHour === getEndHour && getStartMinutes > getEndMinutes) return "continue";
      thisHoursInThisDay[getStartHour].innerHTML += //знаходжу клітинку в якій годині має початися івент
      "<div data-id=\"".concat(event.id, "\" class='event' style=\"").concat(styleForEvent(), "; background-color: ").concat(event.eventColor, "\">\n        <span>").concat(event.startEvent, " - ").concat(event.endEvent, "</span>\n        <span>").concat(event.nameOfEvent, "</span>\n        <span class=\"event__description\">").concat(event.description, "</span>\n      </div>");
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function styleForEvent() {
    if (getEndHour - getStartHour === 0) {
      return "\n        height: ".concat(getEndMinutes - getStartMinutes, "px; \n        top: ").concat(getStartMinutes, "px");
    } else if (getEndHour - getStartHour === 1 && getStartMinutes > getEndMinutes) {
      getEndMinutes += 60;
      return "\n          height: ".concat(getEndMinutes - getStartMinutes, "px; \n          top: ").concat(getStartMinutes, "px");
    } else {
      return "\n          height: ".concat(60 * (getEndHour - getStartHour) + (getEndMinutes - getStartMinutes), "px; \n          top: ").concat(getStartMinutes, "px");
    }
  }
}