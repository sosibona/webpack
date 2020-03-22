import "core-js/modules/es.array.concat";
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function getCurrentMonth() {
  var monthElem = document.querySelector('.header__month');
  var daysOfWeek = document.querySelectorAll('.day-by-hours');
  var firstDayOfWeek = daysOfWeek[0].dataset.dateOfDay;
  var lastDayOfWeek = daysOfWeek[daysOfWeek.length - 1].dataset.dateOfDay;
  var monthForFirstDayOfWeek = new Date(+firstDayOfWeek).getMonth();
  var monthForLastDayOfWeek = new Date(+lastDayOfWeek).getMonth();
  var currentYear = new Date(+firstDayOfWeek).getFullYear();

  if (monthForFirstDayOfWeek !== monthForLastDayOfWeek) {
    monthElem.innerHTML = "".concat(month[monthForFirstDayOfWeek], " - ").concat(month[monthForLastDayOfWeek], " ").concat(currentYear);
  } else {
    monthElem.innerHTML = "".concat(month[monthForFirstDayOfWeek], " ").concat(currentYear);
  }
}