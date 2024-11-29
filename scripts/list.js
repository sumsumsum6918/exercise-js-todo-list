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
export function updateHeaderQuantity(section) {
  if (section === "in-progress") {
    const element = document.getElementById("in-progress-quantity");
  } else if (section === "completed") {
    const element = document.getElementById("completed-quantity");
  } else return "quantity";
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
