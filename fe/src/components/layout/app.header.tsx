import { Dropdown, Input, MenuProps, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FcDislike } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCurrentApp } from "../context/app.context";
import { logoutAPI } from "@/services/api";

const AppHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, isAuthenticated } = useCurrentApp();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  const items: MenuProps["items"] = isAuthenticated
    ? [
        { key: "1", label: <Link to="/admin">Admin</Link> },
        { key: "3", label: <Link to="/info">Change Info</Link> },
        { key: "4", label: <span onClick={() => handleLogout()}>Logout</span> },
      ]
    : [{ key: "2", label: <Link to="/login">Login</Link> }];

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-row h-[10vh] shadow-2xl bg-[#001A2D]">
        <div className="flex-[0.3] flex justify-center items-center gap-2">
          <FcDislike size={40} />
          <span className="font-bold text-white">Jushoes Shop</span>
        </div>
        <div className="flex-[0.4] flex items-center justify-center">
          <Input placeholder="Search..." />
        </div>
        <div className="flex-[0.3] flex items-center justify-center gap-8">
          <div className="relative">
            <div className="absolute -top-2 -right-2 bg-white rounded-full w-4 h-4 text-xs text-black flex items-center justify-center">
              0
            </div>
            <Popover content={content} title="Giỏ hàng">
              <FaShoppingCart size={20} color="white" />
            </Popover>
          </div>
          <div>
            <Dropdown menu={{ items }}>
              <Space>
                <FaUser size={20} color="white" />
                <span className="text-white">{user?.fullName}</span>
                <DownOutlined style={{ color: "white" }} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-[5vh] shadow bg-white justify-center items-center gap-10">
        {["Adidas", "Nike", "Puma", "Bitis", "Jordan", "Converse"].map(
          (brand) => (
            <Dropdown menu={{ items }} key={brand}>
              <Space>
                <span className="font-bold">{brand}</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          )
        )}
      </div>
    </div>
  );
};

export default AppHeader;
