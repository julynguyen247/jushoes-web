import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import AppFooter from "./components/layout/app.footer";
import { useState } from "react";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default Layout;
