import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/global.css"
import ReactDOM from "react-dom/client";
import Layout from "./layout";
import LoginPage from "./pages/client/login";
import HomePage from "./pages/client/home";
import RegisterPage from "./pages/client/register";
import { App } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [{ index: true, Component: HomePage }, {}],
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
    <RouterProvider router={router} />
  </App>
);
