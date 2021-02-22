import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "antd";

import { fetchPost } from "../../actions";
import PostComments from "./PostComments";
import SolutionList from "./SolutionList";
import DomainBlurb from "../domains/DomainBlurb";

const PostShow = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.postId);
  }, []);

  const renderPostBody = () => {
    if (props.post) {
      return (
        <Card type="inner" title={props.post.title}>
          <p>{props.post.post_body}</p>
        </Card>
      );
    }
  };

  if (!props.post) return <div>Loading...</div>;
  if (props.post.post_type === "DISCUSSION") {
    return (
      <Row>
        <Col span={14} style={{ padding: "5px" }}>
          {renderPostBody()}
          <PostComments postId={props.post.post_id} />
        </Col>
        <Col span={6} style={{ padding: "5px" }}>
          <DomainBlurb />
        </Col>
      </Row>
    );
  } else if (props.post.post_type === "ISSUE") {
    return (
      <Row>
        <Col span={14} style={{ padding: "5px" }}>
          {renderPostBody()}
          <PostComments postId={props.post.post_id} />
        </Col>
        <Col span={8} style={{ padding: "5px" }}>
          <SolutionList solutions={props.post.solutions} />
        </Col>
      </Row>
    );
  } else if (props.post.post_type === "SOLUTION") {
  }
};

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.postId] };
};

export default connect(mapStateToProps, { fetchPost })(PostShow);
