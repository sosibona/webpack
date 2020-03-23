import { renderListItems, listElem } from './render.js';
import { deleteTask, getTasksList } from './tasksGateway.js';
import { setItem, getItem } from './storage.js';
var deleteBtn = document.querySelector('.list');
export var onDeleteTask = function onDeleteTask(event) {
  // const listTaskNow = event.target.closest('.list__item-checkbox');
  var thisTask = event.target.classList.contains('delete-btn');

  if (!thisTask) {
    return;
  }

  var taskId = event.target.parentNode.dataset.id;
  deleteTask(taskId).then(function () {
    return getTasksList();
  }).then(function (tasks) {
    setItem('tasksList', tasks);
    listElem.innerHTML = '';
    renderListItems();
  });
};
deleteBtn.addEventListener('click', onDeleteTask);