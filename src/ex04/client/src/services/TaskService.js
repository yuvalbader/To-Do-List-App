class TaskService {
  constructor() {
    this.API_BASE = "http://localhost:8000";
  }

  async getAllTasks() {
    try {
      const response = await fetch(`/getTasks`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const tasks = await response.json();
      return tasks;
    } catch (e) {
      console.log(e);
    }
  }

  async addTask(taskContent) {
    try {
      const response = await fetch(`/addTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: taskContent }),
      });
      const tasks = await response.json();
      return tasks;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTask(taskContent) {
    try {
      await fetch(`/deleteTask`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskContent: taskContent }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async checboxClicked(taskId) {
    try {
      await fetch(`/checboxClicked`, {
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
      await fetch(`/deleteAllTasks`, {
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
export default TaskService;
