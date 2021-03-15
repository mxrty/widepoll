import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";

import { becomeRep } from "../../actions";

const Settings = (props) => {
  const renderRep = () => {
    if (props.isSignedIn && !props.isRep) {
      return (
        <Button
          type="primary"
          danger
          onClick={() => {
            props.becomeRep();
          }}
        >
          Become a representative
        </Button>
      );
    }
  };
  return (
    <>
      <h1>Settings</h1>
      <Card>{renderRep()}</Card>
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
