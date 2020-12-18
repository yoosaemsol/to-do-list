const dateContainer = document.querySelector(".js-date");
const dateTitle = dateContainer.querySelector("h1");

function init() {
  getCurrentDate();
}

function getCurrentDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const day = currentDate.getDay();

  paintDate(day, date, month);
}

function paintDate(day, date, month) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dateTitle.innerText = `${dayNames[day]}, ${date} ${monthNames[month]}`;
}

init();
