const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  eventImage: String,
  date: { type: Date, required: true },
  location: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  category: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
