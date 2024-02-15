const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
  },
  description: {
    type: String,
  },

  managerName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  team: {
    type: String,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
