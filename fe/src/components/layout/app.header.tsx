import { FcDislike } from "react-icons/fc";
import { Dropdown, Input, MenuProps, Popover, Space } from "antd";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const AppHeader = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/admin">Admin</Link>,
    },
    {
      key: "2",
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "3",
      label: <Link to="/info">Change Info</Link>,
    },
  ];
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <div className="flex flex-col">
      <div className="flex flex-row  w-[100vw] h-[10vh] shadow-2xl bg-[#001A2D]">
        <div className=" flex-[0.3]  flex justify-center items-center">
          <FcDislike size={40} />
          <span className="font-bold  text-white">Jushoes Shop</span>
        </div>
        <div className="flex-[0.4] flex items-center justify-center">
          <Input placeholder="Search..." />
        </div>
        <div className="flex-[0.3] flex items-center justify-center gap-8">
          <div className="mb-4">
            <div className="bg-white rounded-full w-4 h-4 ml-5 flex justify-center items-center">
              <span className="text-black">0</span>
            </div>
            <Popover content={content} title="Title">
              <FaShoppingCart size={20} color="white" />
            </Popover>
          </div>
          <div>
            <Dropdown menu={{ items }}>
              <Space>
                <FaUser size={20} color="white" />
                <span className="text-white"> Settings</span>
                <DownOutlined style={{ color: "white" }} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-[100vw] h-[5vh] shadow-2xl bg-white justify-center items-center gap-10">
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Adidas</span>
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Nike</span>
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Puma</span>
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Bitis</span>
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Jordan</span>
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <span className="font-bold"> Converse</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default AppHeader;
