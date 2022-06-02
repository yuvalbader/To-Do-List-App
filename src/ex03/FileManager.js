import fs from "fs";
// const _ = require("lodash");

export default class FileManager {
  constructor() {
    {
      this.fileName = "./tasks.json";
      this.itemsArr = this.loadItemsFromFile();
    }
  }

  addTaskToFile(taskToAdd) {
    this.itemsArr.push(taskToAdd);
    fs.writeFile(this.fileName, JSON.stringify(this.itemsArr), function (err) {
      if (err) console.log(err);
    });
  }

  printTasksFromFile() {
    fs.readFile(this.fileName, function (err, data) {
      if (err) throw err;
      const tasks = data.toString().split("\n");
      tasks.forEach((task) => {
        console.log(task);
      });
    });
  }
  removeTaskFromFile(itemToRemoveIdx) {}

  loadItemsFromFile() {
    try {
      let rawdata = fs.readFileSync(this.fileName);
      return JSON.parse(rawdata);
    } catch (e) {
      console.log("failed");
      return [];
    }
  }

  getItems() {
    // return this.itemsArr;
  }

  deleteAllItems() {
    // this.itemsArr = [];
    // localStorage.setItem("items", []);
  }
}
