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

  async getTasksByStatus(status) {
    try {
      const endpoint = "";

      if (status === "Done") {
        endpoint = `${this.API_BASE}/getDoneTasks`;
      } else if (status === "UnDone") {
        endpoint = `${this.API_BASE}/getUnDoneTasks`;
      }
      const tasks = await fetch(endpoint);
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
      if (response.status !== 200) {
        throw new Error("Task already exists");
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteTask(taskId) {
    try {
      await fetch(`${this.API_BASE}/deleteTask`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async checboxClicked(taskId) {
    try {
      await fetch(`${this.API_BASE}/checboxClicked`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId, doneTimestamp: new Date() }),
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
