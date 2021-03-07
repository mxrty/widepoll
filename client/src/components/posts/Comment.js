import React, { useState } from "react";
import { connect } from "react-redux";
import { Comment as AntComment, Avatar, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import CommentCreate from "./CommentCreate";
import { likeComment, unlikeComment } from "../../actions";
import _ from "lodash";

const MyComment = (props) => {
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(false);

  const like = () => {
    if (action !== "liked") {
      setAction("liked");
      props.likeComment(props.comment.comment_id, props.postId);
    } else {
      setAction(null);
      props.unlikeComment(props.comment.comment_id, props.postId);
    }
  };

  const showReply = () => {
    if (reply)
      return (
        <CommentCreate
          postId={props.postId}
          commentType="REPLY"
          parentId={props.comment.comment_id}
        />
      );
  };

  const renderChildren = () => {
    if (props.children) {
      return Object.entries(props.children).map(([key, value]) => {
        return <Comment postId={props.postId} comment={value} key={key} />;
      });
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{props.likes}</span>
      </span>
    </Tooltip>,
    <span
      key="comment-basic-reply-to"
      onClick={() => {
        setReply(!reply);
      }}
    >
      Reply to
    </span>,
  ];

  if (props.likes !== null) {
    return (
      <AntComment
        actions={actions}
        author={<a>#{props.comment.comment_id}</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={<p>{props.comment.comment_body}</p>}
      >
        {showReply()}
        {renderChildren()}
      </AntComment>
    );
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.user_id,
    likes:
      state.comments[ownProps.comment.post_id][ownProps.comment.comment_id]
        .likes,
    children: _.pickBy(state.comments[ownProps.comment.post_id], (value) => {
      return _.includes(ownProps.comment.children, value.comment_id);
    }),
  };
};

const Comment = connect(mapStateToProps, { likeComment, unlikeComment })(
  MyComment
);

export default Comment;
