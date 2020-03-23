import {getItem} from './storage.js'
import { sortingTask } from './sortTask.js';
import './list.scss';

export const listElem = document.querySelector('.list');

  export const renderListItems = () => {
    const tasksList = getItem('tasksList') || [];
    const listTasks = sortingTask(tasksList);

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

