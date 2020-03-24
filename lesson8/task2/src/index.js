import {setItem, getItem} from './list/storage.js'
import { createNewTask } from './list/createTask.js';
import { sortingTask } from './list/sortTask.js';
import { makeDoneTask } from './list/updateTask.js'
import { getTasksList } from './list/tasksGateway.js';
import { onDeleteTask } from './list/deleteTask.js';
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


export const listElem = document.querySelector('.list');

  export const renderListItems = () => {
    const tasksList = getItem('tasksList') || [];
    // console.log(tasksList);
    const listTasks = sortingTask(tasksList);
    // console.log('tasksList');
    // console.log(tasksList);

    const makeListTasks = listTasks
      .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      const checkboxElem = document.createElement('input');

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn')

      checkboxElem.classList.add('list__item-checkbox');
      listItemElem.classList.add('list__item'); 
      checkboxElem.setAttribute('type', 'checkbox');
      listItemElem.setAttribute('data-id', id);

      if (done) listItemElem.classList.add('list__item_done');
        checkboxElem.checked = done;
      listItemElem.append(checkboxElem, text, deleteBtn);
      return listItemElem;
    });

    listElem.append(...makeListTasks);
    return makeListTasks;
  };

