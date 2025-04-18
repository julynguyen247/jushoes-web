import React from "react";
import {
  DashboardOutlined,
  UserOutlined,
  DollarCircleOutlined,
  ExceptionOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MenuProps } from "antd/lib";

const AdminLayout: React.FC = () => {
  const items: MenuProps["items"] = [
    { key: "1", label: <Link to="/admin">Admin</Link> },
    { key: "2", label: <Link to="/login">Login</Link> },
    { key: "3", label: <Link to="/info">Change Info</Link> },
  ];
  const { Header, Sider, Content, Footer } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="text-white text-xl font-bold text-center my-4">
          Admin Panel
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Users</Link>,
            },
            {
              key: "3",
              icon: <ExceptionOutlined />,
              label: <Link to="/admin/shoes">Shoes</Link>,
            },
            {
              key: "4",
              icon: <DollarCircleOutlined />,
              label: <Link to="/admin/orders">Orders</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "white",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span className="font-medium text-2xl">Management Page</span>
          </div>
          <Dropdown menu={{ items }}>
            <Space>
              <FaUser size={20} />
              <span> Settings</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Jushoes Admin ©{new Date().getFullYear()} Created by You 😎
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
