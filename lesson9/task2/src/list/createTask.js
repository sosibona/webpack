import { setItem } from './storage';
import { renderListItems, listElem } from '../index';
import { createTask, getTasksList } from './tasksGateway';

const btnCreateTask = document.querySelector('.create-task-btn');
const getTextFromInput = document.querySelector('.task-input');

export function createNewTask() {
  const inputValue = getTextFromInput.value;
  if (inputValue.length === 0) return;

  getTextFromInput.value = '';

  const newTask = {
    text: inputValue,
    dateCreate: new Date(),
    done: false,
    dateConfirmed: null,
    id: Math.random().toString(),
  };

  createTask(newTask)
    .then(() => getTasksList())
    .then((tasks) => {
      setItem('tasksList', tasks);
      listElem.innerHTML = '';
      renderListItems();
    });
}

btnCreateTask.addEventListener('click', createNewTask);
