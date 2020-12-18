const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getCurrentTime() {
  const currentTime = new Date();
  const getHours = currentTime.getHours();
  const getMinutes = currentTime.getMinutes();
  // const getSeconds = currentTime.getSeconds();
  paintTime(getHours, getMinutes);
}

function paintTime(hours, minutes) {
  clockTitle.innerText = `${hours > 10 ? hours : `0${hours}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }`;
}

function init() {
  getCurrentTime(); //이걸 안해주면, 페이지가 열리고 1초 사이까지는 00:00 이 보이는것 같다.
  setInterval(getCurrentTime, 1000);
}

init();
