// Select elements
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const taskList = document.getElementById("task-list");
const clearAll = document.getElementById("clear-all-btn");

// Add a new task
addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = newTaskInput.value.trim(); //→ gets the text the user typed in the input box,
    // and trims leading/trailing whitespaces

    if (taskText === "") return; // avoid empty tasks

    // Create elements
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-task-btn";
    deleteBtn.textContent = "Delete";

    // Append elements
    li.appendChild(checkbox); //→ adds the checkbox to the new task item
    li.appendChild(span);  //→ adds the task text to the new task item
    li.appendChild(deleteBtn); //→ adds the delete button to the new task item
    taskList.appendChild(li); //→ adds the new task item to the task list in the DOM

    updateTaskContainerVisibility(); // show container only when there's atleast one task item in container

    // Delete task
    deleteBtn.addEventListener("click", () => {
        li.remove(); //li is gone and all its children (checkbox, span, deleteBtn) are also removed from the DOM, 
        // ul no longer contains that li
        updateTaskContainerVisibility(); // show container only when there's atleast one task item in container
    });
    // IMPORTANT: THIS ABOVE FUNCTION CANNOT EXIST OUTSIDE THIS addTask() function 
    // cuz the variables that it uses(li & deleteBtn) are created in this function 
    // and they wont exist anywhere else outside, they're not global variables

    // Checked tasks will look different, as in crossed out and faded
    checkbox.addEventListener("change", () => {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
        span.style.opacity = checkbox.checked ? "0.6" : "1";
    });

    // Clear input
    newTaskInput.value = "";
}

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox");
        if (checkbox.checked) {
            task.remove();
        }
    });

    updateTaskContainerVisibility(); // show container only when there's atleast one task item in container
});

clearAll.addEventListener("click", () => {
    taskList.innerHTML = "";
    updateTaskContainerVisibility();
});

function updateTaskContainerVisibility() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.style.display = (taskList.children.length > 0) ? "block" : "none";
}