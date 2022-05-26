// import ItemManager from "./ItemManager.js";
// import Task from "./Task.js";

// // const inputBox = document.querySelector(".add-new-input");
// // const addTaskBtn = document.querySelector(".add-new-button");
// // const todoList = document.querySelector(".todo-list");
// // const pendingTasks = document.querySelector(".pending-tasks");

// const tasksManager = new ItemManager();

//This function returns a string of the current time and date.
// For each task I save a field of when it was added.


// inputBox.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     addTaskBtn.click();
//   }
// });

//This function adds a task to the list When addTaskBtn clicked.
// addTaskBtn.onclick = () => {
//   let userValue = inputBox.value;

//   //Input vlidation check.
//   if (userValue === "") {
//     alert("Please enter a valid input");
//   } else {
//     tasksManager.addItem(new Task(userValue, getNowTime(), false));

//     inputBox.value = "";
//     todoList.innerHTML = "";

//     showTasks();
//   }
// };

// function deleteTask() {
//   tasksManager.removeItem(this.parentElement.id);
//   todoList.innerHTML = "";
//   showTasks();
// }

// function taskClicked() {
//   alert(`you clicked on ${tasksManager.items[this.id].task}`);
// }

// function showTasks() {
//   tasksManager.items.forEach((value, index) => {
//     //Create all the html elements to be added to the list
//     const listItem = document.createElement("li");
//     const span = document.createElement("span");
//     const task = document.createElement("Text");
//     const deleteBtn = document.createElement("button");
//     const deleteIcon = document.createElement("ion-icon");

//     //Define a class for the elements we have created to get the required design
//     listItem.classList.add("todo-list-item");
//     deleteBtn.classList.add("delete-task-btn");

//     //Setting the id to be the index in the array.
//     //In this way the delete function will have access to the index.
//     task.id = index;
//     task.innerText = value.task;
//     deleteIcon.name = "trash-outline";

//     deleteBtn.onclick = deleteTask;
//     task.onclick = taskClicked;

//     //Building the elements tree hierarchically
//     deleteBtn.appendChild(deleteIcon);
//     span.appendChild(task);
//     span.appendChild(deleteBtn);
//     listItem.appendChild(span);
//     todoList.appendChild(listItem);
//   });

//   pendingTasks.innerText =
//     tasksManager.items.length == 0
//       ? `You don't have pending tasks`
//       : `You have a ${tasksManager.items.length} pending tasks`;
// }

// showTasks();