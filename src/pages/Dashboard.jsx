import {
  ClockCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Layout, Menu, Row } from "antd";
import React from "react";
import calendar from "../assets/img/calendar.svg";
import graphDown from "../assets/img/graph-down.svg";
import graphUp from "../assets/img/graph-up.svg";
import logo from "../assets/img/logo.png";
import maskGroup from "../assets/img/mask-group.png";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Dashbroard = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <Row gutter={[16, 16]} justify="center">
        <Col span={8}>
          <Card
            hoverable
            onClick={() => navigate("/incomingdocument")}
            style={{
              borderRadius: 20,
              backgroundColor: "#96c2ff",
              textAlign: "center",
            }}
            cover={
              <img
                alt="Graph down"
                src={graphDown}
                style={{ height: 200, margin: "20px auto" }}
              />
            }
          >
            <Card.Meta
              title="Công văn đến"
              style={{
                fontSize: 26,
                fontFamily: "Times New Roman, Helvetica",
                color: "black",
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            onClick={() => navigate("/outgoingdocument")}
            style={{
              borderRadius: 20,
              backgroundColor: "#96c2ff",
              textAlign: "center",
            }}
            cover={
              <img
                alt="Graph up"
                src={graphUp}
                style={{ height: 200, margin: "20px auto" }}
              />
            }
          >
            <Card.Meta
              title="Công văn đi"
              style={{
                fontSize: 26,
                fontFamily: "Times New Roman, Helvetica",
                color: "black",
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            onClick={() => navigate("/schedule")}
            style={{
              borderRadius: 20,
              backgroundColor: "#96c2ff",
              textAlign: "center",
            }}
            cover={
              <img
                alt="Calendar"
                src={calendar}
                style={{ height: 200, margin: "20px auto" }}
              />
            }
          >
            <Card.Meta
              title="Lập lịch công tác"
              style={{
                fontSize: 26,
                fontFamily: "Times New Roman, Helvetica",
                color: "black",
              }}
            />
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Dashbroard;
