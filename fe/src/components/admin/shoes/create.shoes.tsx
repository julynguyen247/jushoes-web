import { useState } from "react";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { createShoesAPI, createUserAPI } from "@/services/api";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
}

type FieldType = {
  mainText: string;
  brand: string;
  price: number;
  quantity: number;
};

const CreateShoes = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { mainText, brand, price, quantity } = values;
    setIsSubmit(true);
    const res = await createShoesAPI(mainText, brand, price, quantity);
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      form.resetFields();
      setOpenModalCreate(false);
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          form.resetFields();
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />

        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="MainText"
            name="mainText"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Price"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập gia!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số luong!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateShoes;
