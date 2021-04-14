import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followRep } from "../../../actions";
import { Button, Modal, Space, Tooltip } from "antd";

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
          title={`Choose follow type for /d/${props.domain}`}
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          footer={null}
        >
          <Space>
            <Tooltip title="The representative will vote on your behalf for this domain">
              <Button
                type="primary"
                onClick={() => {
                  props.followRep(props.userId, true, props.domain);
                  setVisible(false);
                }}
              >
                Auto
              </Button>
            </Tooltip>
            <Tooltip title="The representative's votes will be queued, and can be approved or rejected later">
              <Button
                type="primary"
                onClick={() => {
                  props.followRep(props.userId, false, props.domain);
                  setVisible(false);
                }}
              >
                Manual
              </Button>
            </Tooltip>
          </Space>
        </Modal>
      </Space>
    );
  }
  return null;
};

export default connect(null, { followRep })(DomainRepresentedItem);
