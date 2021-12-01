const input = document.querySelector(".form__input");
const addBtn = document.querySelector(".form__button");
const todoList = document.querySelector(".todo__list");
const todoFilter = document.querySelector(".select__filter");

//event listeners
addBtn.addEventListener("click", createTodo);
todoList.addEventListener("click", checkDelete);
todoFilter.addEventListener("click", filterTodo);

//create todo items
function createTodo(e) {
  e.preventDefault();

  //create container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create todo item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo__item");
  todoItem.innerText = input.value;
  //append item to container
  todoDiv.appendChild(todoItem);

  //create complete button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = `<i class ="fas fa-check"></i>`;
  completeBtn.classList.add("complete__button");
  todoDiv.appendChild(completeBtn);

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.classList.add("delete__button");
  todoDiv.appendChild(deleteBtn);

  //reset value and append to ul
  input.value = "";
  todoList.appendChild(todoDiv);
}

function checkDelete(e) {
  const item = e.target;
  if (item.classList.contains("complete__button")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  if (item.classList.contains("delete__button")) {
    const todo = item.parentElement;
    todo.remove();
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
