const itemManager = require("../services/item_manager");

const getTasks = async (req, res) => {
  try {
    const items = await itemManager.getAllItems();
    return res.status(200).send(items);
  } catch (err) {
    return res.status(410).send({ error: err.message });
  }
};

const getDoneTasks = async (req, res) => {
  try {
    const items = await itemManager.getDoneItems();
    return res.status(200).send(items);
  } catch (err) {
    return res.status(411).send({ error: err.message });
  }
};

const getUnDoneTasks = async (req, res) => {
  try {
    const items = await itemManager.getUnDoneItems();
    return res.status(200).send(items);
  } catch (err) {
    return res.status(412).send({ error: err.message });
  }
};

const addTask = async (req, res) => {
  try {
    const newTask = await itemManager.handleItem(req.body.item);
    return res.status(200).send(newTask);
  } catch (err) {
    return res.status(430).send({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    itemManager.deleteItem(req.body.taskContent);
    return res.status(200).send("Task deleted successfully");
  } catch (err) {
    return res.status(413).send({ error: err.message });
  }
};

const checboxClicked = async (req, res) => {
  try {
    itemManager.handleCheckboxChange(req.body.taskId, req.body.doneTimestamp);
    return res.status(200).send("Task status changed successfully");
  } catch (err) {
    return res.status(414).send({ error: err.message });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    itemManager.deleteAllItems();
    return res.status(200).send("All Tasks deleted successfully");
  } catch (err) {
    return res.status(415).send({ error: err.message });
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
