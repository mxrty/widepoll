import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "antd";

import { fetchPost, fetchUser } from "../../actions";
import PostComments from "./PostComments";
import SolutionList from "../solutions/SolutionList";
import DomainBlurb from "../domains/DomainBlurb";

const PostShow = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.postId);
  }, []);

  useEffect(() => {
    if (props.post) {
      props.fetchUser(props.post.author);
    }
  }, [props.post]);

  const renderPostBody = () => {
    if (props.post) {
      return (
        <>
          <Card type="inner">
            <h2>{props.post.title}</h2>
            <p>{props.post.post_body}</p>
            {props.user ? <small>{props.user.user_name}</small> : null}
          </Card>
          <PostComments postId={props.post.post_id} />
        </>
      );
    }
  };

  const renderSolutions = () => {
    if (props.post) {
      return (
        <SolutionList postId={props.post.post_id} domain={props.post.domain} />
      );
    }
  };

  if (!props.post) return <div>Loading...</div>;
  if (props.post.post_type === "DISCUSSION") {
    return (
      <Row>
        <Col span={14} style={{ padding: "5px" }}>
          {renderPostBody()}
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
        </Col>
        <Col span={8} style={{ padding: "5px" }}>
          {renderSolutions()}
        </Col>
      </Row>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.match.params.postId],
    user: ownProps.post ? state.users[ownProps.post.author] : null,
  };
};

export default connect(mapStateToProps, { fetchPost, fetchUser })(PostShow);
