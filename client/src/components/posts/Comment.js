import React, { useState } from "react";
import { connect } from "react-redux";
import { Comment as _Comment, Avatar, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import CommentCreate from "./CommentCreate";
import { likeComment, unlikeComment } from "../../actions";
import _ from "lodash";

const Comment = (props) => {
  const [likes, setLikes] = useState(parseInt(props.comment.likes));
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(false);

  const like = () => {
    if (action !== "liked") {
      setLikes(likes + 1);
      setAction("liked");
      likeComment(props.comment.comment_id);
    } else {
      setLikes(likes - 1);
      setAction(null);
      unlikeComment(props.comment.comment_id);
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
    if (props.comment.childComments) {
      console.log(props.comment.childComments);
      return props.comment.childComments;
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
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

  return (
    <_Comment
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
    </_Comment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { userId: state.auth.user_id };
};

const MyComment = connect(mapStateToProps, null)(Comment);

export default MyComment;
