
import {listElem, renderListItems} from './index.js';
import { sortingTask } from './sortTask.js'
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
  // console.log();
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

  // isDoneTask(tasksList, thisTask);

  // setItem('tasksList', tasksList);

  // listElem.innerHTML = '';
  // renderListItems();
}

//check on done task
checkboxAllElem.addEventListener('click', makeDoneTask);
  
// function isDoneTask(listTask, checkboxItem){
//   listTask.forEach(elem => {
//     if (elem.text === checkboxItem.textContent) {
//       elem.done = !elem.done;
//       if (elem.dateConfirmed) {
//         elem.dateConfirmed = null;
//       } else {
//         elem.dateConfirmed = new Date();
//       }
//     }
//   });
// }