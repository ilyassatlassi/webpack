import './style.css';

const list = document.getElementById('listtodo');
const add = document.getElementById('add');

let todoList = [];

const showList = () => {
  let listItems = '';
  todoList.forEach((element) => {
    listItems += `<li class="task">
                                  <div>
                                  <input type="checkbox" class="checkFunc"  id="check${element.index}">
                                  <input type="text" value="${element.description}" class="listitem" id="item${element.index}" readonly>
                                  </div>
                                  <div class = "tools">
                                  <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}"></i>
                                  <i class="fa-solid fa-floppy-disk save hide box" id="save${element.index}"></i>
                                  <i id="removeicon"  onclick="removeFunc(${element.index});" class="fa-solid fa-trash"></i>
                                  </div>
                          </li>`;
  });
  list.innerHTML = listItems;
  add.value = ''
};

showList();


// Adding function
add.addEventListener("keypress",(e) => {
  if (e.key === "Enter" && add.value.length != 0) {
    let storedList = localStorage.getItem("todo");

  if (storedList === null) {
      todoList = [];
  } else {
      todoList = JSON.parse(storedList);
  }

  const LocalStore = {
    index: Date.now(),
    description: add.value,
    completed: false,
  };
  todoList.push(LocalStore);
  localStorage.setItem("todo", JSON.stringify(todoList));
  showList();
  }
})

// call the data from the locale storage

window.onload = () => {
  if (localStorage.getItem("todo")) {
      todoList = JSON.parse(localStorage.getItem("todo"));
  }
  showList()
};

// Remove function

window.removeFunc = (index) => {
  let storedData = localStorage.getItem("todo");
  todoList = JSON.parse(storedData);
  console.log(todoList)
  
  todoList.splice(index, 1);
  console.log(index)

  localStorage.setItem("todo", JSON.stringify(todoList));
  showList()
};

