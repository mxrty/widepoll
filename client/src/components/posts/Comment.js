import React, { useState } from "react";
import { connect } from "react-redux";
import { Comment as AntComment, Avatar, Tooltip, Space } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import CommentCreate from "./CommentCreate";
import { likeComment, unlikeComment } from "../../actions";
import SentimentEditor from "../app/SentimentEditor";

import _ from "lodash";
import TimeAgo from "timeago-react";

const MyComment = (props) => {
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState(false);
  const [showSubmitSentiment, setShowSubmitSentiment] = useState(false);

  const onSentimentChange = (changed) => {
    setShowSubmitSentiment(changed);
  };

  const like = () => {
    if (!liked) {
      setLiked(true);
      props.likeComment(props.comment.comment_id, props.postId);
    } else {
      setLiked(false);
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
    <Space>
      {" "}
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {liked ? <LikeFilled /> : <LikeOutlined />}
          <span className="comment-action">{props.likes}</span>
        </span>
      </Tooltip>
      <TimeAgo key="comment-created-at" datetime={props.comment.created_at} />
      <a
        onClick={() => {
          setReply(!reply);
        }}
      >
        Reply to
      </a>
      {showSubmitSentiment ? (
        <a
          onClick={() => {
            //setShowSubmitSentiment(!showSubmitSentiment);
          }}
        >
          Submit sentiment
        </a>
      ) : null}
    </Space>,
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
        content={
          <SentimentEditor
            textValue={props.comment.comment_body}
            onSentimentChange={onSentimentChange}
          />
        }
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
