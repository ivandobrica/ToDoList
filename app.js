const input = document.querySelector(".form__input");
const addBtn = document.querySelector(".form__button");
const todoList = document.querySelector(".todo__list");
const todoFilter = document.querySelector(".select__filter");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
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
  //save todos in localStorage
  saveLocalStorage(input.value);

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
  todoList.appendChild(todoDiv);
  input.value = "";
}

//check which button is clicked
function checkDelete(e) {
  const item = e.target;
  //complete button
  if (item.classList.contains("complete__button")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  //delete button
  if (item.classList.contains("delete__button")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteLocalStorage(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
}

//filter todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
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

//save todos to localStorage
function saveLocalStorage(todo) {
  let todos;
  //check if there are todos in LS, no => create, yes => get them
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//get existing todos from localStorage & show them on UI
function getTodos() {
  let todos;
  //check if there are todos in LS, no => create, yes => get them
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //create container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create todo item
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");
    todoItem.innerText = todo;
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

    //append to ul
    todoList.appendChild(todoDiv);
  });
}

//delete todo from localStorage
function deleteLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
