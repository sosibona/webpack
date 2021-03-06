// eslint-disable-next-line import/no-mutable-exports
export let timerId;

clearInterval(timerId);

function countLineTime() {
  const nowTimeHour = new Date().getHours();
  const nowTimeMinutes = new Date().getMinutes();

  const lineTimeElem = document.querySelector('.line-now');
  lineTimeElem.style.top = `${60 * nowTimeHour + nowTimeMinutes}px`;
  lineTimeElem.firstChild.innerHTML = `${nowTimeHour}:${nowTimeMinutes}`;
}

export function startLine() {
  countLineTime();
  timerId = setInterval(countLineTime, 60000);
}
