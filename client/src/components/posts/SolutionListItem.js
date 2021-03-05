import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, Skeleton, Row, Col } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

const SolutionListItem = (props) => {
  const [likes, setLikes] = useState(
    props.solution.likes ? parseInt(props.solution.likes) : 0
  );
  const [action, setAction] = useState(null);

  const like = () => {
    if (action !== "liked") {
      setAction("liked");
      //props.likeComment(props.comment.comment_id, props.postId);
      setLikes(likes + 1);
    } else {
      setAction(null);
      //props.unlikeComment(props.comment.comment_id, props.postId);
      setLikes(likes - 1);
    }
  };

  return (
    <Row>
      <Col>
        <span onClick={like}>
          {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
          {likes}
        </span>
      </Col>
      <Col>
        <Link
          to={`/d/${props.solution.domain}/posts/${props.solution.solution_id}`}
        >
          <List.Item>
            <List.Item.Meta
              avatar={<Skeleton.Image />}
              title={<div>{props.solution.title}</div>}
              description={props.solution.post_body}
            />
          </List.Item>
        </Link>
      </Col>
    </Row>
  );
};

export default SolutionListItem;
