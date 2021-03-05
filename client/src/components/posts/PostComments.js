import React, { useEffect } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { Card } from "antd";
import { fetchComments } from "../../actions";

import _ from "lodash";
import CommentCreate from "./CommentCreate";

const PostComments = (props) => {
  useEffect(() => {
    props.fetchComments(props.postId);
  }, []);

  const renderComments = () => {
    if (props.comments) {
      return Object.entries(props.comments).map(([key, value]) => {
        return <Comment postId={props.postId} comment={value} key={key} />;
      });
    }
  };

  return (
    <Card style={{ marginTop: "5px" }}>
      <CommentCreate postId={props.postId} commentType="ROOT" />
      {renderComments()}
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    comments: _.pickBy(state.comments[ownProps.postId], (value) => {
      return value.comment_type === "ROOT";
    }),
  };
};

export default connect(mapStateToProps, { fetchComments })(PostComments);
