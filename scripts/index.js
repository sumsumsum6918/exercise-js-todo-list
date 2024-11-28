import { todoList, saveToStorage } from "./list.js";

const newTaskForm = document.querySelector(".new-task-form");

function addNewTask() {
  const titleInputElement = document.getElementById("task-title").value;
  const descriptionInputElement =
    document.getElementById("task-description").value;
  const dateTimeElement = document.getElementById("task-date").value;
  const initialsInputElement = document.getElementById("task-author").value;

  const newUUID = uuid.v4();

  const newTask = {
    id: newUUID,
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

renderInProgressGrid();

function renderInProgressGrid() {
  let inProgressHTML = "";

  todoList.forEach((task) => {
    inProgressHTML += `
      <div class="todo-container">
          <div class="todo-header">
            <h3 class="todo-title">Feed Pokemon</h3>
            <div class="todo-actions">
              <span class="size-18 material-symbols-outlined"> edit </span>
              <span class="size-18 material-symbols-outlined"> delete </span>
              <span class="size-18 material-symbols-outlined">
                drag_indicator
              </span>
            </div>
          </div>
          <p class="todo-date">Saturday, 02 December 10:00</p>
          <p class="todo-description">Make breakfast</p>
          <div class="todo-footer">
            <div class="author-container">
              <div class="author">SF</div>
            </div>
            <span class="done-marker material-symbols-outlined">
              done_all
            </span>
          </div>
        </div>
    `;
  });

  document.querySelector(".js-in-progress-grid").innerHTML = inProgressHTML;
}
