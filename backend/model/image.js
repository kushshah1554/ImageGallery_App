const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, require: true },
    publicId: { type: String, require: true },
    name: String,
    tags: [String],
    liked: { type: Boolean, default: false },
    saved: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    comments: { type: mongoose.Schema.Types.ObjectId, ref: "ImageComments" },
    likedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    uploader: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
