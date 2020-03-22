import "core-js/modules/es.array.map";
import { getMonday } from './getMonday.js';
export var getWeek = function getWeek(date) {
  var newDate = getMonday(date);
  var week = [];
  var oneDay = 86400000;

  for (var i = 0; i <= 6; i++) {
    week.push(newDate.getTime() + oneDay * i);
  }

  var weekUp = week.map(function (elem) {
    var getDate = new Date(elem).getDate();
    var getMonth = new Date(elem).getMonth();
    var getFullYear = new Date(elem).getFullYear();
    var newDate = new Date(getFullYear, getMonth, getDate).getTime();
    return newDate;
  });
  return weekUp;
};