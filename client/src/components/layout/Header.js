import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import { signIn, register, signOut } from "../../actions";

const Header = (props) => {
  const renderAuth = () => {
    if (!props.isSignedIn) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/login" style={{ color: "white", padding: "12px" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white", padding: "12px" }}>
            Register
          </Link>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "white", padding: "12px" }}>
            Hello {props.userName}
          </div>
          <a
            onClick={() => {
              props.signOut();
            }}
            style={{ color: "white", padding: "12px" }}
          >
            Logout
          </a>
        </div>
      );
    }
  };

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
      <Link to="/">
        <h1
          style={{
            color: "white",
          }}
        >
          Widepoll
        </h1>
      </Link>
      {renderAuth()}
    </Layout.Header>
  );
};

const mapStateToProps = (state) => {
  return {
    userName: state.auth.user_name,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, register, signOut })(Header);
