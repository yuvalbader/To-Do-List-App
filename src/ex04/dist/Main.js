import ListRender from "./clients/ListRender.js";
import ItemClient from "./clients/ItemClient.js";

class Main {
  constructor() {
    this.ItemClient = new ItemClient();
    this.ListRender = new ListRender(this.ItemClient);
    this.inputBox = document.querySelector(".add-new-input");
    this.addTaskBtn = document.querySelector(".add-new-button");
    this.deleteAllTasksBtn = document.querySelector(".delete-all-tasks");
  }

  async printList() {
    const items = await this.ItemClient.getAllTasks();
    this.ListRender.renderList(items);
  }

  async init() {
    await this.printList();

    this.addTaskBtn.addEventListener("click", async () => {
      try {
        let userValue = this.inputBox.value;
        this.inputBox.value = "";
        await this.ItemClient.addTask(userValue);
        await this.printList();
      } catch (e) {
        alert(e);
      }
    });

    this.inputBox.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addTaskBtn.click();
      }
    });

    this.deleteAllTasksBtn.addEventListener("click", async () => {
      this.ItemClient.deleteAllItems();
      await this.printList();
    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
