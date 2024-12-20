import {
  todoList,
  addNewTask,
  editTask,
  removeInProgress,
  toggleStaredTask,
  toggleDoneTask,
  getInProgressList,
  getCompletedList,
  updateHeaderQuantity,
  setSortBy,
  saveSortingOptionsToStorage,
  sortTask,
  updateSortBySelection,
} from "./list.js";
import { formateDueDate } from "./utilities/dayformat.js";

const newTaskButton = document.querySelector(".js-new-task-button");
const newTaskContainer = document.querySelector(".js-new-task-container");

newTaskButton.addEventListener("click", () => {
  newTaskContainer.classList.toggle("hide");
});

const newTaskForm = document.querySelector(".new-task-form");

newTaskForm.addEventListener("submit", (event) => {
  addNewTask();
  renderPage();
});

renderPage();

function renderPage() {
  let inProgressHTML = "";
  let completedHTML = "";

  let inProgressList = getInProgressList();
  let completedList = getCompletedList();

  sortTask(inProgressList, "inProgress");

  inProgressList.forEach((task) => {
    const dueDate = formateDueDate(task.dueDate);

    inProgressHTML += `
      <div class="todo-container ${task.star ? "stared-container" : ""}">
        <div class="todo-header">
          <div class="todo-info">
            <h3 class="todo-title">${task.title}</h3>
            <div class="todo-actions">
              <span class="size-18 material-symbols-outlined star-button js-star 
              ${task.star ? "stared-star" : ""}
              " data-id="${task.id}"> star </span>
              <span class="size-18 material-symbols-outlined js-edit"
              data-id="${task.id}"> edit </span>
              <span class="size-18 material-symbols-outlined js-delete" data-id="${
                task.id
              }"> delete </span>
            </div>
          </div>
          <p class="todo-date">${dueDate}</p>
          <p class="todo-description">${task.description}</p>
        </div>
          <div class="todo-footer">
            <div class="author-container">
              <span class="author">${task.author}</span>
            </div>
            <span class="done-marker js-done-marker material-symbols-outlined" 
            data-id="${task.id}">
              done_all
            </span>
          </div>
      </div>
    `;
  });

  document.querySelector(".js-in-progress-grid").innerHTML = inProgressHTML;

  completedList.forEach((task) => {
    const dueDate = formateDueDate(task.dueDate);

    completedHTML += `
      <div class="todo-container ${task.star ? "stared-container" : ""}">
        <div class="todo-header">
          <div class="todo-info">
            <h3 class="todo-title">${task.title}</h3>
            <div class="todo-actions">
              <span class="size-18 material-symbols-outlined star-button js-star 
              ${task.star ? "stared-star" : ""}
              " data-id="${task.id}"> star </span>
              <span class="size-18 material-symbols-outlined js-delete" data-id="${
                task.id
              }"> delete </span>
            </div>
          </div>
          <p class="todo-date">${dueDate}</p>
          <p class="todo-description">${task.description}</p>
        </div>
          <div class="todo-footer">
            <div class="author-container">
              <span class="author">${task.author}</span>
            </div>
            <span class="done-marker js-done-marker material-symbols-outlined active"
            data-id="${task.id}">
              done_all
            </span>
          </div>
      </div>
    `;
  });

  document.querySelector(".js-complete-grid").innerHTML = completedHTML;

  updateHeaderQuantity();
  updateSortBySelection();

  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      removeInProgress(id);
      renderPage();
    });
  });

  document.querySelectorAll(".js-star").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      toggleStaredTask(id);
      renderPage();
    });
  });

  document.querySelectorAll(".js-done-marker").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      toggleDoneTask(id);
      renderPage();
    });
  });

  document.querySelectorAll(".js-edit").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      editTask(id);
      renderPage();
    });
  });
}

//#region sorting

const inProgressSort = document.getElementById("in-progress-sort");

inProgressSort.addEventListener("change", (event) => {
  sortingListener(event, "inProgress");
});

const completedSort = document.getElementById("completed-sort");

completedSort.addEventListener("change", (event) => {
  sortingListener(event, "completed");
});

function sortingListener(event, listName) {
  const selectedOption = event.target.options[event.target.selectedIndex].value;
  setSortBy(selectedOption, listName);
  saveSortingOptionsToStorage();
  renderPage();
}
//#endregion
