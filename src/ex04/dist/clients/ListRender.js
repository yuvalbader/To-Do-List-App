export default class ListRender {
  constructor(manager) {
    this.manager = manager;
    this.todoList = document.querySelector(".todo-list");
    this.pendingTasks = document.querySelector(".pending-tasks");
  }

  renderList(listToRender) {
    this.todoList.innerHTML = "";
    listToRender.map((value, index) => {
      const listItem = this.renderListItem(value, index);
      this.todoList.appendChild(listItem);
    });

    this.pendingTasks.innerText =
      listToRender.length == 0
        ? `You don't have pending tasks`
        : `You have ${listToRender.length} pending tasks`;
  }

  async taskClicked(index) {
    const tasks = await this.manager.getAllTasks();
    alert(`you clicked on ${tasks[index].task}`);
  }

  renderListItem(value, index) {
    //Create all the html elements to be added to the list
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const task = document.createElement("Text");
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("ion-icon");

    //Define a class for the elements we have created to get the required design
    listItem.classList.add("todo-list-item");
    deleteBtn.classList.add("delete-task-btn");
    deleteBtn.id = index;

    //Setting the id to be the index in the array.
    //In this way the delete function will have access to the index.
    task.id = index;
    task.innerText = value.task;
    deleteIcon.name = "trash-outline";

    deleteBtn.onclick = async () => {
      await this.manager.deleteTask(deleteBtn.id);
      const tasks = await this.manager.getAllTasks();
      this.renderList(tasks);
    };

    task.onclick = () => {
      this.taskClicked(deleteBtn.id);
    };

    //Building the elements tree hierarchically
    deleteBtn.appendChild(deleteIcon);
    span.appendChild(task);
    span.appendChild(deleteBtn);
    listItem.appendChild(span);
    return listItem;
  }
}
