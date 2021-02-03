import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Layout.Header
      style={{
        position: "fixed",
        zIndex: 9001,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Logo
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      </div>
    </Layout.Header>
  );
};

export default Header;
