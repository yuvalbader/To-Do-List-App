import fs from "fs";

export default class FileManager {
  constructor() {
    {
      this.fileName = "./tasks.json";
      this.itemsArr = this.loadItemsFromFile();
    }
  }

  addTaskToFile(taskToAdd) {
    this.itemsArr.push(taskToAdd);
    this.saveNewArray();
  }

  printTasks(options) {
    try {
      if (options.completed) {
        const completed = this.itemsArr.filter((task) => task.checked == true);
        this.printArr(completed);
      } else if (options.uncompleted) {
        const unCompleted = this.itemsArr.filter(
          (task) => task.checked == false
        );
        this.printArr(unCompleted);
      } else {
        this.printArr(this.itemsArr);
      }
    } catch (e) {
      throw e;
    }
  }

  printArr(arr) {
    if (arr.length == 0) {
      throw new Error("There is no tasks to show");
    } else {
      arr.forEach((item, index) => {
        console.log(`${index + 1}. ${item.task}`);
      });
    }
  }
  setAsComplete(taskToCompleteIdx) {
    this.itemsArr[taskToCompleteIdx - 1].checked = true;
    this.saveNewArray();
  }

  saveNewArray() {
    fs.writeFile(this.fileName, JSON.stringify(this.itemsArr), function (err) {
      if (err) console.log(err);
    });
  }

  removeTaskFromFile(itemToRemoveIdx) {
    this.itemsArr.splice(itemToRemoveIdx - 1, 1);
    this.saveNewArray();
  }

  deleteAll() {
    this.itemsArr = [];
    this.saveNewArray();
  }

  loadItemsFromFile() {
    try {
      let data = fs.readFileSync(this.fileName);
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
}
