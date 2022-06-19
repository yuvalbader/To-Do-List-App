const express = require("express");
const {
  getTasks,
  addTask,
  deleteAllTasks,
  deleteTask,
} = require("../controllers/itemsController");

const router = express.Router();

router.get("/getTasks", getTasks);
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask);
router.delete("/deleteAllTasks", deleteAllTasks);

module.exports = router;
