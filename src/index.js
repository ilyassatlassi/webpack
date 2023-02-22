import './style.css';

const list = document.getElementById('listtodo');

const todoList = [
  {
    index: 0,
    description: 'wash the dishes',
    completed: false,
  },
  {
    index: 1,
    description: 'wash the dishes',
    completed: false,
  },
];

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
                                  <i id="removeicon"  class="fa-solid fa-trash"></i>
                                  </div>
                          </li>`;
  });
  list.innerHTML = listItems;
};

showList();