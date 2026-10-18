let tasksForm = document.getElementById("tasksForm");
let tasksInput = document.getElementById("tasksInput");
let items = document.getElementById("items");
tasksInput.focus();
tasksForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createItem(tasksInput.value);
});
function createItem(tasksInputValue) {
  let itemHTML = `<div class="item"><span>${tasksInputValue}</span> <button onclick="deleteItem(this)">Delete</button></div>`;
  items.insertAdjacentHTML("beforeend", itemHTML);
  tasksInput.value = "";
  tasksInput.focus();
}

function deleteItem(thisItem) {
  thisItem.parentElement.remove();
}
