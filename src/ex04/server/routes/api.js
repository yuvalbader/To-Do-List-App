const express = require("express");
const {
  getTasks,
  addTask,
  deleteAllTasks,
  deleteTask,
  checboxClicked,
  getDoneTasks,
  getUnDoneTasks,
} = require("../controllers/itemsController");

const router = express.Router();

router.get("/getTasks", getTasks);
router.get("/getDoneTasks", getDoneTasks);
router.get("/getUnDoneTasks", getUnDoneTasks);
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask);
router.delete("/deleteAllTasks", deleteAllTasks);
router.patch("/checboxClicked", checboxClicked);

module.exports = router;
