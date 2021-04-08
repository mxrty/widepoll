import React from "react";
import { Card, Avatar, Row, Col, Space } from "antd";

import { UserOutlined } from "@ant-design/icons";

const ProfileBio = (props) => {
  return (
    <Card>
      <Space direction="vertical">
        <h1>Profile name</h1>
        <Avatar shape="square" size={64} icon={<UserOutlined />} />
        <div>
          Profile name is a leading researcher in monkeys. Representing Mars U.
        </div>
        <Row>
          <Col span={12}>
            <Row>Followers</Row>
            <Row>45</Row>
          </Col>
          <Col span={12}>
            <Row>Joined</Row>
            <Row>3 weeks ago</Row>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default ProfileBio;
