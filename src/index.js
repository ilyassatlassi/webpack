import './style.css';

const list = document.getElementById('listtodo');
const add = document.getElementById('add');

const completed = false;
let index = 0;
let todoList = [];

const showList = () => {
  let litItems = '';
  todoList.forEach((element) => {
    if (element.completed === true) {
      litItems += `<li class="task">
                                  <div>
                                  <input type="checkbox" class="checkFunc" checked onclick="checkFunc(${element.index});" id="check${element.index}">
                                  <input type="text" value="${element.description}" class="listitem" id="item${element.index}" readonly>
                                  </div>
                                  <div class = "tools">
                                  <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}" onclick="editFunc(${element.index});"></i>
                                  <i class="fa-solid fa-floppy-disk save hide box" id="save${element.index}" onclick="saveFunc(${element.index});"></i>
                                  <i id="removeicon" onclick="removeFunc(${element.index});" class="fa-solid fa-trash"></i>
                                  </div>
                          </li>`;
    } else {
      litItems += `<li class="task">
                                  <div>
                                  <input type="checkbox" class="checkFunc" onclick="checkFunc(${element.index});" id="check${element.index}">
                                  <input type="text" value="${element.description}" class="listitem" id="item${element.index}" readonly>
                                  </div>
                                  <div class = "tools">
                                  <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}" onclick="editFunc(${element.index});"></i>
                                  <i class="fa-solid fa-floppy-disk save hide box" id="save${element.index}" onclick="saveFunc(${element.index});"></i>
                                  <i id="removeicon" onclick="removeFunc(${element.index});" class="fa-solid fa-trash"></i>
                                  </div>
                          </li>`;
    }
  });

  list.innerHTML = litItems;
  add.value = '';
};

showList();
// Add function
add.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && add.value.length !== 0) {
    const storedList = localStorage.getItem('todo');

    if (storedList === null) {
      todoList = [];
    } else {
      todoList = JSON.parse(storedList);
      index = todoList.length === 0 ? 0 : todoList.length;
    }

    const LocalStore = {
      index,
      description: add.value,
      completed,
    };
    todoList.push(LocalStore);
    localStorage.setItem('todo', JSON.stringify(todoList));
    showList();
  }
});

// Call data from local storage
window.onload = () => {
  if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
  }
  showList();
};

// edit todolist
window.editFunc = (index) => {
  const edit = document.getElementById(`edit${index}`);
  const save = document.getElementById(`save${index}`);

  save.style.display = 'flex';
  edit.style.display = 'none';
  const mainItem = document.getElementById(`item${index}`);
  mainItem.removeAttribute('readonly');
  const { length } = mainItem.value;
  mainItem.setSelectionRange(length, length);
  mainItem.focus();
  return mainItem;
};

// Save function after editing
window.saveFunc = (index) => {
  const edit = document.getElementById(`edit${index}`);
  const save = document.getElementById(`save${index}`);

  save.style.display = 'none';
  edit.style.display = 'flex';

  const mainItem = document.getElementById(`item${index}`);
  const storedData = localStorage.getItem('todo');
  todoList = JSON.parse(storedData);
  todoList[index].description = mainItem.value;

  localStorage.setItem('todo-list', JSON.stringify(todoList));
  showList();
};
