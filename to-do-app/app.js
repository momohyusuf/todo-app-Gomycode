// element declaration
const todoInput = document.querySelector("#todo--input");
const creatTaskButton = document.querySelector("#create--todo");
const editTaskButton = document.querySelector("#save--edit--task");
const displayTodoTasks = document.querySelector("#todo--tasks");
const taskTime = document.querySelector("#task--time");

let todoTasks = [];
let editingTask;

// perform these functions while the page is loading
document.addEventListener("DOMContentLoaded", () => {
  if (!editingTask) {
    editTaskButton.style.display = "none";
  }

  //   get the tasks from the local storage if theres anything there
  todoTasks = JSON.parse(localStorage.getItem("task"));
  displayTodoTasks.innerHTML = todoTasks
    .map((item) => createNewTaskDiv(item))
    .join("");
});

// create a fuction and connect it to the create task button
creatTaskButton.addEventListener("click", (event) => {
  event.preventDefault();
  // add a new task to the array everytime a user create a new task
  // create a task object
  let task = {
    id: Math.random(),
    text: todoInput.value.trim(),
    date: taskTime.value,
  };
  todoTasks.unshift(task);
  //   display the todo tasks

  //   save tasks to local storage
  saveTaskToLocalStorage(todoTasks);

  displayTodoTasks.innerHTML = todoTasks
    .map((item) => createNewTaskDiv(item))
    .join("");
  // set the input field back to empty
  todoInput.value = "";
});

// button to edit task
editTaskButton.addEventListener("click", saveEditTask);

// a function to delete task
function deleteTask(id) {
  todoTasks = todoTasks.filter((item) => item.id !== id);
  saveTaskToLocalStorage(todoTasks);

  //   display the todo tasks
  displayTodoTasks.innerHTML = todoTasks
    .map((item) => createNewTaskDiv(item))
    .join("");
}

// find the task to edit
function editTask(id) {
  editingTask = todoTasks.find((item) => item.id === id);
  if (editingTask) {
    editTaskButton.style.display = "inline-block";
    creatTaskButton.style.display = "none";
  }
  todoInput.value = editingTask.text;
}

// save the edited  task
function saveEditTask(event) {
  event.preventDefault();
  editingTask.text = todoInput.value;

  saveTaskToLocalStorage(todoTasks);
  displayTodoTasks.innerHTML = todoTasks
    .map((item) => createNewTaskDiv(item))
    .join("");

  if (editingTask) {
    editTaskButton.style.display = "none";
    creatTaskButton.style.display = "inline-block";
  }
  todoInput.value = "";
}

// helper functions
function createNewTaskDiv(params) {
  return `<div><span>${params.text}${params.date}</span> <button onclick=deleteTask(${params.id}) >delete task</button>
  <button onclick=editTask(${params.id}) >edit task</button>
  </div>`;
}

function saveTaskToLocalStorage(params) {
  return localStorage.setItem("task", JSON.stringify(params));
}
