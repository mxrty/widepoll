import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

import PostFeed from "../posts/PostFeed";
import RecentPosts from "../posts/RecentPosts";

const Home = (props) => {
  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <Link to={`/d/new`}>
          <Button>Create a new domain</Button>
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
        <RecentPosts />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, null)(Home);
