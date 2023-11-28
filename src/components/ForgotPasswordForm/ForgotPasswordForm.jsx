import { Form, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  function handleSubmit(values, userId) {
    const { password, confirmPassword } = values;
    api
      .put("password/new", {
        id: userId,
        password,
        confirmPassword,
      })
      .then(() => {
        success("Password reset successfully!");
        form.resetFields();
        navigate("/");
      })
      .catch((err) => {
        error(err.response.statusText);
      });
  }

  return (
    <div>
      {contextHolder}
      <h1
        style={{ textAlign: "center", fontSize: "24px", margin: "24px 0 12px" }}
      >
        Forgot Password Form
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onFinish={(values) => handleSubmit(values, userId)}
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{
            width: "100%",
            maxWidth: 500,
          }}
          layout="vertical"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Field */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export { ForgotPasswordForm };
