import { todoList, saveTodoToStorage } from "./list.js";
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

  todoList.forEach((task) => {
    const dueDate = dayjs(task.dueDate).format("dddd, DD MMM YYYY HH:mm");

    inProgressHTML += `
      <div class="todo-container">
        <div class="todo-header">
          <div class="todo-info">
            <h3 class="todo-title">${task.title}</h3>
            <div class="todo-actions">
              <span class="size-18 material-symbols-outlined"> edit </span>
              <span class="size-18 material-symbols-outlined"> delete </span>
              <span class="size-18 material-symbols-outlined">
                drag_indicator
              </span>
            </div>
          </div>
          <p class="todo-date">${dueDate}</p>
          <p class="todo-description">${task.description}</p>
        </div>
          <div class="todo-footer">
            <div class="author-container">
              <div class="author">${task.author}</div>
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
