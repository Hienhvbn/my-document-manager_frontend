import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import image from "../assets/img/image.svg";
import DefaultLayout from "../components/DefaultLayout";
import { Option } from "antd/es/mentions";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import dayjs from "dayjs";
import { icons } from "antd/es/image/PreviewGroup";
import { PaperClipOutlined } from "@ant-design/icons";

const IncomingDocument = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // Lưu công văn đang chỉnh sửa
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Trạng thái lưu các dòng được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Xử lý mở modal chỉnh sửa
  const handleEdit = () => {
    if (selectedRowKeys.length === 1) {
      const record = dataSource.find((item) => item._id === selectedRowKeys[0]);
      form.setFieldsValue({
        ...record,
        ngayDen: record.ngayDen ? dayjs(record.ngayDen) : null, // Chuyển đổi ngày
        ngayVanBan: record.ngayVanBan ? dayjs(record.ngayVanBan) : null,
        hanXuLy: record.hanXuLy ? dayjs(record.hanXuLy) : null,
      });
      setEditingRecord(record);
      setIsModalOpen(true);
    } else {
      message.warning("Vui lòng chọn một công văn để chỉnh sửa.");
    }
  };

  useEffect(() => {
    const fetchIncomingDocument = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/v1/api/incomingdocument"
        );
        if (res.data) {
          setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchIncomingDocument();
  }, []);

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một dòng để xoá!");
      return;
    }

    try {
      await axios.delete("http://localhost:8080/v1/api/incomingdocument", {
        data: { _id: selectedRowKeys }, // Gửi danh sách ID cần xoá
      });

      message.success("Xoá thành công!");
      const fetchIncomingDocument = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/v1/api/incomingdocument"
          );
          if (res.data) {
            setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      };

      fetchIncomingDocument();
    } catch (error) {
      message.error("Lỗi khi xoá dữ liệu!");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const columns = [
    {
      title: "Xem",
      dataIndex: "tepDinhKem",
      render: (fileName) =>
        fileName ? (
          <a
            href={`http://localhost:8080/uploads/${fileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PaperClipOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
          </a>
        ) : (
          "Không có file"
        ),
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
    },
    {
      title: "Số đến",
      dataIndex: "soDen",
    },
    {
      title: "Tác giả",
      dataIndex: "tacGia",
    },
    {
      title: "Số ký hiệu",
      dataIndex: "soKyHieu",
    },
    {
      title: "Ngày tháng",
      dataIndex: "ngayVanBan",
    },
    {
      title: "Tên loại và trích yếu nội dung văn bản",
      dataIndex: "trichYeu",
    },
    {
      title: "Đơn vị/Người xứ lý cuối",
      dataIndex: "nguoiXuLy",
    },
    {
      title: "Tình trạng xử lý",
      dataIndex: "tinhTrangXuLy",
      render: (status) => (
        <Tag color={status === "daxuly" ? "green" : "red"}>
          {status === "daxuly" ? "Đã xử lý" : "Chưa xử lý"}
        </Tag>
      ),
    },
  ];

  const handleOk = async (values) => {
    const file = values.tepDinhKem?.fileList?.[0]; // Lấy file đầu tiên
    const fileName = file ? file.name : ""; // Chỉ lấy tên file
    const formData = {
      ...values,
      tepDinhKem: fileName, // Lưu dưới dạng chuỗi
      ngayDen: values.ngayDen ? values.ngayDen.format("DD-MM-YYYY") : null,
      ngayVanBan: values.ngayVanBan
        ? values.ngayVanBan.format("DD-MM-YYYY")
        : null,
      hanXuLy: values.hanXuLy ? values.hanXuLy.format("DD-MM-YYYY") : null,
    };
    try {
      let response;

      if (editingRecord) {
        // Nếu đang chỉnh sửa -> Gửi request PUT để cập nhật
        response = await axios.put(
          `http://localhost:8080/v1/api/incomingdocument/${editingRecord._id}`,
          formData
        );
      } else {
        // Nếu thêm mới -> Gửi request POST để lưu
        response = await axios.post(
          "http://localhost:8080/v1/api/incomingdocument",
          formData
        );
      }

      if (response.status === 200 || response.status === 201) {
        message.success(
          editingRecord
            ? "Cập nhật công văn thành công!"
            : "Thêm công văn thành công!"
        );
        form.resetFields();
        setIsModalOpen(false); // Đóng modal sau khi lưu
        const fetchIncomingDocument = async () => {
          try {
            const res = await axios.get(
              "http://localhost:8080/v1/api/incomingdocument"
            );
            if (res.data) {
              setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
            }
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };

        fetchIncomingDocument();
      }
    } catch (error) {
      message.error("Lỗi khi lưu tài liệu!");
    }
  };

  const exportToExcel = () => {
    // Tiêu đề đầu trang
    const title = [
      ["HỘI ĐẬP LỚN VÀ PHÁT TRIỂN NGUỒN NƯỚC VIỆT NAM", "","","","","","","CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM"],
      ["","","","","","","","Độc lập - Tự do - Hạnh phúc"],
      [],
      ["","","","","","SỔ VĂN BẢN ĐẾN"],
      []
    ];
  
    // Header của bảng dữ liệu
    const header = [
      ["TT", "Ngày đến", "Số đến", "Tác giả", "Số ký hiệu", "Ngày tháng", "Tên loại và trích yếu nội dung văn bản", "Đơn vị/Người xử lý cuối"]
    ];
  
    // Dữ liệu từ dataSource
    const data = dataSource.map((row, index) => [
      index + 1,  // TT
      row.ngayDen,
      row.soDen,
      row.tacGia,
      row.soKyHieu,
      row.ngayVanBan,
      row.trichYeu,
      row.nguoiXuLy
    ]);
  
    // Kết hợp tất cả lại thành một mảng
    const worksheetData = [...title, ...header, ...data];
  
    // Tạo sheet Excel
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Thiết lập độ rộng cột
    worksheet["!cols"] = [
      { wch: 5 },   // TT
      { wch: 15 },  // Ngày đến
      { wch: 10 },  // Số đến
      { wch: 20 },  // Tác giả
      { wch: 15 },  // Số ký hiệu
      { wch: 15 },  // Ngày tháng
      { wch: 40 },  // Tên loại và trích yếu nội dung văn bản
      { wch: 25 }   // Đơn vị/Người xử lý cuối
    ];
  
    // Tạo workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachCongVanDen");
  
    // Xuất file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
  
    saveAs(dataBlob, "DanhSachCongVanDen.xlsx");
  };
  return (
    <DefaultLayout>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col>
          <Button
            type="primary"
            onClick={handleAdd}
            style={{ background: "#00c013", borderColor: "#00c013" }}
          >
            Thêm mới
          </Button>
          <Modal
            title={
              editingRecord ? "Chỉnh sửa công văn đến" : "Thêm công văn đến"
            }
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            width={800}
            centered
          >
            <Form form={form} layout="vertical" onFinish={handleOk}>
              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Ngày đến:"
                  name="ngayDen"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>

                <Form.Item
                  label="Số đến:"
                  name="soDen"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập số đến" />
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 180 }}>
                <Form.Item
                  label="Tác giả:"
                  name="tacGia"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tác giả" />
                </Form.Item>

                <Form.Item
                  label="Số/ký hiệu:"
                  name="soKyHieu"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập số/ký hiệu" />
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Ngày văn bản:"
                  name="ngayVanBan"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>

                <Form.Item
                  label="Tên loại và trích yếu:"
                  name="trichYeu"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên loại và trích yếu" />
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Hạn xử lý:"
                  name="hanXuLy"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>

                <Form.Item label="Tình trạng xử lý:" name="tinhTrangXuLy">
                  <Select placeholder="Tình trạng xử lý">
                    <Option value="daxuly">Đã xử lý</Option>
                    <Option value="chuaxuly">Chưa xử lý</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label="Tệp đính kèm:"
                name="tepDinhKem"
                rules={[{ required: true }]}
              >
                <Upload beforeUpload={() => false}>
                  <Button>Choose file</Button>
                </Upload>
              </Form.Item>

              <h3>Thông tin xử lý</h3>
              <Form.Item label="Lãnh đạo phân công:" name="lanhDao">
                <Select placeholder="Chọn lãnh đạo">
                  <Option value="Lê Thị Anh">Lê Thị Anh</Option>
                  <Option value="Phạm Văn C">Phạm Văn C</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Chỉ đạo của lãnh đạo:" name="chiDao">
                <Input placeholder="Nhập chỉ đạo" />
              </Form.Item>

              <h3>Chuyển xử lý</h3>
              <div style={{ display: "flex", gap: 260 }}>
                <Form.Item label="Đơn vị xử lý:" name="donViXuLy">
                  <Select placeholder="Chọn đơn vị">
                    <Option value="Phòng Hành Chính">Phòng Hành Chính</Option>
                    <Option value="Phòng IT">Phòng IT</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Người xử lý:" name="nguoiXuLy">
                  <Select placeholder="Chọn người xử lý">
                    <Option value="Nguyễn A">Nguyễn A</Option>
                    <Option value="Trần B">Trần B</Option>
                  </Select>
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item label="Đơn vị phối hợp:" name="donViPhoiHop">
                  <Select placeholder="Chọn đơn vị phối hợp">
                    <Option value="Phòng Hành Chính">Phòng Hành Chính</Option>
                    <Option value="Phòng IT">Phòng IT</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Người phối hợp:" name="nguoiPhoiHop">
                  <Select placeholder="Chọn người phối hợp">
                    <Option value="Nguyễn A">Nguyễn A</Option>
                    <Option value="Trần B">Trần B</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{ background: "#fc0000", borderColor: "#fc0000" }}
            onClick={handleDelete}
          >
            Xoá
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleEdit}
            style={{ background: "#00c013", borderColor: "#00c013" }}
          >
            Chỉnh sửa
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={exportToExcel}
            style={{ background: "#00c013", borderColor: "#00c013" }}
          >
            Xuất File
          </Button>
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />
    </DefaultLayout>
  );
};

export default IncomingDocument;
