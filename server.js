const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Task = require("./model/tasks.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Hello Crud Node Express" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//Mongoose
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "MongoDB Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

//api
app.post("/tasks", async (req, res) => {
  try {
    const {
      title,
      description,
      createdBy,
      createdOn,
      dueDate,
      priority,
      completedOn,
      isCompleted,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      createdBy,
      createdOn,
      dueDate,
      priority,
      completedOn,
      isCompleted,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Update task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const {
      title,
      description,
      createdBy,
      createdOn,
      dueDate,
      priority,
      completedOn,
      isCompleted,
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        createdBy,
        createdOn,
        dueDate,
        priority,
        completedOn,
        isCompleted,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
