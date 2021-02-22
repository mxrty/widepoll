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

const structureComments = (state, ownProps) => {
  const structured = {
    ..._.pickBy(state.posts[ownProps.postId].comments, (value) => {
      return value.comment_type === "ROOT";
    }),
  };

  for (let [key, comment] of Object.entries(structured)) {
    comment.children = [<Comment />];
  }

  //function to set comment props (children)
  //findChildren(structured, state.posts[ownProps.postId].comments);

  return structured;
};

const findChildren = (parents, reference) => {
  for (let [key, comment] of Object.entries(parents)) {
    const children = comment.children;
    if (children) {
      const childComments = {
        ..._.pickBy(reference, (value) => {
          return _.includes(children, value.comment_id);
        }),
      };
      console.log(childComments);
      console.log(
        Object.entries(childComments).map(([key, value]) => {
          return <Comment postId={value.post_id} comment={value} key={key} />;
        })
      );

      comment.childComments = Object.entries(childComments).map(
        ([key, value]) => {
          return <Comment postId={value.post_id} comment={value} key={key} />;
        }
      );
      findChildren(comment.children, reference);
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    comments: structureComments(_.cloneDeep(state), ownProps),
  };
};

export default connect(mapStateToProps, { fetchComments })(PostComments);
