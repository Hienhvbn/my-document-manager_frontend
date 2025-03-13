import {
  BookOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FileAddOutlined,
  FileTextOutlined,
  HomeOutlined,
  PaperClipOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import image from "../assets/img/image.svg";
import maskGroup from "../assets/img/mask-group.png";
import DefaultLayout from "../components/DefaultLayout";
import { Option } from "antd/es/mentions";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import dayjs from "dayjs";

const { Header, Sider, Content } = Layout;

// const dataSource = [
//   {
//     key: "1",
//     stt: "1",
//     soKyHieu: "112/HĐPB",
//     ngayThang: "12/01/2024",
//     tenLoai: "Công văn: Triển khai thực hiện quyết...",
//     nguoiKy: "Hoàng Văn Thắng",
//     noiNhan: "Bộ Tư pháp",
//     ghiChu: "",
//     xem: image,
//   },
//   {
//     key: "2",
//     stt: "2",
//     soKyHieu: "141/BNV-TCPCP",
//     ngayThang: "12/01/2024",
//     tenLoai: "Báo cáo tình hình tổ chức và ...",
//     nguoiKy: "Hoàng Văn Thắng",
//     noiNhan: "Bộ Nội vụ",
//     ghiChu: "",
//     xem: image,
//   },
//   {
//     key: "3",
//     stt: "3",
//     soKyHieu: "358/BNN-PC",
//     ngayThang: "12/01/2024",
//     tenLoai: "Công văn: Góp ý dự thảo Luật",
//     nguoiKy: "Hoàng Văn Thắng",
//     noiNhan: "Bộ Nông nghiệp",
//     ghiChu: "",
//     xem: image,
//   },
//   {
//     key: "4",
//     stt: "4",
//     soKyHieu: "07/GM-ATMT",
//     ngayThang: "12/01/2024",
//     tenLoai: "Giấy mời: Giấy mời Hội thảo quốc tế...",
//     nguoiKy: "Hoàng Văn Thắng",
//     noiNhan: "Bộ Công Thương",
//     ghiChu: "",
//     xem: image,
//   },
// ];

const OutgoingDocument = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // Lưu công văn đang chỉnh sửa
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Trạng thái lưu các dòng được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async (values) => {
    const file = values.tepDinhKem?.fileList?.[0]; // Lấy file đầu tiên
    const fileName = file ? file.name : ""; // Chỉ lấy tên file
    const formData = {
      ...values,
      tepDinhKem: fileName, // Lưu dưới dạng chuỗi
      ngayVanBan: values.ngayVanBan
        ? values.ngayVanBan.format("DD-MM-YYYY")
        : null,
    };
    try {
      let response;

      if (editingRecord) {
        // Nếu đang chỉnh sửa -> Gửi request PUT để cập nhật
        response = await axios.put(
          `http://localhost:8080/v1/api/outgoingdocument/${editingRecord._id}`,
          formData
        );
      } else {
        // Nếu thêm mới -> Gửi request POST để lưu
        response = await axios.post(
          "http://localhost:8080/v1/api/outgoingdocument",
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
        const fetchOutgoingDocument = async () => {
          try {
            const res = await axios.get(
              "http://localhost:8080/v1/api/outgoingdocument"
            );
            if (res.data) {
              setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
            }
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };

        fetchOutgoingDocument();
      }
    } catch (error) {
      message.error("Lỗi khi lưu tài liệu!");
    }
  };
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };
  const handleEdit = () => {
    if (selectedRowKeys.length === 1) {
      const record = dataSource.find((item) => item._id === selectedRowKeys[0]);
      form.setFieldsValue({
        ...record,
        ngayVanBan: record.ngayVanBan ? dayjs(record.ngayVanBan) : null,
      });
      setEditingRecord(record);
      setIsModalOpen(true);
    } else {
      message.warning("Vui lòng chọn một công văn để chỉnh sửa.");
    }
  };
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một dòng để xoá!");
      return;
    }

    try {
      await axios.delete("http://localhost:8080/v1/api/outgoingdocument", {
        data: { _id: selectedRowKeys }, // Gửi danh sách ID cần xoá
      });

      message.success("Xoá thành công!");
      const fetchOutgoingDocument = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/v1/api/outgoingdocument"
          );
          if (res.data) {
            setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      };

      fetchOutgoingDocument();
    } catch (error) {
      message.error("Lỗi khi xoá dữ liệu!");
    }
  };
  useEffect(() => {
    const fetchOutgoingDocument = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/v1/api/outgoingdocument"
        );
        if (res.data) {
          setDataSource(res.data); // Đảm bảo lấy đúng dữ liệu từ res.data
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchOutgoingDocument();
  }, []);
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
      title: "Người ký",
      dataIndex: "nguoiKy",
    },
    {
      title: "Nơi nhận",
      dataIndex: "noiNhan",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
    },
  ];
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      dataSource.map((row) => ({
        STT: row.stt,
        "Số ký hiệu": row.soKyHieu,
        "Ngày tháng": row.ngayThang,
        "Tên loại": row.tenLoai,
        "Người ký": row.nguoiKy,
        "Nơi nhận": row.noiNhan,
        "Ghi chú": row.ghiChu,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachCongVanDi");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, "DanhSachCongVanDi.xlsx");
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
            title={editingRecord ? "Chỉnh sửa công văn đi" : "Thêm công văn đi"}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            width={800} // Kích thước modal
            centered
          >
            <Form form={form} layout="vertical" onFinish={handleOk}>
              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Số/ký hiệu:"
                  name="soKyHieu"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập số/ký hiệu" />
                </Form.Item>

                <Form.Item
                  label="Ngày văn bản:"
                  name="ngayVanBan"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Tên loại và trích yếu:"
                  name="trichYeu"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên loại và trích yếu" />
                </Form.Item>

                <Form.Item
                  label="Người ký:"
                  name="nguoiKy"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn người ký">
                    <Option value="nguyenvanA">Nguyễn Văn A</Option>
                    <Option value="tranvanB">Trần Văn B</Option>
                  </Select>
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 250 }}>
                <Form.Item
                  label="Nơi nhận:"
                  name="noiNhan"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn nơi nhận">
                    <Option value="bonongnghiep">Bộ nông nghiệp</Option>
                    <Option value="bocongan">Bộ công an</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Ghi chú:" name="ghiChu">
                  <Input placeholder="Nhập ghi chú" />
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
            style={{ background: "#00c013", borderColor: "#00c013" }}
            onClick={handleEdit}
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

export default OutgoingDocument;
