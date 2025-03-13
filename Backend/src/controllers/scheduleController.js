const scheduleService = require("../services/scheduleService");

// 📌 Lấy danh sách lịch công tác
const getSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getSchedules();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Thêm lịch công tác mới
const createSchedule = async (req, res) => {
  try {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Cập nhật lịch công tác
const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await scheduleService.updateSchedule(req.params.id, req.body);
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Xóa lịch công tác
const deleteSchedule = async (req, res) => {
  try {
    await scheduleService.deleteSchedule(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
