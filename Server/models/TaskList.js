const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  user_story_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserStory",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Awaiting Confirmation", "Completed"],
    default: "To Do",
  },
});

const TaskList = mongoose.model("TaskList", TaskListSchema);

module.exports = TaskList;
