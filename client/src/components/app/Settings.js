import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";

import { becomeRep } from "../../actions";

const Settings = (props) => {
  return (
    <>
      <h1>Settings</h1>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isRep: state.auth.isRep,
  };
};

export default connect(mapStateToProps, { becomeRep })(Settings);
