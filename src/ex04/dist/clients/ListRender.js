export default class ListRender {
  constructor(manager) {
    this.manager = manager;
    this.todoList = document.querySelector(".todo-list");
    this.pendingTasks = document.querySelector(".pending-tasks");
  }

  async renderList(listToRender) {
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
    alert(`you clicked on ${tasks[index].taskContent}`);
  }

  renderListItem(item, index) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const task = document.createElement("Text");
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("ion-icon");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = item.isDone;

    const toggleTaskDoneClass = () => {
      if (checkbox.checked) {
        task.classList.add("done");
      } else {
        task.classList.remove("done");
      }
    };

    toggleTaskDoneClass();

    checkbox.addEventListener("change", async () => {
      await this.manager.checboxClicked(item.id);
      toggleTaskDoneClass();
    });

    listItem.classList.add("todo-list-item");
    deleteBtn.classList.add("delete-task-btn");
    deleteBtn.id = item.id;

    task.id = item.id;
    task.innerText = item.taskContent;
    deleteIcon.name = "trash-outline";

    deleteBtn.onclick = async () => {
      await this.manager.deleteTask(item.id);
      const tasks = await this.manager.getAllTasks();
      this.renderList(tasks);
    };

    task.onclick = () => {
      this.taskClicked(index);
    };

    //Building the elements tree hierarchically
    deleteBtn.appendChild(deleteIcon);
    span.appendChild(checkbox);
    span.appendChild(task);
    span.appendChild(deleteBtn);
    listItem.appendChild(span);
    return listItem;
  }
}
