import React, { useEffect } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { Card, Tabs } from "antd";
import { fetchComments, fetchSentiments } from "../../actions";

import _ from "lodash";
import CommentCreate from "./CommentCreate";

const { TabPane } = Tabs;

const PostComments = (props) => {
  useEffect(() => {
    props.fetchComments(props.postId);
    props.fetchSentiments(props.postId);
  }, []);

  const renderComments = () => {
    if (props.comments) {
      return Object.entries(props.comments).map(([key, value]) => {
        return <Comment postId={props.postId} comment={value} key={key} />;
      });
    }
    return <h6>There are no comments for this post. Be the first one!</h6>;
  };

  const renderSentiments = () => {
    if (props.comments && props.hasSentiments) {
      return Object.entries(props.comments).map(([key, value]) => {
        return (
          <Comment
            postId={props.postId}
            comment={value}
            key={key}
            sentimentView
          />
        );
      });
    }
    return (
      <h6>
        There are no sentiments for this post. Click the comments tab and add a
        sentiment to be the first one!
      </h6>
    );
  };

  return (
    <Card style={{ marginTop: "5px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Comments" key="1">
          <CommentCreate postId={props.postId} commentType="ROOT" />
          {renderComments()}
        </TabPane>
        <TabPane tab="Sentiments" disabled={!props.hasSentiments} key="2">
          {renderSentiments()}
        </TabPane>
      </Tabs>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    comments: _.pickBy(state.comments[ownProps.postId], (value) => {
      return value.comment_type === "ROOT";
    }),
    hasSentiments: state.sentiments[ownProps.postId] ? true : false,
  };
};

export default connect(mapStateToProps, { fetchComments, fetchSentiments })(
  PostComments
);
