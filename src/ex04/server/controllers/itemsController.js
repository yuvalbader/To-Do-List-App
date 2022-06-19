const itemManager = require("../services/item_manager");

const { createItemToAdd } = require("../services/itemsControllerHelpers");

const getTasks = async (req, res, next) => {
  try {
    const items = await itemManager.getAllItems();
    return res.status(200).send(items);
  } catch (err) {
    return next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    const items = await createItemToAdd(req.body.item);
    items.map((item) => itemManager.addItem(item));
    return res.status(200).send("Task added successfully");
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    itemManager.removeItem(req.body.taskToDelete);
    return res.status(200).send("Task deleted successfully");
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
  addTask,
  deleteAllTasks,
  deleteTask,
};
