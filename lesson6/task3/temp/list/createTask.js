import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import { setItem, getItem } from './storage.js';
import { renderListItems, listElem } from './render.js';
import { createTask, getTasksList } from './tasksGateway.js';
var btnCreateTask = document.querySelector('.create-task-btn');
var getTextFromInput = document.querySelector('.task-input');
btnCreateTask.addEventListener('click', createNewTask);
export function createNewTask() {
  var inputValue = getTextFromInput.value;
  if (inputValue.length === 0) return;
  getTextFromInput.value = '';
  var newTask = {
    text: inputValue,
    dateCreate: new Date(),
    done: false,
    dateConfirmed: null,
    id: Math.random().toString()
  };
  createTask(newTask).then(function () {
    return getTasksList();
  }).then(function (tasks) {
    setItem('tasksList', tasks);
    listElem.innerHTML = '';
    renderListItems();
  });
}