import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { List, Skeleton, Row, Col } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { likePost, unlikePost } from "../../actions";
import TimeAgo from "timeago-react";

import "../../styles/webkitStyles.css";

const PostFeedItem = (props) => {
  const [action, setAction] = useState(null);

  const like = () => {
    if (action !== "liked") {
      setAction("liked");
      props.likePost(props.post.post_id);
    } else {
      setAction(null);
      props.unlikePost(props.post.post_id);
    }
  };

  return (
    <Row>
      <Col
        flex="40px"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span onClick={like}>
          {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
          {props.likes ? props.likes : 0}
        </span>
      </Col>
      <Col flex="auto">
        <Link to={`/d/${props.post.domain}/posts/${props.post.post_id}`}>
          <List.Item>
            <List.Item.Meta
              avatar={<Skeleton.Image />}
              title={
                <div className="limit-text-2">
                  {props.post.post_type}: {props.post.title}
                </div>
              }
              description={
                <div className="limit-text-2">{props.post.post_body}</div>
              }
            />
            <TimeAgo datetime={props.post.created_at} />
          </List.Item>
        </Link>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    likes: state.posts[ownProps.post.post_id].likes,
  };
};

export default connect(mapStateToProps, { likePost, unlikePost })(PostFeedItem);
