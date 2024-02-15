// basic syntax for creation of table in mongodb
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

// this will helps in exporting this file to use in another file
module.exports = User;
