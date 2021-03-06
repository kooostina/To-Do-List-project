// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filtered-todos');
const completedButton = document.querySelector('.completed')

// LISTENERS
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);
document.addEventListener('DOMContentLoaded', getToDos);

// FUNCTIONS
function addToDo(event) {
  // Stop the default form submitting
  event.preventDefault();

  // Add a todo to local storage
  const newTodoData = initTodo(todoInput.value);
  saveLocalTodos(newTodoData);
  renderTodo(newTodoData);

  // Clear the input
  todoInput.value = "";
}

function initTodo(title, isCompleted = false) {
  return {
    id: Date.now(),
    title: title,
    isCompleted: isCompleted
  }
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  // Delete button
  if (item.classList[0] === 'trash-btn') {
    // Animation of removing
    todo.classList.add('fall');
    removeLocalTodos(todo);

    // Actually removing the item
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // Complete button
  if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
    const todoId = todo.getAttribute('id');
    saveCompletedTodo(todoId);
  }
}

function filterToDo(e) {
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
        };
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        };
        break;
    }
  })
}


function saveLocalTodos(todo) {
  let todos = getLocalTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function saveCompletedTodo(todoId) {
  let todos = getLocalTodos();
  const idx = todos.findIndex(todo => +todo.id === +todoId);

  if (idx >= 0) {
    todos[idx].isCompleted = !todos[idx].isCompleted;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function getLocalTodos() {
  let todos;
  const isNoTodos = localStorage.getItem('todos') === null;

  if (isNoTodos) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  return todos;
}

function renderTodo(todo) {
  // Create a LI
  const toDoDiv = document.createElement('li');
  toDoDiv.classList.add('todo');
  toDoDiv.setAttribute('id', todo.id);

  // Create a DIV
  const newToDo = document.createElement('div');
  newToDo.innerText = todo.title;
  newToDo.classList.add('todo-item');
  toDoDiv.appendChild(newToDo);

  // Complete button
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  toDoDiv.appendChild(completeButton);

  if (todo.isCompleted) {
    toDoDiv.classList.add('completed');
  }

  // Delete button
  const trashButton = document.createElement('button');
  trashButton.classList.add('trash-btn');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  toDoDiv.appendChild(trashButton);

  // Append Div to the list
  todoList.appendChild(toDoDiv);
}

function getToDos() {
  let todos = getLocalTodos();
  todos.forEach((todo) => renderTodo(todo));
}

function removeLocalTodos(todo) {
  let todos = getLocalTodos();

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}