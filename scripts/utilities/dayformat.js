export function formateDueDate(date) {
  return dayjs(date).format("dddd, DD MMM YYYY HH:mm");
}
