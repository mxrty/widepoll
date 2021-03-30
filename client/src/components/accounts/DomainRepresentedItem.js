import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followRep } from "../../actions";
import { Button, Modal, Space } from "antd";

const DomainRepresentedItem = (props) => {
  const [visible, setVisible] = useState(false);

  const renderFollowButton = () => {
    if (!props.disabled) {
      return (
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          + Follow
        </Button>
      );
    }
  };

  if (props.userId && props.domain) {
    return (
      <Space>
        <Link to={`/d/${props.domain}`}>{`/d/${props.domain}`}</Link>
        {renderFollowButton()}
        <Modal
          title={`Choose how you want to follow /d/${props.domain}`}
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          footer={null}
        >
          <Space>
            <Button
              type="primary"
              onClick={() => {
                props.followRep(props.userId, true, props.domain);
              }}
            >
              Opt-in
            </Button>
            <Button
              type="primary"
              onClick={() => {
                props.followRep(props.userId, false, props.domain);
              }}
            >
              Opt-out
            </Button>
          </Space>
        </Modal>
      </Space>
    );
  }
  return null;
};

export default connect(null, { followRep })(DomainRepresentedItem);
