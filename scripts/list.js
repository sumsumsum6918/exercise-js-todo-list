export const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    title: "make dinner",
    description: "chicken",
    dueDate: "2024-11-26T11:00",
    author: "SI",
  },
  {
    name: "do dishes",
    description: "empty it first",
    dueDate: "2024-11-26T11:00",
    author: "SI",
  },
  {
    name: "open christmas calender",
    description: "sweets and scratch card",
    dueDate: "2024-12-01T11:00",
    author: "SI",
  },
];

export function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
