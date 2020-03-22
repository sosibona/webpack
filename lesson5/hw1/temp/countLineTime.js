import "core-js/modules/es.array.concat";
export var timerId;
export function startLine() {
  countLineTime();
  timerId = setInterval(countLineTime, 60000);
}
clearInterval(timerId);

function countLineTime() {
  var nowTimeHour = new Date().getHours();
  var nowTimeMinutes = new Date().getMinutes();
  var lineTimeElem = document.querySelector('.line-now');
  lineTimeElem.style.top = "".concat(60 * nowTimeHour + nowTimeMinutes, "px");
  lineTimeElem.firstChild.innerHTML = "".concat(nowTimeHour, ":").concat(nowTimeMinutes);
}