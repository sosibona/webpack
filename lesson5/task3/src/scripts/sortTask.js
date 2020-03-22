import {setItem, getItem} from './storage.js'

export function sortingTask(){

  const tasksList = getItem('tasksList') || [];

  const sortedTask = tasksList.sort((a, b) => a.done - b.done);
  // console.log('sortedTask')
  // console.log(sortedTask)
  const sortTask = [];
  const doneTask = sortedTask.filter(elem => elem.done === true).sort((a, b) => new Date(b.dateConfirmed) - new Date(a.dateConfirmed));
  const notDoneTask = sortedTask.filter(elem => elem.done === false).sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
  // console.log('notDoneTask')
  // console.log(notDoneTask)
  sortTask.push(...notDoneTask, ...doneTask);

  setItem('tasksList', sortTask);

  return sortTask;
}