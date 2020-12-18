// input
const greetingForm = document.querySelector(".js-greetings");
const userNameInput = greetingForm.querySelector("input");
// output
const userNameContainer = document.querySelector(".username-container");
const greetingText = userNameContainer.querySelector("h1");
const renameBtn = document.querySelector(".js-resetBtn");

function init() {
  const currentUser = localStorage.getItem("username");
  if (currentUser === null) {
    askForName();
  } else {
    paintName(currentUser);
  }
}

function askForName() {
  greetingForm.classList.add("showing");
  userNameInput.classList.add("showing");
  greetingForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  const userName = userNameInput.value;
  paintName(userName);
  saveName(userName);
  userNameInput.value = "";
  removeInput();
}

function saveName(text) {
  localStorage.setItem("username", text);
}

function paintName(userName) {
  greetingText.classList.add("showing");
  removeInput();
  showRenameBtn();
  const date = new Date();
  const getHours = date.getHours();

  if (getHours >= 6 && getHours <= 10) {
    greetingText.innerHTML = `Hi! <span class="mark">${userName}</span> Good morning! 🌞`;
  } else if (getHours > 10 && getHours < 12) {
    greetingText.innerHTML = `Hi! <span class="mark">${userName}</span> Have a good day! 💕`;
  } else if (getHours >= 12 && getHours <= 17) {
    greetingText.innerHTML = `Hi! <span class="mark">${userName}</span> Good Afternoon! ✨`;
  } else if (getHours > 17 && getHours <= 20) {
    greetingText.innerHTML = `Hi! <span class="mark">${userName}</span> have a great dinner 🍔`;
  } else {
    greetingText.innerHTML = `Hi! <span class="mark">${userName}</span> have a good night! 🌙`;
  }

  renameBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    location.reload(true);
  });
}

function removeInput() {
  greetingForm.classList.remove("showing");
  userNameInput.classList.remove("showing");
}

function showRenameBtn() {
  renameBtn.classList.add("showing");
}

init();
