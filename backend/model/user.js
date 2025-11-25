const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, require: [true, "username must be provide"] },
  email: {
    type: String,
    require: [true, "email must be provide"],
    unique: true,
  },
  password: { type: String, require: [true, "password must be provide"] },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
