import {
	ClockCircleOutlined,
	FileTextOutlined,
	HomeOutlined,
	SearchOutlined,
	SendOutlined,
  } from "@ant-design/icons";
  import { Col, Input, Layout, Menu, Row } from "antd";
  import React from "react";
  import { Link, useLocation } from "react-router-dom";
  import logo from "../assets/img/logo.png";
  import maskGroup from "../assets/img/mask-group.png";
  
  const { Header, Sider, Content } = Layout;
  
  const DefaultLayout = ({ children }) => {
	const location = useLocation(); // Lấy đường dẫn hiện tại
  
	const getTitle = () => {
		switch (location.pathname) {
		  case "/incomingdocument":
			return "Công văn đến";
		  case "/outgoingdocument":
			return "Công văn đi";
		  case "/schedule":
			return "Lập lịch công tác";
		  case "/search":
			return "Tìm kiếm văn bản";
		  default:
			return "Trang chủ";
		}
	  };
	return (
	  <Layout style={{ minHeight: "100vh" }}>
		<Sider width={260} style={{ backgroundColor: "#96c2ff" }}>
		  <img src={logo} alt="Logo" style={{ height: 64, marginLeft: 20 }} />
		  <Menu
			mode="inline"
			selectedKeys={[location.pathname]} // Đặt key theo pathname
			style={{ backgroundColor: "#96c2ff", borderRight: 0 }}
		  >
			<Menu.Item key="/dashboard" icon={<HomeOutlined style={{ fontSize: 24 }} />}>
			  <Link to="/dashboard">Trang chủ</Link>
			</Menu.Item>
			<Menu.Item
			  key="/incomingdocument"
			  icon={<FileTextOutlined style={{ fontSize: 24 }} />}
			>
			  <Link to="/incomingdocument">Công văn đến</Link>
			</Menu.Item>
			<Menu.Item key="/outgoingdocument" icon={<SendOutlined style={{ fontSize: 24 }} />}>
			  <Link to="/outgoingdocument">Công văn đi</Link>
			</Menu.Item>
			<Menu.Item key="/schedule" icon={<ClockCircleOutlined style={{ fontSize: 24 }} />}>
			  <Link to="/schedule">Lập lịch công tác</Link>
			</Menu.Item>
			<Menu.Item key="/search" icon={<SearchOutlined style={{ fontSize: 24 }} />}>
			  <Link to="/search">Tìm kiếm văn bản</Link>
			</Menu.Item>
		  </Menu>
		</Sider>
		<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
		  <Header style={{ backgroundColor: "#96c2ff", padding: 0 }}>
			<Row justify="space-between" align="middle" style={{ height: "100%" }}>
			  <Col>
				<span
				  style={{
					fontSize: 34,
					fontFamily: "Times New Roman, Helvetica",
					color: "black",
					marginLeft: 20,
				  }}
				>
					{getTitle()}
				</span>
			  </Col>
			  <Col style={{ height: "100%", display: "flex", alignItems: "center" }}>
				<Input
				  placeholder="Search for something"
				  prefix={<SearchOutlined />}
				  style={{
					borderRadius: 40,
					backgroundColor: "#f4f6f9",
				  }}
				/>
				<img src={maskGroup} alt="Mask group" style={{ height: 40, marginLeft: 20, marginRight: 20 }} />
			  </Col>
			</Row>
		  </Header>
		  <Layout>
			<Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
			  {children}
			</Content>
		  </Layout>
		</div>
	  </Layout>
	);
  };
  
  export default DefaultLayout;
  