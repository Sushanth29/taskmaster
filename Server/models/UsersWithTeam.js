const mongoose = require("mongoose");

const UsersWithTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
  },
  users: Array,
});

const UsersWithTeam = mongoose.model("UsersWithTeam", UsersWithTeamSchema);

module.exports = UsersWithTeam;
