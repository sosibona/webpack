
import {listElem, renderListItems} from './render.js';
import {setItem, getItem} from './storage.js'
import { updateTasks, getTasksList } from './tasksGateway.js';

const checkboxAllElem = document.querySelector('.list');

export function makeDoneTask(event) {
  const listTaskNow = event.target.closest('.list__item-checkbox');
  
  if (!listTaskNow) {
    return;
  }

  const tasksList = getItem('tasksList');

  const thisTask = listTaskNow.parentNode
  const taskId = thisTask.dataset.id;
  const done = event.target.checked;
  const { text, dateCreate } = tasksList
    .find(task => task.id === taskId);

  thisTask.classList.toggle('list__item_done');

  const updateTask = {
    text,
    dateCreate,
    done,
    dateConfirmed: done 
      ? new Date()
      : null
  }
  updateTasks(taskId, updateTask)
    .then(() => getTasksList())
    .then(tasks => {
      setItem('tasksList', tasks); 
      listElem.innerHTML = '';
      renderListItems(); 
    });
}

checkboxAllElem.addEventListener('click', makeDoneTask);