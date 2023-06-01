document.addEventListener("DOMContentLoaded", function () {
  /*Call the initialize app function when dom content has been loaded (as soon as DOM can fully manipulated)
  The initielizeApp function creates all the elements 
  This was done with a single html file in mind like in class, where content was dynamically changed,
  with the user able to choose an application by clicking a button (which would've loaded this initializeApp function)*/
  initializeApp();
});
function initializeApp() {
  //Create app
  const appElem = document.getElementById("app");

  //Creating elements
  const todoHeader = document.createElement("h1");

  //Adding text to elements
  todoHeader.textContent = "To do list";

  const notCompleteSubHeader = document.createElement("h2");
  notCompleteSubHeader.textContent = "Not completed";

  const notCompleteTable = document.createElement("table");

  //Adding classes to elements
  notCompleteTable.className = "table";

  //Setting attributes to elements
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

  //Appending elements to their parent element
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
  completeTable.className = "table";
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

  //Prevent the default behaviour of the form submit, and instead call the addTodo function on submit
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  const nameDiv = document.createElement("div");
  nameDiv.className = "form-group";

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "todo-name");
  nameLabel.textContent = "Name:";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "todo-name");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("required", "");
  nameInput.className = "form-control";

  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "form-group";

  const categoryLabel = document.createElement("label");
  categoryLabel.setAttribute("for", "todo-category");
  categoryLabel.textContent = "Category:";

  const categoryInput = document.createElement("select");
  categoryInput.setAttribute("id", "todo-category");
  categoryInput.setAttribute("name", "category");
  categoryInput.setAttribute("required", "");
  categoryInput.className = "form-control";

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
  priorityDiv.className = "form-group";

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "todo-priority");
  priorityLabel.textContent = "Priority:";

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "todo-priority");
  priorityInput.setAttribute("name", "priority");
  priorityInput.setAttribute("required", "");
  priorityInput.className = "form-control";

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
  submitButton.className = "btn btn-primary";
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
  //Finding the incompletedTodoTable lement and its body element
  const incompletedTodoTable = document.getElementById("incomplete-todos");
  const incompletedTodoTableBody =
    incompletedTodoTable.getElementsByTagName("tbody")[0];

  //Retrieving the new todo name, category and priority from the form
  const todoName = document.getElementById("todo-name");
  const todoCategory = document.getElementById("todo-category");
  const todoPriority = document.getElementById("todo-priority");

  //Creating a new row
  const newRow = document.createElement("tr");

  //Creating cells for name, category and priority and a checkbox
  const nameCell = document.createElement("td");
  nameCell.innerText = todoName.value;

  const categoryCell = document.createElement("td");
  categoryCell.innerText = todoCategory.value;

  const priorityCell = document.createElement("td");
  priorityCell.innerText = todoPriority.value;
  priorityCell.className = todoPriority.value;

  //When priortiy is clicked, call the loadPrioritySelect function
  priorityCell.addEventListener("click", loadPrioritySelect);

  const completedCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  //When checkbox is clicked, call the moveCompletedTask function
  checkbox.addEventListener("click", moveCompletedTask);

  //Append the checkbox to the cell
  completedCell.appendChild(checkbox);

  //Append the cells to the row
  newRow.appendChild(nameCell);
  newRow.appendChild(categoryCell);
  newRow.appendChild(priorityCell);
  newRow.appendChild(completedCell);

  //Add the row to the table body
  incompletedTodoTableBody.appendChild(newRow);

  //Reset the form values
  todoName.value = "";
  todoCategory.value = "";
  todoPriority.value = "";

  //Call the function to sort the tasks
  sortByPriority();
}

function moveCompletedTask() {
  //Find the completed todos table
  const completedTodoTable = document.getElementById("completed-todos");

  //Find the row that belongs to the checkbox that has been clicked
  const row = this.parentNode.parentNode;

  //Move the row to the completed todos table, and remove the checkbox from it
  completedTodoTable.appendChild(row);
  this.parentNode.remove();
}

function sortByPriority() {
  //Find the incomplete todos table, its body and then its rows
  const incompletedTodoTable = document.getElementById("incomplete-todos");
  const tbody = incompletedTodoTable.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort(function (a, b) {
    //Find the priority cells
    const priorityA = a.cells[2].textContent;
    const priorityB = b.cells[2].textContent;

    //Define the order of priorities
    const priorityOrder = {
      High: 0,
      Medium: 1,
      Low: 2
    };

    //Sort by priority
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  //Remove the old rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  //Add the new (sorted) rows
  for (const row of rows) {
    tbody.appendChild(row);
  }
}

function loadPrioritySelect() {
  //Create the form and add even listener that calls the changePriority function when select option is changed
  const priorityForm = document.createElement("select");
  priorityForm.addEventListener("change", changePriority);

  //Create option elements for low, medium and high, and make the current value selected
  const optionLow = document.createElement("option");
  optionLow.setAttribute("value", "Low");
  optionLow.textContent = "Low";
  if (this.textContent === "Low") {
    optionLow.selected = true;
  }

  const optionMedium = document.createElement("option");
  optionMedium.setAttribute("value", "Medium");
  optionMedium.textContent = "Medium";
  if (this.textContent === "Medium") {
    optionMedium.selected = true;
  }

  const optionHigh = document.createElement("option");
  optionHigh.setAttribute("value", "High");
  optionHigh.textContent = "High";
  if (this.textContent === "High") {
    optionHigh.selected = true;
  }

  //Remove current text content from the cell
  this.textContent = "";

  //Append the options to the select
  priorityForm.appendChild(optionLow);
  priorityForm.appendChild(optionMedium);
  priorityForm.appendChild(optionHigh);

  //Appedn the select to the cell
  this.appendChild(priorityForm);

  //Remove the current event listener
  this.removeEventListener("click", loadPrioritySelect);
}

function changePriority() {
  //Find the cell and store the new value of the priority
  const parentCell = this.parentNode;
  const newPriority = this.value;

  //Remove the form
  while (parentCell.firstChild) {
    parentCell.removeChild(parentCell.firstChild);
  }

  //Set new classname and text for the new priority level, and add the event listener for loading the priority changer
  parentCell.className = newPriority;
  parentCell.textContent = newPriority;

  parentCell.addEventListener("click", loadPrioritySelect);

  //Call the function for sorting the todos by priority
  sortByPriority();
}
