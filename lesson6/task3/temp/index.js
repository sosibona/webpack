import { setItem } from './list/storage.js';
import { getTasksList } from './list/tasksGateway.js';
import './index.scss';
document.addEventListener('DOMContentLoaded', function () {
  getTasksList().then(function (taskList) {
    setItem('tasksList', taskList);
    renderListItems();
  });
});

var onStorageChange = function onStorageChange(e) {
  if (e.key === 'tasksList') {
    listElem.innerHTML = '';
    renderListItems();
  }
};

window.addEventListener('storage', onStorageChange);