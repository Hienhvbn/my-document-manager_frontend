const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  content: { type: String, required: true },
  startTime: { type: String, required: true },
  startDate: { type: String, required: true },
  endTime: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
  participants: { type: String, required: true },
  updateTime: { type: Date, default: Date.now },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
