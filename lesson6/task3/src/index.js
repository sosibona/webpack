import {setItem} from './list/storage.js'
import { getTasksList } from './list/tasksGateway.js';
import { renderListItems } from './list/render.js';
import './index.scss';


document.addEventListener('DOMContentLoaded', () => {
  getTasksList()
    .then(taskList => {
      setItem('tasksList', taskList)
      renderListItems();
    })
});

const onStorageChange = e => {
  if (e.key === 'tasksList') {
    listElem.innerHTML = '';
    renderListItems();
  }
}

window.addEventListener('storage', onStorageChange)
