const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  team_name: {
    type: String,
  },
  users: Array,
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
