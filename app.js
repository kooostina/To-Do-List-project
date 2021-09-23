// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// LISTENERS
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);

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

function deleteCheck(e) {
  const item = e.target;

  // Delete button
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation of removing
    todo.classList.add('fall');

    // Actually removing the item
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });

  }

  // Complete button
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}