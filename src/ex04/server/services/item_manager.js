const fs = require("fs");
require("dotenv").config();

class ItemManager {
  constructor() {
    {
      this.fileName = process.env.FILE_PATH;
      this.itemsArr = this.loadItemsFromFile();
    }
  }

  addItem(taskToAdd) {
    this.itemsArr.push(taskToAdd);
    this.saveNewArray();
  }

  async getAllItems() {
    return await this.itemsArr;
  }

  setAsComplete(taskToCompleteIdx) {
    this.itemsArr[taskToCompleteIdx - 1].checked = true;
    this.saveNewArray();
  }

  saveNewArray() {
    try {
      fs.writeFile(
        this.fileName,
        JSON.stringify(this.itemsArr),
        function (err) {
          if (err) console.log(err);
        }
      );
    } catch (e) {
      throw new Error("Error updating array");
    }
  }

  removeItem(itemToRemoveIdx) {
    this.itemsArr.splice(itemToRemoveIdx, 1);
    this.saveNewArray();
  }

  deleteAllItems() {
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

module.exports = new ItemManager();
