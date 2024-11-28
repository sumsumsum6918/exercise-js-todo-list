import {
  todoList,
  saveTodoToStorage,
  removeInProgress,
  staredTask,
} from "./list.js";
//localStorage.clear();
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
    title: titleInputElement,
    description: descriptionInputElement,
    dueDate: dateTimeElement,
    author: initialsInputElement.toUpperCase(),
    star: false,
  };

  todoList.push(newTask);
  saveTodoToStorage();
  console.log(todoList);

  renderInProgressGrid();
}

newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTask();
});

renderInProgressGrid();

function renderInProgressGrid() {
  let inProgressHTML = "";

  todoList.sort((a, b) => b.star - a.star);

  todoList.forEach((task) => {
    const dueDate = dayjs(task.dueDate).format("dddd, DD MMM YYYY HH:mm");

    inProgressHTML += `
      <div class="todo-container">
        <div class="todo-header">
          <div class="todo-info">
            <h3 class="todo-title">${task.title}</h3>
            <div class="todo-actions">
              <span class="size-18 material-symbols-outlined star-button js-star 
              ${task.star ? "stared-star" : ""}
              " data-id="${task.id}"> star </span>
              <span class="size-18 material-symbols-outlined"> edit </span>
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
            <span class="done-marker material-symbols-outlined">
              done_all
            </span>
          </div>
      </div>
    `;
  });

  document.querySelector(".js-in-progress-grid").innerHTML = inProgressHTML;

  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      removeInProgress(id);
      renderInProgressGrid();
    });
  });

  document.querySelectorAll(".js-star").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      staredTask(id);
      renderInProgressGrid();
    });
  });
}
