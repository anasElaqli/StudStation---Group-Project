document.addEventListener("DOMContentLoaded", function() {
    const addTodoForm = document.getElementById("add-todo-form");
    const incompletedTodoTable = document.getElementById("incompleted-todos");
    const completedTodoTable = document.getElementById("completed-todos");
  
    addTodoForm.addEventListener("submit", function(event) {
      event.preventDefault(); 
      addTodo();
    });
  
    function addTodo() {
      const todoName = document.getElementById("todo-name").value;
      const todoCategory = document.getElementById("todo-category").value;
      const todoPriority = document.getElementById("todo-priority").value;
  
  
      const newRow = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.innerText = todoName;
      newRow.appendChild(nameCell);
  
      const categoryCell = document.createElement("td");
      categoryCell.innerText = todoCategory;
      newRow.appendChild(categoryCell);
  
      const priorityCell = document.createElement("td");
      priorityCell.innerText = todoPriority;
      newRow.appendChild(priorityCell);
  
      const completedCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("click", moveCompletedTask);
  
      completedCell.appendChild(checkbox);
      newRow.appendChild(completedCell);
  
      incompletedTodoTable.appendChild(newRow);
    }
    function moveCompletedTask() {
      const checkbox = this;
      const row = checkbox.parentNode.parentNode; 
      const table = row.parentNode; 
    
      console.log(row, table);
    
      if (table.id === "incompleted-todos") {

        completedTodoTable.appendChild(row);
        checkbox.remove();
      }
    }
  });
  