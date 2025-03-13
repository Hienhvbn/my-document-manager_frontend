const IncomingDocument = require("../models/incomingdocument");

const searchIncomingdocument = async(req, res) => {
	try {
		const { ngayDenFrom, ngayDenTo, hanXuLyFrom, hanXuLyTo, tacGia, soKyHieu, tinhTrangXuLy, trichYeu } = req.body;
	
		let query = {};
	
		// Lọc theo khoảng ngày đến
		if (ngayDenFrom && ngayDenTo) {
		  query.ngayDen = { $gte: ngayDenFrom, $lte: ngayDenTo };
		} else if (ngayDenFrom) {
		  query.ngayDen = { $gte: ngayDenFrom };
		} else if (ngayDenTo) {
		  query.ngayDen = { $lte: ngayDenTo };
		}
	
		// Lọc theo khoảng hạn xử lý
		if (hanXuLyFrom && hanXuLyTo) {
		  query.hanXuLy = { $gte: hanXuLyFrom, $lte: hanXuLyTo };
		} else if (hanXuLyFrom) {
		  query.hanXuLy = { $gte: hanXuLyFrom };
		} else if (hanXuLyTo) {
		  query.hanXuLy = { $lte: hanXuLyTo };
		}
	
		if (tacGia) query.tacGia = { $regex: tacGia, $options: "i" };
		if (soKyHieu) query.soKyHieu = { $regex: soKyHieu, $options: "i" };
		if (tinhTrangXuLy) query.tinhTrangXuLy = tinhTrangXuLy;
		if (trichYeu) query.trichYeu = { $regex: trichYeu, $options: "i" };
	
		const results = await IncomingDocument.find(query);
		res.json({ success: true, data: results });
	  } catch (error) {
		res.status(500).json({ success: false, message: "Lỗi server", error });
	  }
}


module.exports = {
	searchIncomingdocument
}