export const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    id: "702cfb8f-fb84-4605-91c4-4f4746e1ce6e",
    title: "make dinner",
    description: "chicken",
    dueDate: "2024-11-26T11:00",
    author: "SI",
  },
  {
    id: "542aca79-85f7-4f49-8984-1b853c5acaaf",
    title: "do dishes",
    description: "empty it first",
    dueDate: "2024-11-26T11:00",
    author: "SI",
  },
  {
    id: "d971e0be-f071-486c-9271-23bdff6dc7dd",
    title: "open christmas calender",
    description: "sweets and scratch card",
    dueDate: "2024-12-01T11:00",
    author: "SI",
  },
];

export function saveTodoToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
