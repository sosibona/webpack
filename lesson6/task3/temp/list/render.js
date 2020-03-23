import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
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

import { getItem } from './storage.js';
import { sortingTask } from './sortTask.js';
import './list.scss';
window.addEventListener('storage', onStorageChange);
export var listElem = document.querySelector('.list');
export var renderListItems = function renderListItems() {
  var tasksList = getItem('tasksList') || [];
  var listTasks = sortingTask(tasksList);
  var makeListTasks = listTasks.map(function (_ref) {
    var text = _ref.text,
        done = _ref.done,
        id = _ref.id;
    var listItemElem = document.createElement('li');
    var checkboxElem = document.createElement('input');
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    checkboxElem.classList.add('list__item-checkbox');
    listItemElem.classList.add('list__item');
    checkboxElem.setAttribute('type', 'checkbox');
    listItemElem.setAttribute('data-id', id);
    if (done) listItemElem.classList.add('list__item_done');
    checkboxElem.checked = done;
    listItemElem.append(checkboxElem, text, deleteBtn);
    return listItemElem;
  });
  listElem.append.apply(listElem, _toConsumableArray(makeListTasks));
  return makeListTasks;
};