import { renderListItems, listElem } from '../index.js';
import { deleteTask, getTasksList }  from './tasksGateway.js'
import {setItem, getItem} from './storage.js'

const deleteBtn = document.querySelector('.list');


export const onDeleteTask = event => {
  // const listTaskNow = event.target.closest('.list__item-checkbox');
  const thisTask = event.target.classList.contains('delete-btn');
  
  if (!thisTask) {
    return;
  }

  const taskId = event.target.parentNode.dataset.id;
  
  deleteTask(taskId)
    .then(() => getTasksList())
    .then(tasks => {
      setItem('tasksList', tasks); 
      listElem.innerHTML = '';
      renderListItems(); 
    });
}

deleteBtn.addEventListener('click', onDeleteTask);