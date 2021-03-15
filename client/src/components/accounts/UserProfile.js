import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser, followRep } from "../../actions";
import { Avatar, Skeleton, Row, Col, Card, Button, Modal, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfile = (props) => {
  useEffect(() => {
    props.fetchUser(props.match.params.userId);
  }, []);

  const [visible, setVisible] = useState(false);

  const renderFollowers = () => {
    if (props.user.followers.length > 0)
      return (
        <Card title="Followers">
          {props.user.followers.map((follower) => {
            return <div>{follower.follower_id}</div>;
          })}
        </Card>
      );
  };

  const renderFollowing = () => {
    if (props.user.following.length > 0)
      return (
        <Card title="Following">
          {props.user.following.map((rep) => {
            return <div>{rep.rep_id}</div>;
          })}
        </Card>
      );
  };

  const renderFollowButton = () => {
    if (props.user.user_id !== props.currentUserId) {
      // AND not already following
      return (
        <>
          <Button
            type="primary"
            onClick={() => {
              if (props.isSignedIn) {
                setVisible(true);
              }
            }}
          >
            + Follow
          </Button>
          <Modal
            title="Choose how you want to follow"
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
                  props.followRep(props.user.user_id, true);
                }}
              >
                Opt-in
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  props.followRep(props.user.user_id, false);
                }}
              >
                Opt-out
              </Button>
            </Space>
          </Modal>
        </>
      );
    }
  };

  const renderRepSection = () => {
    if (props.user.isRep) {
      return (
        <Card title={`${props.user.user_name} is a representative.`}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {renderFollowButton()}
            {renderFollowers()}
            {renderFollowing()}
            <ul>
              <li>Recent Votes/Activity</li>
            </ul>
          </Space>
        </Card>
      );
    }
  };

  if (props.user) {
    return (
      <div>
        <h1>{props.user.user_name}'s profile</h1>
        <Row>
          <Col flex="80px">
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <Skeleton />
          </Col>
        </Row>
        {renderRepSection()}
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.userId],
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUser, followRep })(UserProfile);
