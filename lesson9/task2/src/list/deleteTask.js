import { renderListItems, listElem } from '../index';
import { deleteTask, getTasksList } from './tasksGateway';
import { setItem } from './storage';

const deleteBtn = document.querySelector('.list');


export const onDeleteTask = (event) => {
  const thisTask = event.target.classList.contains('delete-btn');

  if (!thisTask) {
    return;
  }

  const taskId = event.target.parentNode.dataset.id;

  deleteTask(taskId)
    .then(() => getTasksList())
    .then((tasks) => {
      setItem('tasksList', tasks);
      listElem.innerHTML = '';
      renderListItems();
    });
};

deleteBtn.addEventListener('click', onDeleteTask);
