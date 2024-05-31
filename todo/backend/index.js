const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");
const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://ebo:0zloCHUUPfwQaJ9Z@ebo.s1nrvqz.mongodb.net/?retryWrites=true&w=majority&appName=ebo"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

// Add a Todo
app.post("/add", async (req, res) => {
  try {
    const task = req.body.task;
    const newTodo = await TodoModel.create({ task });
    res
      .status(201)
      .json({ message: "Todo added successfully", todo: newTodo._id });
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Delete a Todo by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Fetch All Todos
// Fetch All Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json({
      todos: todos.map((todo) => ({ _id: todo._id, task: todo.task })),
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
