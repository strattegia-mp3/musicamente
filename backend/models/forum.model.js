const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

const topicSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = { Category, Topic };
