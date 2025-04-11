import React from "react";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  DollarCircleOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout: React.FC = () => {
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
              label: <Link to="/admin/users">Orders</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px" }}>
          <h1 className="text-lg font-semibold">Quản trị hệ thống</h1>
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
