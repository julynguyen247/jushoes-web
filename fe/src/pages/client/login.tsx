import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-1 h-[100vh] w-[100vw]">
      <div className="bg-gray-200 rounded-2xl p-12 w-[30vw]">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          labelCol={{ span: 24 }}
        >
          <Form.Item<FieldType>
            labelCol={{
              span: 24,
            }}
            wrapperCol={{ span: 24 }}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{
              span: 24,
            }}
            wrapperCol={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={null}
            wrapperCol={{ span: 24 }}
            labelCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          Don't have an acoount?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer"
          >
            Sign up
          </span>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
