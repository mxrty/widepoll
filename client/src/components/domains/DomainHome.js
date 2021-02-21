import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

import PostFeed from "../posts/PostFeed";
import DomainBlurb from "../domains/DomainBlurb";

const DomainHome = (props) => {
  const renderCreate = () => {
    if (props.isSignedIn) {
      const domain = props.match.params.domain;
      return (
        <Link to={`/d/${domain}/posts/new`}>
          <Button>Create Post</Button>
        </Link>
      );
    }
  };

  return (
    <Row>
      <Col span={18} style={{ padding: "5px" }}>
        <PostFeed />
      </Col>
      <Col span={6} style={{ padding: "5px" }}>
        {renderCreate()}
        <DomainBlurb domain={props.match.params.domain} />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, null)(DomainHome);
