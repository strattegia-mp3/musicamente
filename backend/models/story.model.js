const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    mediaUrl: String,
    expiresAt: { type: Date, required: true },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
