export function formatTk(amount) {
  return `Tk ${Number(amount || 0).toLocaleString("en-BD")}`;
}

export function orderStatusLabel(status) {
  return String(status || "PENDING")
    .toLowerCase()
    .replace("_", " ");
}
