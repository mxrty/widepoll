import React from "react";
import { Link } from "react-router-dom";
import { Row } from "antd";

const SideMenu = () => {
  return (
    <div style={{ position: "fixed" }}>
      {/* <Row>
        <Link to="/search">
          <h2>Search</h2>
        </Link>
      </Row> */}
      <Row>
        <Link to="/explore">
          <h2>Explore</h2>
        </Link>
      </Row>
      <Row>
        <Link to="/polls/new">
          <h2>Poll</h2>
        </Link>
      </Row>
      {/* <Row>
        <Link to="/settings">
          <h2>Settings</h2>
        </Link>
      </Row> */}
    </div>
  );
};

export default SideMenu;
