const IncomingDocument = require("../models/incomingdocument");

const createIncomingdocument = async (req, res) => {
  try {
    const formData = req.body; // Lấy dữ liệu từ request
    const newDocument = new IncomingDocument(formData); // Tạo bản ghi mới
    await newDocument.save(); // Lưu vào MongoDB

    res.status(200).json({ message: "Lưu dữ liệu thành công!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lưu dữ liệu", error: err.message });
  }
};

const getIncomingdocument = async (req, res) => {
  try {
    const documents = await IncomingDocument.find({}).select();
    res.status(200).json(documents);
  } catch (error) {
    console.error("Lỗi lấy công văn đến:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

const deleteIncomingdocument = async(req, res) => {
  try {
    const { _id } = req.body; // Lấy danh sách ID từ request body

    if (!_id || _id.length === 0) {
      return res.status(400).json({ message: "❌ Danh sách ID không hợp lệ" });
    }

    // Xóa nhiều tài liệu theo danh sách ID
    const deletedDocuments = await IncomingDocument.deleteMany({ _id: { $in: _id } });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "❌ Không có tài liệu nào được xóa" });
    }

    res.json({ message: "✅ Xóa thành công", deletedCount: deletedDocuments.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "❌ Lỗi server", error: error.message });
  }
}

const editIncomingdocument = async(req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDocument = await IncomingDocument.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDocument) {
      return res.status(404).json({ message: "Không tìm thấy văn bản để cập nhật" });
    }

    res.status(200).json({ message: "Cập nhật thành công", data: updatedDocument });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật văn bản", error: error.message });
  }
}

module.exports = {
  createIncomingdocument,
  getIncomingdocument,
  deleteIncomingdocument,
  editIncomingdocument
};
