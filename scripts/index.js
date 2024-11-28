import { todoList, saveToStorage } from "./list.js";

const newTaskForm = document.querySelector(".new-task-form");

function addNewTask() {
  const titleInputElement = document.getElementById("task-title").value;
  const descriptionInputElement =
    document.getElementById("task-description").value;
  const dateTimeElement = document.getElementById("task-date").value;
  const initialsInputElement = document.getElementById("task-author").value;

  const newTask = {
    name: titleInputElement,
    description: descriptionInputElement,
    dueDate: dateTimeElement,
    author: initialsInputElement,
  };

  todoList.push(newTask);
  saveToStorage();
  console.log(todoList);
}

newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTask();
});

function render() {}
