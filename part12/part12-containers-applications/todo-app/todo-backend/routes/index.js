const express = require("express");
const router = express.Router();
const redis = require("../redis");
const { getAsync, setAsync } = require("../redis");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});


router.get("/statistics", async (req, res) => {
  const value = await getAsync("added_todos");
  if (!value) {
    await setAsync("added_todos", 0)
  }
  res.send({ added_todos: value });
});

module.exports = router;
