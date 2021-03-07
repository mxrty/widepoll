import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { List, Skeleton, Row, Col } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { likeSolution, unlikeSolution } from "../../actions";

const SolutionListItem = (props) => {
  const [action, setAction] = useState(null);

  const like = () => {
    if (action !== "liked") {
      setAction("liked");
      props.likeSolution(props.solution.issue_id, props.solution.solution_id);
    } else {
      setAction(null);
      props.unlikeSolution(props.solution.issue_id, props.solution.solution_id);
    }
  };

  return (
    <Row>
      <Col>
        <span onClick={like}>
          {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
          {props.likes ? props.likes : 0}
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

const mapStateToProps = (state, ownProps) => {
  return {
    likes:
      state.solutions[ownProps.solution.issue_id][ownProps.solution.solution_id]
        .likes,
  };
};

export default connect(mapStateToProps, { likeSolution, unlikeSolution })(
  SolutionListItem
);
