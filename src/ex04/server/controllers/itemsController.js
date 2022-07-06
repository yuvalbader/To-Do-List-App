const itemManager = require("../services/item_manager");

const getTasks = async (req, res, next) => {
  try {
    const items = await itemManager.getAllItems();
    return res.status(200).send(items);
  } catch (err) {
    return next(err);
  }
};

const getDoneTasks = async (req, res, next) => {
  try {
    const items = await itemManager.getDoneItems();
    return res.status(200).send(items);
  } catch (err) {
    return next(err);
  }
};

const getUnDoneTasks = async (req, res, next) => {
  try {
    const items = await itemManager.getUnDoneItems();
    return res.status(200).send(items);
  } catch (err) {
    return next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    await itemManager.handleItem(req.body.item);
    return res.status(200).send("Task added successfully");
  } catch (err) {
    return res.status(430).send("Task already exists.");
  }
};

const deleteTask = async (req, res, next) => {
  try {
    itemManager.deleteItem(req.body.taskId);
    return res.status(200).send("Task deleted successfully");
  } catch (err) {
    return next(err);
  }
};

const checboxClicked = async (req, res, next) => {
  try {
    itemManager.handleCheckboxChange(req.body.taskId, req.body.doneTimestamp);
    return res.status(200).send("Task status changed successfully");
  } catch (err) {
    return next(err);
  }
};

const deleteAllTasks = async (req, res, next) => {
  try {
    itemManager.deleteAllItems();
    return res.status(200).send("All Tasks deleted successfully");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getTasks,
  getDoneTasks,
  getUnDoneTasks,
  addTask,
  deleteAllTasks,
  deleteTask,
  checboxClicked,
};
