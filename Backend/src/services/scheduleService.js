const Schedule = require("../models/schedule");

// 📌 Lấy danh sách lịch công tác
const getSchedules = async () => {
  return await Schedule.find();
};

// 📌 Tạo lịch công tác mới
const createSchedule = async (scheduleData) => {
  const newSchedule = new Schedule(scheduleData);
  return await newSchedule.save();
};

// 📌 Cập nhật lịch công tác
const updateSchedule = async (id, scheduleData) => {
  return await Schedule.findByIdAndUpdate(id, scheduleData, { new: true });
};

// 📌 Xóa lịch công tác
const deleteSchedule = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};

module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
