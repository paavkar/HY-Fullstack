const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync } = require("../redis");
const { setAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const value = await getAsync("added_todos");
  if (!value) {
    await setAsync("added_todos", 1);
    return res.send(todo);
  }
  await setAsync("added_todos", parseInt(value) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  const value = await getAsync("added_todos");
  if (value <= 1) {
    await setAsync("added_todos", 0);
    return res.sendStatus(200);
  }
  await setAsync("added_todos", parseInt(value) - 1);
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = { text: req.todo.text, done: req.body.done };
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, todo, { new: true });

  res.json(updatedTodo); // Implement this
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
