const mongoose = require('mongoose');

const incomingDocumentSchema = new mongoose.Schema({
    ngayDen: { type: String, required: true },
    soDen: { type: String, required: true },
    tacGia: { type: String, required: true },
    soKyHieu: { type: String, required: true },
    ngayVanBan: { type: String },
    trichYeu: { type: String },
    hanXuLy: { type: String },
    tinhTrangXuLy: { type: String, enum: ['daxuly', 'chuaxuly'] },
    tepDinhKem: { type: String }, // Lưu tên file
    lanhDao: { type: String },
    chiDao: { type: String },
    donViXuLy: { type: String },
    nguoiXuLy: { type: String },
    donViPhoiHop: { type: String },
    nguoiPhoiHop: { type: String }
}, { timestamps: true });

const IncomingDocument = mongoose.model('IncomingDocument', incomingDocumentSchema);
module.exports = IncomingDocument;
