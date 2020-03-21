import {setItem, getItem} from './storage.js'
import { renderListItems, listElem } from './index.js';
import { createTask, getTasksList } from './tasksGateway.js';

const btnCreateTask = document.querySelector('.create-task-btn');
let getTextFromInput = document.querySelector('.task-input')

btnCreateTask.addEventListener('click', createNewTask);

export function createNewTask(){
    let inputValue = getTextFromInput.value;
    if (inputValue.length === 0) return;

    getTextFromInput.value = '';

    const newTask = {
      text: inputValue,
      dateCreate: new Date(),
      done: false,
      dateConfirmed: null, 
      id: Math.random().toString()   
    }

    createTask(newTask)
      .then(() => getTasksList())
      .then(tasks => {
        setItem('tasksList', tasks); 
        listElem.innerHTML = '';
        renderListItems(); 
      });

          
}