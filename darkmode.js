// window.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
// });

const btnBox = document.querySelector(".mode");

function init() {
  loadModeSetting(); //모드 기억

  darkTimer(); // 저녁 8시 ~ 새벽 6시까지 다크모드
  changeMode();
}

function darkTimer() {
  const hour = new Date().getHours();
  console.log(hour);
  if (hour >= 20 && hour < 6) {
    document.body.classList.toggle("dark");
  }
}

function changeMode() {
  btnBox.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btnBox.classList.toggle("on");
    saveMode();
  });
}

function saveMode() {
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", true);
  } else {
    console.log("off");
    localStorage.removeItem("mode");
  }
}

function loadModeSetting() {
  const modeSettingValue = localStorage.getItem("mode");
  if (modeSettingValue !== null) {
    document.body.classList.add("dark");
    btnBox.classList.add("on");
  }
}

init();
