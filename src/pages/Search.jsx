import {
  BookOutlined,
  CalendarOutlined,
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
  Input,
  Row,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import image from "../assets/img/image.svg";
import dayjs from "dayjs";

const Search = () => {
  const { Option } = Select;
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    soKyHieu: "",
    ngayDenFrom: null,
    ngayDenTo: null,
    hanXuLyFrom: null,
    hanXuLyTo: null,
    tacGia: "",
    trichYeu: "",
    tinhTrangXuLy: "",
  });

  const handleChange = (field, value) => {
    setSearchParams({ ...searchParams, [field]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/v1/api/search", {
        ...searchParams,
        ngayDenFrom: searchParams.ngayDenFrom
          ? dayjs(searchParams.ngayDenFrom).format("DD-MM-YYYY")
          : null,
        ngayDenTo: searchParams.ngayDenTo
          ? dayjs(searchParams.ngayDenTo).format("DD-MM-YYYY")
          : null,
        hanXuLyFrom: searchParams.hanXuLyFrom
          ? dayjs(searchParams.hanXuLyFrom).format("DD-MM-YYYY")
          : null,
        hanXuLyTo: searchParams.hanXuLyTo
          ? dayjs(searchParams.hanXuLyTo).format("DD-MM-YYYY")
          : null,
      });

      if (response.data.success) {
        setData(
          response.data.data.map((item) => ({
            tepDinhKem: item.tepDinhKem,
            ngayDen: item.ngayDen,
            soDen: item.soDen,
            tacGia: item.tacGia,
            soKyHieu: item.soKyHieu,
            ngayVanBan: item.ngayVanBan,
            trichYeu: item.trichYeu,
            nguoiXuLy: item.nguoiXuLy,
            tinhTrangXuLy: item.tinhTrangXuLy
          }))
        );
      } else {
        message.error("Không tìm thấy công văn nào.");
      }
    } catch (error) {
      message.error("Lỗi khi tìm kiếm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Số/ký hiệu:</Col>
            <Col span={16}>
              <Input
                placeholder="Nhập số/ký hiệu"
                onChange={(e) => handleChange("soKyHieu", e.target.value)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Ngày nhận từ:</Col>
            <Col span={16}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD / MM / YYYY"
                style={{ width: "100%" }}
                onChange={(date) => handleChange("ngayDenFrom", date)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Hạn xử lý từ:</Col>
            <Col span={16}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD / MM / YYYY"
                style={{ width: "100%" }}
                onChange={(date) => handleChange("hanXuLyFrom", date)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Tên loại và trích yếu:</Col>
            <Col span={16}>
              <Input
                placeholder="Nhập trích yếu"
                onChange={(e) => handleChange("trichYeu", e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Tác giả:</Col>
            <Col span={16}>
              <Input
                placeholder="Nhập tác giả"
                onChange={(e) => handleChange("tacGia", e.target.value)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Ngày nhận đến:</Col>
            <Col span={16}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD / MM / YYYY"
                style={{ width: "100%" }}
                onChange={(date) => handleChange("ngayDenTo", date)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Hạn xử lý đến:</Col>
            <Col span={16}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD / MM / YYYY"
                style={{ width: "100%" }}
                onChange={(date) => handleChange("hanXuLyTo", date)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[16, 16]}>
            <Col span={8}>Tình trạng xử lý:</Col>
            <Col span={16}>
              <Select
                style={{ width: "100%" }}
                onChange={(value) => handleChange("tinhTrangXuLy", value)}
              >
                <Option value="">Tất cả</Option>
                <Option value="daxuly">Đã xử lý</Option>
                <Option value="chuaxuly">Chưa xử lý</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Button
          type="primary"
          style={{ background: "#00c013", borderColor: "#00c013" }}
          onClick={handleSearch}
          loading={loading}
        >
          <SearchOutlined /> Tìm kiếm
        </Button>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <span style={{ fontSize: 16 }}>
          Tìm thấy: <span style={{ color: "#ed1c24" }}>{data.length}</span>
        </span>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ marginTop: 16 }}
      />
    </DefaultLayout>
  );
};

export default Search;
