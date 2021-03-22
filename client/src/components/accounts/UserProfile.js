import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
            return <div key={follower.follower_id}>{follower.follower_id}</div>;
          })}
        </Card>
      );
  };

  const renderFollowing = () => {
    if (props.user.following.length > 0)
      return (
        <Card title="Following">
          {props.user.following.map((rep) => {
            return <div key={rep.rep_id}>{rep.rep_id}</div>;
          })}
        </Card>
      );
  };

  const renderDomainsRepresented = () => {
    //if (props.user.user_id !== props.currentUserId) {
    // AND not already following
    return props.user.domainsRepresented.map((domain) => {
      return (
        <Space>
          <Link to={`/d/${domain.domain}`}>{`/d/${domain.domain}`}</Link>
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
        </Space>
      );
    });
    //}
  };

  const renderRepSection = () => {
    if (props.user.isRep) {
      return (
        <Card
          title={`${props.user.user_name} is a representative in the following domains:`}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {renderDomainsRepresented()}
            {renderFollowers()}
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
        {renderFollowing()}
        {renderRepSection()}
      </div>
    );
  }
  return <div data-testid="default">No user for this id.</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.userId],
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUser, followRep })(UserProfile);
