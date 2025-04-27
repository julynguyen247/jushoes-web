import { useState } from "react";
import {
  App,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Upload,
  UploadFile,
} from "antd";
import type { FormProps, GetProp, UploadProps } from "antd";
import { createShoesAPI, createUserAPI, uploadFileAPI } from "@/services/api";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  thumbnail: any;
  slider: any;
};

const CreateShoes = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { message, notification } = App.useApp();
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  type UserUploadType = "thumbnail" | "slider";
  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([]);
  const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([]);
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [loadingSlider, setLoadingSlider] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { mainText, brand, price, quantity } = values;
    const thumbnail = fileListThumbnail?.[0]?.name ?? "";
    const slider = fileListSlider?.map((item) => item.name) ?? [];
    setIsSubmit(true);
    const res = await createShoesAPI(
      mainText,
      brand,
      price,
      quantity,
      thumbnail,
      slider
    );
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      setFileListSlider([]);
      setFileListThumbnail([]);
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
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadFile = async (
    options: RcCustomRequestOptions,
    type: UserUploadType
  ) => {
    const { onSuccess } = options;
    const file = options.file as UploadFile;
    const res = await uploadFileAPI(file, "shoes");
    if (res && res.data) {
      const uploadedFile: any = {
        uid: file.uid,
        name: res.data.fileUploaded,
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}/public/images/shoes/${
          res.data.fileUploaded
        }`,
      };
      if (type === "thumbnail") {
        setFileListThumbnail({ ...uploadedFile });
      } else {
        setFileListSlider((prevState) => [...prevState, { ...uploadedFile }]);
      }
      if (onSuccess) onSuccess("ok");
    } else {
      message.error(res.message);
    }
  };
  const handleChange = (info: UploadChangeParam, type: UserUploadType) => {
    if (info.file.status === "uploading") {
      type === "slider" ? setLoadingSlider(true) : setLoadingThumbnail(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      type === "slider" ? setLoadingSlider(false) : setLoadingThumbnail(false);
    }
  };
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handleRemove = (file: UploadFile, type: UserUploadType) => {
    if (type === "thumbnail") {
      setFileListThumbnail([]);
    } else {
      const slider = fileListSlider.filter((item) => item.uid !== file.uid);
      setFileListSlider(slider);
    }
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          <Form.Item<FieldType>
            labelCol={{ span: 12 }}
            label="Thumbnail"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số luong!" }]}
          >
            <Upload
              listType="picture-card"
              className="thumbnail-uploader"
              maxCount={1}
              multiple={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
              customRequest={(options) =>
                handleUploadFile(options, "thumbnail")
              }
              fileList={fileListThumbnail}
              onChange={(info) => handleChange(info, "thumbnail")}
              onRemove={(file) => handleRemove(file, "thumbnail")}
            >
              <div>
                {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default CreateShoes;
