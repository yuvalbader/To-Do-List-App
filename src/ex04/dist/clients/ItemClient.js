class ItemClient {
  constructor() {
    this.API_BASE = "http://localhost:8000";
  }

  async getAllTasks() {
    try {
      const tasks = await fetch(`${this.API_BASE}/getTasks`);
      const response = await tasks.json();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async addTask(taskContent) {
    try {
      const response = await fetch(`${this.API_BASE}/addTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: taskContent }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteTask(taskToDelete) {
    try {
      await fetch(`${this.API_BASE}/deleteTask`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskToDelete: taskToDelete }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAllItems() {
    try {
      await fetch(`${this.API_BASE}/deleteAllTasks`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
export default ItemClient;
