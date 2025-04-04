import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const RegisterPage = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
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
            labelCol={{
              span: 24,
            }}
            wrapperCol={{ span: 24 }}
            label="Confirm Password"
            name="confirmPassword"
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
              Sign up
            </Button>
          </Form.Item>
          Had an acoount?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
