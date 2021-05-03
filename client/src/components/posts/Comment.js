import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment as AntComment, Avatar, Tooltip, Space } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import _ from "lodash";
import TimeAgo from "timeago-react";

import CommentCreate from "./CommentCreate";
import { likeComment, unlikeComment, createSentiment } from "../../actions";
import SentimentEditor from "../app/SentimentEditor";

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
            props.createSentiment(
              props.comment.post_id,
              props.comment.comment_id,
              sentiment
            );
          }}
        >
          Submit sentiment
        </a>
      ) : null}
    </Space>,
  ];

  // const interpolateColours = (colour1, colour2, ratio) => {
  //   const toHex = (colour) => {
  //     const colourString = colour.toString(16);
  //     return colourString.length === 1 ? `0${colourString}` : colourString;
  //   };

  //   let r = Math.ceil(
  //     parseInt(colour2.substring(0, 2), 16) * ratio +
  //       parseInt(colour1.substring(0, 2), 16) * (1 - ratio)
  //   );
  //   let g = Math.ceil(
  //     parseInt(colour2.substring(2, 4), 16) * ratio +
  //       parseInt(colour1.substring(2, 4), 16) * (1 - ratio)
  //   );
  //   let b = Math.ceil(
  //     parseInt(colour2.substring(4, 6), 16) * ratio +
  //       parseInt(colour1.substring(4, 6), 16) * (1 - ratio)
  //   );

  //   return toHex(r) + toHex(g) + toHex(b);
  // };

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
      const sentimentCount = props.sentiments.length;

      return stackedSentiments.map((char, index) => {
        let diff = char.agree - char.disagree;
        let underline = char.bias > 0 ? "2px solid #FF9C15" : "";
        let highlight = "transparent";
        let tooltipText = `Agree: ${char.agree} Disagree: ${char.disagree} Bias: ${char.bias}`;

        // min red, max red etc
        let green = "#549E37";
        let grey = "#A7AFB6";
        let red = "#BA4D36";

        if (diff === 0 && char.agree > 0) {
          highlight = grey;
        } else if (diff > 0) {
          highlight = green;
          // highlight = interpolateColours(
          //   grey,
          //   green,
          //   char.agree / sentimentCount
          // );
        } else if (diff < 0) {
          highlight = red;
          // highlight = interpolateColours(
          //   red,
          //   grey,
          //   char.disagree / sentimentCount
          // );
        }

        return (
          <Tooltip key={index} title={tooltipText}>
            <mark
              style={{
                backgroundColor: highlight,
                padding: "0 0",
                borderBottom: underline,
              }}
            >
              {char.char}
            </mark>
          </Tooltip>
        );
      });
    }
  };

  if (props.likes !== null) {
    if (!props.sentimentView) {
      return (
        <AntComment
          actions={actions}
          author={
            <Link to={`/user/${props.comment.author}`}>
              #{props.comment.comment_id}{" "}
              <i>
                submitted by {props.comment.author_name}{" "}
                <TimeAgo
                  key="comment-created-at"
                  datetime={props.comment.created_at}
                />
              </i>
            </Link>
          }
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
          author={
            <Link to={`/user/${props.comment.author}`}>
              #{props.comment.comment_id}{" "}
              <i>
                submitted by {props.comment.author_name}{" "}
                <TimeAgo
                  key="comment-created-at"
                  datetime={props.comment.created_at}
                />
              </i>
            </Link>
          }
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
    likes:
      state.comments[ownProps.comment.post_id][ownProps.comment.comment_id]
        .likes,
    children: _.pickBy(state.comments[ownProps.comment.post_id], (value) => {
      return _.includes(ownProps.comment.children, value.comment_id);
    }),
    sentiments:
      ownProps.sentimentView &&
      state.sentiments[ownProps.comment.post_id] &&
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
