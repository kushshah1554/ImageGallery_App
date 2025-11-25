const mongoose = require("mongoose");

const imageCommentsSchema = new mongoose.Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  comments: {
    type: [
      {
        text: String,
        user: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: {
          type: String,
          default: () =>
            new Date().toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("ImageComments", imageCommentsSchema);
