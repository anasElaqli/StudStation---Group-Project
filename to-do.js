document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});
function initializeApp() {
  //Create app
  const appElem = document.getElementById("app");

  const todoHeader = document.createElement("h1");
  todoHeader.textContent = "Todo list";

  const notCompleteSubHeader = document.createElement("h2");
  notCompleteSubHeader.textContent = "Not completed";

  const notCompleteTable = document.createElement("table");
  notCompleteTable.classList.add("table");
  notCompleteTable.setAttribute("id", "incomplete-todos");

  const notCompleteTableHead = document.createElement("thead");
  const notCompleteTableHeadRow = document.createElement("tr");

  const notCompleteTableHeadRow1 = document.createElement("th");
  notCompleteTableHeadRow1.textContent = "Name";

  const notCompleteTableHeadRow2 = document.createElement("th");
  notCompleteTableHeadRow2.textContent = "Category";

  const notCompleteTableHeadRow3 = document.createElement("th");
  notCompleteTableHeadRow3.textContent = "Priority";

  const notCompleteTableHeadRow4 = document.createElement("th");
  notCompleteTableHeadRow4.textContent = "Mark as completed";

  notCompleteTableHeadRow.appendChild(notCompleteTableHeadRow1);
  notCompleteTableHeadRow.appendChild(notCompleteTableHeadRow2);
  notCompleteTableHeadRow.appendChild(notCompleteTableHeadRow3);
  notCompleteTableHeadRow.appendChild(notCompleteTableHeadRow4);

  notCompleteTableHead.appendChild(notCompleteTableHeadRow);

  const notCompleteTableBody = document.createElement("tbody");

  notCompleteTable.appendChild(notCompleteTableHead);
  notCompleteTable.appendChild(notCompleteTableBody);

  const completeSubHeader = document.createElement("h2");
  completeSubHeader.textContent = "Completed";

  const completeTable = document.createElement("table");
  completeTable.classList.add("table");
  completeTable.setAttribute("id", "completed-todos");

  const completeTableHead = document.createElement("thead");
  const completeTableHeadRow = document.createElement("tr");

  const completeTableHeadRow1 = document.createElement("th");
  completeTableHeadRow1.textContent = "Name";

  const completeTableHeadRow2 = document.createElement("th");
  completeTableHeadRow2.textContent = "Category";

  const completeTableHeadRow3 = document.createElement("th");
  completeTableHeadRow3.textContent = "Priority";

  completeTableHeadRow.appendChild(completeTableHeadRow1);
  completeTableHeadRow.appendChild(completeTableHeadRow2);
  completeTableHeadRow.appendChild(completeTableHeadRow3);

  completeTableHead.appendChild(completeTableHeadRow);

  const completeTableBody = document.createElement("tbody");

  completeTable.appendChild(completeTableHead);
  completeTable.appendChild(completeTableBody);

  const todoForm = document.createElement("form");
  todoForm.setAttribute("id", "add-todo-form");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("form-group");

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "todo-name");
  nameLabel.textContent = "Name:";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "todo-name");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("required", "");
  nameInput.classList.add("form-control");

  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("form-group");

  const categoryLabel = document.createElement("label");
  categoryLabel.setAttribute("for", "todo-category");
  categoryLabel.textContent = "Category:";

  const categoryInput = document.createElement("select");
  categoryInput.setAttribute("id", "todo-category");
  categoryInput.setAttribute("name", "category");
  categoryInput.setAttribute("required", "");
  categoryInput.classList.add("form-control");

  const categoryOption1 = document.createElement("option");
  categoryOption1.setAttribute("value", "");
  categoryOption1.textContent = "Select a category";

  const categoryOption2 = document.createElement("option");
  categoryOption2.setAttribute("value", "Homework");
  categoryOption2.textContent = "Homework";

  const categoryOption3 = document.createElement("option");
  categoryOption3.setAttribute("value", "Project");
  categoryOption3.textContent = "Project";

  const categoryOption4 = document.createElement("option");
  categoryOption4.setAttribute("value", "Exam");
  categoryOption4.textContent = "Exam";

  categoryInput.appendChild(categoryOption1);
  categoryInput.appendChild(categoryOption2);
  categoryInput.appendChild(categoryOption3);
  categoryInput.appendChild(categoryOption4);

  categoryDiv.appendChild(categoryLabel);
  categoryDiv.appendChild(categoryInput);

  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("form-group");

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "todo-priority");
  priorityLabel.textContent = "Priority:";

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "todo-priority");
  priorityInput.setAttribute("name", "priority");
  priorityInput.setAttribute("required", "");
  priorityInput.classList.add("form-control");

  const priorityOption1 = document.createElement("option");
  priorityOption1.setAttribute("value", "");
  priorityOption1.textContent = "Select a priority";

  const priorityOption2 = document.createElement("option");
  priorityOption2.setAttribute("value", "Low");
  priorityOption2.textContent = "Low";

  const priorityOption3 = document.createElement("option");
  priorityOption3.setAttribute("value", "Medium");
  priorityOption3.textContent = "Medium";

  const priorityOption4 = document.createElement("option");
  priorityOption4.setAttribute("value", "High");
  priorityOption4.textContent = "High";

  priorityInput.appendChild(priorityOption1);
  priorityInput.appendChild(priorityOption2);
  priorityInput.appendChild(priorityOption3);
  priorityInput.appendChild(priorityOption4);

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(priorityInput);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn");
  submitButton.classList.add("btn-primary");
  submitButton.textContent = "Add";

  todoForm.appendChild(nameDiv);
  todoForm.appendChild(categoryDiv);
  todoForm.appendChild(priorityDiv);
  todoForm.appendChild(submitButton);

  appElem.appendChild(todoHeader);
  appElem.appendChild(notCompleteSubHeader);
  appElem.appendChild(notCompleteTable);
  appElem.appendChild(completeSubHeader);
  appElem.appendChild(completeTable);
  appElem.appendChild(todoForm);
}
function addTodo() {
  const incompletedTodoTable = document.getElementById("incomplete-todos");
  const incompletedTodoTableBody =
    incompletedTodoTable.getElementsByTagName("tbody")[0];
  const todoName = document.getElementById("todo-name");
  const todoCategory = document.getElementById("todo-category");
  const todoPriority = document.getElementById("todo-priority");

  const newRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.innerText = todoName.value;
  newRow.appendChild(nameCell);

  const categoryCell = document.createElement("td");
  categoryCell.innerText = todoCategory.value;
  newRow.appendChild(categoryCell);

  const priorityCell = document.createElement("td");
  priorityCell.innerText = todoPriority.value;
  newRow.appendChild(priorityCell);

  const completedCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", moveCompletedTask);

  completedCell.appendChild(checkbox);
  newRow.appendChild(completedCell);

  incompletedTodoTableBody.appendChild(newRow);

  todoName.value = "";
  todoCategory.value = "";
  todoPriority.value = "";

  sortByPriority();
}
function moveCompletedTask() {
  const completedTodoTable = document.getElementById("completed-todos");
  const checkbox = this;
  const row = checkbox.parentNode.parentNode;
  const table = row.parentNode;

  //console.log(row, table);

  //if (table.id === "incomplete-todos") {

  completedTodoTable.appendChild(row);
  checkbox.remove();
  //}
}
function sortByPriority() {
  const incompletedTodoTable = document.getElementById("incomplete-todos");
  const tbody = incompletedTodoTable.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort(function (a, b) {
    const priorityA = a.cells[2].textContent;
    const priorityB = b.cells[2].textContent;

    // Definieer de prioriteitsvolgorde
    const priorityOrder = {
      High: 0,
      Medium: 1,
      Low: 2,
    };

    // Vergelijk de prioriteit van de todos
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  // Verwijder de bestaande rijen
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Voeg de gesorteerde rijen toe aan de tabel
  for (const row of rows) {
    tbody.appendChild(row);
  }
}
