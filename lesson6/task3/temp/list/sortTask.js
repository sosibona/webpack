import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { setItem, getItem } from './storage.js';
export function sortingTask() {
  var tasksList = getItem('tasksList') || [];
  var sortedTask = tasksList.sort(function (a, b) {
    return a.done - b.done;
  }); // console.log('sortedTask')
  // console.log(sortedTask)

  var sortTask = [];
  var doneTask = sortedTask.filter(function (elem) {
    return elem.done === true;
  }).sort(function (a, b) {
    return new Date(b.dateConfirmed) - new Date(a.dateConfirmed);
  });
  var notDoneTask = sortedTask.filter(function (elem) {
    return elem.done === false;
  }).sort(function (a, b) {
    return new Date(a.dateCreate) - new Date(b.dateCreate);
  }); // console.log('notDoneTask')
  // console.log(notDoneTask)

  sortTask.push.apply(sortTask, _toConsumableArray(notDoneTask).concat(_toConsumableArray(doneTask)));
  setItem('tasksList', sortTask);
  return sortTask;
}