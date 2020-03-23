import "core-js/modules/es.array.find";
import { listElem, renderListItems } from './render.js';
import { setItem, getItem } from './storage.js';
import { updateTasks, getTasksList } from './tasksGateway.js';
var checkboxAllElem = document.querySelector('.list');
export function makeDoneTask(event) {
  var listTaskNow = event.target.closest('.list__item-checkbox');

  if (!listTaskNow) {
    return;
  }

  var tasksList = getItem('tasksList');
  var thisTask = listTaskNow.parentNode;
  var taskId = thisTask.dataset.id;
  var done = event.target.checked;

  var _tasksList$find = tasksList.find(function (task) {
    return task.id === taskId;
  }),
      text = _tasksList$find.text,
      dateCreate = _tasksList$find.dateCreate;

  thisTask.classList.toggle('list__item_done');
  var updateTask = {
    text: text,
    dateCreate: dateCreate,
    done: done,
    dateConfirmed: done ? new Date() : null
  };
  updateTasks(taskId, updateTask).then(function () {
    return getTasksList();
  }).then(function (tasks) {
    setItem('tasksList', tasks);
    listElem.innerHTML = '';
    renderListItems();
  });
}
checkboxAllElem.addEventListener('click', makeDoneTask);