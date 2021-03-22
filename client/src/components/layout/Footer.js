import React from "react";
import { Layout } from "antd";

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        position: "absolute",
        width: "100%",
        bottom: "0",
        height: "60px",
      }}
    >
      widepoll ©2021 created by @mxrty
    </Layout.Footer>
  );
};

export default Footer;
