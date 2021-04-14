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
          <div>Live. Love. Laugh. I like pizza, dogs and politics.</div>
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
