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
  // Create a DIV
  const toDoDiv = document.createElement('div');
  toDoDiv.classList.add('todo');
  // Create a Li
  const newToDo = document.createElement('li');
  newToDo.innerText = todoInput.value;
  newToDo.classList.add('todo-item');
  toDoDiv.appendChild(newToDo);
  // Add a todo to local storage
  saveLocalTodos(todoInput.value);
  // Check button
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  toDoDiv.appendChild(completeButton);
  // Trash button
  const trashButton = document.createElement('button');
  trashButton.classList.add('trash-btn');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  toDoDiv.appendChild(trashButton);
  // Append Div to the list
  todoList.appendChild(toDoDiv);
  // Clear the input
  todoInput.value = "";
}

function initTodo() {
  
}

function deleteCheck(e) {
  const item = e.target;

  // Delete button
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
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
    const todo = item.parentElement;
    todo.classList.toggle('completed');
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

// function saveCompletedTodos(todo) {
//   let todos = getLocalTodos();

//   todos.push(todo);
//   localStorage.setItem('complete-btn', JSON.stringify(todos));
// }

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
  // Create a DIV
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');
    // Create a Li
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    // Check button
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    toDoDiv.appendChild(completeButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    toDoDiv.appendChild(trashButton);
    // Append Div to the list
    todoList.appendChild(toDoDiv);
}


function getToDos() {
  let todos = getLocalTodos();
  console.log(todos);

  todos.forEach((todo) => renderTodo(todo));
}


function removeLocalTodos(todo) {
  let todos = getLocalTodos();

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}