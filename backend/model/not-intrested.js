const mongoose = require("mongoose");

const notIntrestedImagesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  notIntrestedImages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Image",
    default: [],
  },
});

module.exports = mongoose.model("NotIntrestedImage", notIntrestedImagesSchema);
