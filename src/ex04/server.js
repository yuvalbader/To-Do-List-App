const express = require("express");
const app = express();
const router = require("./server/routes/api");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(express.static(__dirname + process.env.DIST_PATH));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, process.env.INDEX_PATH));
});

app.listen(process.env.PORT || 8000, () =>
  console.log(`App is Up on port ${process.env.PORT}`)
);

module.exports = app;
