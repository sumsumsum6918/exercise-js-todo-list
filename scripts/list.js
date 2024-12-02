export let todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    id: "702cfb8f-fb84-4605-91c4-4f4746e1ce6e",
    title: "make dinner",
    description: "chicken",
    dueDate: "2024-11-26T11:00",
    author: "SI",
    star: false,
    complete: false,
  },
  {
    id: "542aca79-85f7-4f49-8984-1b853c5acaaf",
    title: "do dishes",
    description: "empty it first",
    dueDate: "2024-11-26T11:00",
    author: "SI",
    star: false,
    complete: false,
  },
  {
    id: "d971e0be-f071-486c-9271-23bdff6dc7dd",
    title: "open christmas calender",
    description: "sweets and scratch card",
    dueDate: "2024-12-01T11:00",
    author: "SI",
    star: false,
    complete: true,
  },
];

export function saveTodoToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

export function addNewTask() {
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
    complete: false,
  };

  todoList.push(newTask);
  saveTodoToStorage();
}

export function removeInProgress(id) {
  todoList = todoList.filter((task) => task.id !== id);
  saveTodoToStorage();
}
export function updateHeaderQuantity() {
  const inProgressElement = document.getElementById("in-progress-quantity");
  const completedElement = document.getElementById("completed-quantity");

  let inProgressList = getInProgressList();
  let completedList = getCompletedList();

  inProgressElement.innerHTML = inProgressList.length;
  completedElement.innerHTML = completedList.length;
}
export function toggleStaredTask(id) {
  const staredTask = todoList.find((task) => task.id === id);
  staredTask.star = !staredTask.star;

  saveTodoToStorage();
}
export function toggleDoneTask(id) {
  const doneTask = todoList.find((task) => task.id === id);
  doneTask.complete = !doneTask.complete;
  saveTodoToStorage();
}
export function getInProgressList() {
  return todoList.filter((task) => !task.complete);
}

export function getCompletedList() {
  return todoList.filter((task) => task.complete);
}
export function setSortBy(selectedOption, list) {
  sortingOptions[list].sortBy = selectedOption;
}
export function sortTask(listArray, listName) {
  if (!sortingOptions[listName].sortBy) return;
  listArray.sort((a, b) => {
    if (a.star && !b.star) {
      return -1;
    }
    if (b.star && !a.star) {
      return 1;
    }
    if (sortingOptions[listName].sortBy === "date") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    return b[sortingOptions[listName].sortBy].localeCompare(
      a[sortingOptions[listName].sortBy]
    );
  });
}
export const sortingOptions = JSON.parse(
  localStorage.getItem("sortingOptions")
) || {
  inProgress: {
    sortBy: "",
    order: "desc",
  },
  completed: {
    sortBy: "",
    order: "desc",
  },
};
export function saveSortingOptionsToStorage() {
  localStorage.setItem("sortingOptions", JSON.stringify(sortingOptions));
}

export function updateSortBySelection() {
  const inProgressSort = document.getElementById("in-progress-sort");
  const completedSort = document.getElementById("completed-sort");

  const inProgressOptions = inProgressSort.options;
  const completedOptions = completedSort.options;

  setSeletedOption(inProgressOptions, "inProgress");
  setSeletedOption(completedOptions, "completed");
}

function setSeletedOption(list, listName) {
  for (let i = 0; i < list.length; i++) {
    list[i].removeAttribute("selected");
    if (list[i].value === sortingOptions[listName].sortBy) {
      list[i].setAttribute("selected", "selected");
    }
  }
}

export function editTask(id) {
  const targetTask = todoList.find((task) => task.id === id);
  const formContainer = document.querySelector(".js-edit-task-container");
  if (formContainer.classList.contains("hide")) {
    formContainer.classList.remove("hide");
  }
  document.getElementById("edit-task-title").value = targetTask.title;
  document.getElementById("edit-task-description").value =
    targetTask.description;
  document.getElementById("edit-task-date").value = targetTask.dueDate;
  document.getElementById("edit-task-author").value = targetTask.author;

  document
    .querySelector(".edit-task-form")
    .addEventListener("submit", (event) => {
      targetTask.title = document.getElementById("edit-task-title").value;

      targetTask.description = document.getElementById(
        "edit-task-description"
      ).value;
      targetTask.dueDate = document.getElementById("edit-task-date").value;
      targetTask.author = document.getElementById("edit-task-author").value;
      saveTodoToStorage();
    });
}
