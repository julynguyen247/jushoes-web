import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/global.css";
import ReactDOM from "react-dom/client";
import Layout from "./layout";
import LoginPage from "./pages/client/login";
import HomePage from "./pages/client/home";
import RegisterPage from "./pages/client/register";
import { App, ConfigProvider } from "antd";
import AdminLayout from "./components/layout/layout.admin";
import Dashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Shoes from "./pages/admin/shoes";
import Orders from "./pages/admin/orders";
import enUS from "antd/es/locale/en_US";
import { AppProvider } from "./components/context/app.context";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      {
        path: "/admin/users",
        Component: Users,
      },
      {
        path: "/admin/shoes",
        Component: Shoes,
      },
      {
        path: "/admin/orders",
        Component: Orders,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <App>
    <AppProvider>
      <ConfigProvider locale={enUS}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AppProvider>
  </App>
);
