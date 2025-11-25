const mongoose = require("mongoose");

const savedImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  savedImages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Image",
    default: [],
  },
});

module.exports = mongoose.model("SavedImage", savedImageSchema);
