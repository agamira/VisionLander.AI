import { Link } from "react-router-dom";
import "./LogIn.scss";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
const onFinish = async (values) => {
  console.log("Success:", values);

  try {
    const res = await axios.post("http://localhost:3000/login", values);
    const data = await res.data;
  } catch (error) {
    console.log(error);
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LogIn = () => (
  <main className="login-page">
    <section>
      <div className="container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            minWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to={"/"} className="btn btn--primary">
              Go Back
            </Link>
          </Form.Item>
        </Form>
      </div>
    </section>
  </main>
);

export { LogIn };
