import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import Dashbroard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../utils/api";

const { Title } = Typography;
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginApi(email, password);

    if (res && res.data.EC === 0) {
      localStorage.setItem("access_token", res.data.access_token);
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      navigate("/dashboard");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "error",
      });
    }

    console.log("Success:", values);
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      <Row justify="center" style={{ marginBottom: 20, padding: 20, backgroundColor: "#96C2FF"}}>
        <Title>
          QUẢN LÝ VĂN BẢN
        </Title>
      </Row>
      <Row justify="center" style={{ marginBottom: 20, padding: 40 }}>
      <Card
        style={{
          width: 400,
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: 10,
          backgroundColor: "#fff",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Đăng nhập
        </Title>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                borderRadius: 5,
                backgroundColor: "#96C2FF",
                color: "black"
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
      </Row>
      
    </div>
  );
};
export default Login;
