import React, { useState } from "react";
import { Comment as CommentComponent, Avatar, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import CommentCreate from "./CommentCreate";
import _ from "lodash";

const Comment = (props) => {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(false);

  const like = () => {
    if (likes === 0) {
      setLikes(1);
      setAction("liked");
    } else {
      setLikes(0);
      setAction(null);
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
    if (props.comment.children) {
      return Object.entries(props.comment.children).map(([key, value]) => {
        return <Comment postId={props.postId} comment={value} key={key} />;
      });
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
    <CommentComponent
      actions={actions}
      author={<a>{props.comment.comment_id}</a>}
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
    </CommentComponent>
  );
};

export default Comment;
