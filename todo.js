const toDoForm = document.querySelector(".js-todoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishedToDoList = document.querySelector(".js-finishedToDoList");

const TODOS_LS = "toDos";
let toDos = [];

function init() {
  loadToDos();
  loadFinishedToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //   로컬스토리지가 널이 아니라면 뭘 할거야

    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function paintToDo(text) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkBtn = document.createElement("input");
  const delBtn = document.createElement("i");
  const newId =
    toDoList.lastElementChild === null
      ? 1
      : parseInt(toDoList.lastElementChild.id) + 1;

  label.innerText = text;
  label.setAttribute("for", `${text}${newId}`);
  checkBtn.type = "checkbox";
  checkBtn.id = `${text}${newId}`;
  checkBtn.addEventListener("change", goToFinish); //완료로 이동하기

  delBtn.setAttribute("class", "fas fa-trash");
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(checkBtn);
  li.appendChild(label);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);

  handleDelBtn(li);
  /*
  //   마우스 오버시 delBtn 보이기
  li.addEventListener("mouseover", (event) => {
    if (event.target === li) {
      const targetBtn = event.target.childNodes[2];
      targetBtn.classList.add("no");
      //   console.log(targetBtn.classList);
    }
  });
  //   마우스 리브시 delbtn  감추기
  li.addEventListener("mouseleave", (event) => {
    const targetBtn = event.target.childNodes[2];
    targetBtn.classList.remove("no");
    //   console.log(targetBtn.classList);
  }); //mouseout 하니까 이상하게 안된다...
*/

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);

  saveToDos();
}

function handleDelBtn(li) {
  //   마우스 오버시 delBtn 보이기
  li.addEventListener("mouseover", (event) => {
    if (event.target === li) {
      const targetBtn = event.target.childNodes[2];
      targetBtn.classList.add("no");
      //   console.log(targetBtn.classList);
    }
  });
  //   마우스 리브시 delbtn  감추기
  li.addEventListener("mouseleave", (event) => {
    const targetBtn = event.target.childNodes[2];
    targetBtn.classList.remove("no");
    //   console.log(targetBtn.classList);
  }); //mouseout 하니까 이상하게 안된다...
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// todolist 삭제하기
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// 완료로 옮기기
function goToFinish(event) {
  const finishedText = event.target.parentNode.childNodes[1].innerText;
  deleteToDo(event); //todo에서는 삭제
  paintFinishedTodo(finishedText);
}

function goToDoList(event) {
  const toDoText = event.target.parentNode.childNodes[1].innerText;
  deleteFinishedToDo(event); //finished todo에서는 삭제
  paintToDo(toDoText);
}

function paintFinishedTodo(text) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkBtn = document.createElement("input");
  const delBtn = document.createElement("i");
  const newId =
    finishedToDoList.lastElementChild === null
      ? 1
      : parseInt(finishedToDoList.lastElementChild.id) + 1;

  label.innerText = text;
  label.setAttribute("for", `${text}${newId}`);
  checkBtn.type = "checkbox";
  checkBtn.id = `${text}${newId}`;
  checkBtn.setAttribute("checked", true);
  checkBtn.addEventListener("change", goToDoList); //투두로 돌아가기

  delBtn.setAttribute("class", "fas fa-trash");
  delBtn.addEventListener("click", deleteFinishedToDo);

  li.appendChild(checkBtn);
  li.appendChild(label);
  li.appendChild(delBtn);
  li.id = newId;
  finishedToDoList.appendChild(li);

  handleDelBtn(li);

  const finishedToDoObj = {
    text: text,
    id: newId,
  };
  finishedToDos.push(finishedToDoObj);

  saveFinishedToDos();
}

let finishedToDos = [];

function saveFinishedToDos() {
  localStorage.setItem("finished", JSON.stringify(finishedToDos));
}

function loadFinishedToDos() {
  const loadFinishedToDos = localStorage.getItem("finished");
  if (loadFinishedToDos !== null) {
    //   로컬스토리지가 널이 아니라면 뭘 할거야

    const parsedFinishedToDos = JSON.parse(loadFinishedToDos);
    parsedFinishedToDos.forEach(function (toDo) {
      paintFinishedTodo(toDo.text);
    });
  }
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedToDoList.removeChild(li);
  const cleanToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanToDos;
  saveFinishedToDos();
}

init();
