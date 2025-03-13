const mongoose = require('mongoose');

const outgoingDocumentSchema = new mongoose.Schema({
	soKyHieu: String,
	ngayVanBan: String,
	trichYeu: String,
	nguoiKy: String,
	noiNhan: String,
	ghiChu: String,
	tepDinhKem: String, 
}, { timestamps: true });

const OutgoingDocument = mongoose.model('OutgoingDocument', outgoingDocumentSchema);
module.exports = OutgoingDocument;
