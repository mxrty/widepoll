import React from "react";
import { Row, Col } from "antd";

import ProfileBio from "./UserProfile/ProfileBio";
import ProfileFeed from "./UserProfile/ProfileFeed";
import RepCard from "./UserProfile/RepCard";

const UserProfile = (props) => {
  return (
    <>
      <Row justify="start">
        <Col>
          <ProfileBio userId={parseInt(props.match.params.userId)} />
        </Col>
        <Col flex="auto">
          <RepCard userId={parseInt(props.match.params.userId)} />
        </Col>
      </Row>
      <ProfileFeed userId={parseInt(props.match.params.userId)} />
    </>
  );
};

export default UserProfile;
