import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Avatar, Row, Col, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TimeAgo from "timeago-react";

import { fetchUser } from "../../../actions";

const ProfileBio = ({ fetchUser, userId, user }) => {
  useEffect(() => {
    fetchUser(userId);
  }, []);

  if (user) {
    return (
      <Card>
        <Space direction="vertical">
          <h1>{user.user_name}</h1>
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
          <Row>
            <Col span={12}>
              <Row>Followers</Row>
              <Row>{user.followers.length}</Row>
            </Col>
            <Col span={12}>
              <Row>Joined</Row>
              <Row>
                <TimeAgo key="user-joined-at" datetime={user.joined} />
              </Row>
            </Col>
          </Row>
        </Space>
      </Card>
    );
  } else {
    return <Card>No user found with id {userId}</Card>;
  }
};

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.userId] };
};

export default connect(mapStateToProps, { fetchUser })(ProfileBio);
