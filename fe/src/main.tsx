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
import Protected from "./components/auth";

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
      {
        index: true,
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "users",
        element: (
          <Protected>
            <Users />
          </Protected>
        ),
      },
      {
        path: "shoes",
        element: (
          <Protected>
            <Shoes />
          </Protected>
        ),
      },
      {
        path: "orders",
        element: (
          <Protected>
            <Orders />
          </Protected>
        ),
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
