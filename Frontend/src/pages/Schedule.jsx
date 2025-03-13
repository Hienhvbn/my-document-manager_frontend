import {
  BookOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import maskGroup from "../assets/img/mask-group.png";
import DefaultLayout from "../components/DefaultLayout";
import { Option } from "antd/es/mentions";
import axios from "axios";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// const dataSource = [
//   {
//     key: "1",
//     date: "Thứ hai\n17/02/2025",
//     content:
//       "09:00 - 18:00: Họp Hội đồng Tư vấn đánh giá an toàn đập Hồ chứa nước Cửa Đạt tỉnh Thanh Hoá",
//     participants: "Nguyễn Thị C, Trần Văn H",
//     location: "Thanh Hoá",
//     updateTime: "01/02, 22:00",
//   },
//   {
//     key: "2",
//     date: "Thứ ba\n18/02/2025",
//     content: "",
//     participants: "",
//     location: "",
//     updateTime: "",
//   },
//   {
//     key: "3",
//     date: "Thứ tư\n19/02/2025",
//     content: "",
//     participants: "",
//     location: "",
//     updateTime: "",
//   },
//   {
//     key: "4",
//     date: "Thứ năm\n20/02/2025",
//     content: "",
//     participants: "",
//     location: "",
//     updateTime: "",
//   },
//   {
//     key: "5",
//     date: "Thứ sáu\n21/02/2025",
//     content:
//       "10:00: Tổ chức Lớp đào tạo bồi dưỡng chuyên môn quản lý an toàn đập, hồ chứa tại TP.Hồ Chí Minh",
//     participants: "Dương Văn A, Nguyễn Văn B",
//     location: "135 Pasteur, Phường 6, Quận 3 TP.Hồ Chí Minh",
//     updateTime: "02/02, 21:00",
//   },
//   {
//     key: "6",
//     date: "Thứ bảy\n22/02/2025",
//     content: "",
//     participants: "",
//     location: "",
//     updateTime: "",
//   },
//   {
//     key: "7",
//     date: "Chủ nhật\n23/02/2025",
//     content: "",
//     participants: "",
//     location: "",
//     updateTime: "",
//   },
// ];

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [scheduleData, setScheduleData] = useState([]);

  const columns = [
    {
      title: "Ngày tháng",
      dataIndex: "startDate",
    },
    {
      title: "Nội dung công việc",
      dataIndex: "content",
    },
    {
      title: "Thành phần tham gia",
      dataIndex: "participants",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
    },
    {
      title: "TG Cập nhật",
      dataIndex: "updateTime",
    },
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:8080/v1/api/schedule");
      setScheduleData(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách lịch:", err);
    }
  };

  // 📌 Gửi dữ liệu lên backend khi lập lịch
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newSchedule = {
        content: values.noiDungCongViec,
        startTime: values.thoiGianBatDau.format("HH:mm"),
        startDate: values.ngayBatDau.format("DD/MM/YYYY"),
        endTime: values.thoiGianKetThuc.format("HH:mm"),
        endDate: values.ngayKetThuc.format("DD/MM/YYYY"),
        location: values.diaDiem,
        participants: values.thanhPhanThamGia,
      };

      await axios.post("http://localhost:8080/v1/api/schedule", newSchedule);
      setIsModalOpen(false);
      form.resetFields();
      fetchSchedules(); // Cập nhật bảng sau khi thêm
    } catch (err) {
      console.error("Lỗi khi lập lịch:", err);
    }
  };
  return (
    <DefaultLayout>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ background: "#00c013", borderColor: "#00c013" }}
          >
            Lập lịch
          </Button>
          <Modal
            title="Lập lịch công tác"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleOk}
            width={800} // Kích thước modal
            centered
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Nội dung công việc:"
                name="noiDungCongViec"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập nội dung công việc" />
              </Form.Item>
              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Thời gian từ:"
                  name="thoiGianBatDau"
                  rules={[{ required: true }]}
                >
                  <TimePicker />
                </Form.Item>

                <Form.Item
                  label="Từ ngày:"
                  name="ngayBatDau"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: 200 }}>
                <Form.Item
                  label="Thời gian đến:"
                  name="thoiGianKetThuc"
                  rules={[{ required: true }]}
                >
                  <TimePicker />
                </Form.Item>

                <Form.Item
                  label="Đến ngày:"
                  name="ngayKetThuc"
                  rules={[{ required: true }]}
                >
                  <DatePicker placeholder="DD / MM / YYYY" />
                </Form.Item>
              </div>

              <Form.Item
                label="Địa điểm:"
                name="diaDiem"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên địa điểm" />
              </Form.Item>

              <Form.Item
                label="Thành phần tham gia:"
                name="thanhPhanThamGia"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập thành phần tham gia" />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      <Table
        dataSource={scheduleData}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />
    </DefaultLayout>
  );
};

export default Schedule;
