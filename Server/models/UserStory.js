const mongoose = require("mongoose");

const UserStorySchema = new mongoose.Schema({
  userStoryTitle:{
    type: String,
  },
  userStoryDescription: {
    type: String,
  },
  projectName: {
    type: String,
  },
  priority: {
    type: Number,
  },
  assigned_to:{
     type: mongoose.Schema.Types.ObjectId,
  },
});

const UserStory = mongoose.model("UserStory", UserStorySchema);

module.exports = UserStory;
