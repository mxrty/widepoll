import React, { useState } from "react";
import { connect } from "react-redux";
import { Comment as AntComment, Avatar, Tooltip, Space } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import CommentCreate from "./CommentCreate";
import { likeComment, unlikeComment, createSentiment } from "../../actions";
import SentimentEditor from "../app/SentimentEditor";

import _ from "lodash";
import TimeAgo from "timeago-react";

const MyComment = (props) => {
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState(false);
  const [showSubmitSentiment, setShowSubmitSentiment] = useState(false);
  const [sentiment, setSentiment] = useState();

  const onSentimentChange = (changed, sentiment) => {
    setShowSubmitSentiment(changed);
    setSentiment(sentiment);
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
        return (
          <Comment
            postId={props.postId}
            comment={value}
            key={key}
            sentimentView={props.sentimentView ? true : undefined}
          />
        );
      });
    }
  };

  const actions = [
    <Space>
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
            props.createSentiment(props.comment.comment_id, sentiment);
          }}
        >
          Submit sentiment
        </a>
      ) : null}
    </Space>,
  ];

  const stackSentiments = (sentiments) => {
    const stack = props.comment.comment_body.split("").map((char) => {
      return { char: char, agree: 0, disagree: 0, bias: 0 };
    });

    if (sentiments[0]) {
      sentiments.forEach((element) => {
        let userSentiment = element[0].children;
        let index = 0;
        userSentiment.forEach((section) => {
          let agree = !!section.highlightAgree;
          let disagree = !!section.highlightDisagree;
          let bias = !!section.highlightBias;

          let sectionLength = section.text.length;

          var i;
          for (i = index; i < index + sectionLength; i++) {
            if (agree) {
              stack[i].agree++;
            } else if (disagree) {
              stack[i].disagree++;
            } else if (bias) {
              stack[i].bias++;
            }
          }
          index += sectionLength;
        });
      });
    }

    return stack;
  };

  const formatSentiment = () => {
    if (!props.sentiments) {
      return props.comment.comment_body;
    } else {
      const stackedSentiments = stackSentiments(props.sentiments);
      console.log(stackedSentiments);
      return "SENTIMENT";
    }
  };

  if (props.likes !== null) {
    if (!props.sentimentView) {
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
    } else {
      return (
        <AntComment
          actions={[
            <Space>
              <TimeAgo
                key="comment-created-at"
                datetime={props.comment.created_at}
              />
            </Space>,
          ]}
          author={<a>#{props.comment.comment_id}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={formatSentiment()}
        >
          {renderChildren()}
        </AntComment>
      );
    }
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
    sentiments:
      ownProps.sentimentView &&
      state.sentiments[ownProps.comment.post_id][ownProps.comment.comment_id]
        ? state.sentiments[ownProps.comment.post_id][
            ownProps.comment.comment_id
          ]
        : undefined,
  };
};

const Comment = connect(mapStateToProps, {
  likeComment,
  unlikeComment,
  createSentiment,
})(MyComment);

export default Comment;
