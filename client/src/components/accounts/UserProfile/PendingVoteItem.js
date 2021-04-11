import React, { useEffect, useState } from "react";
import { Card, Space, Row, Button, Col } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";

import api from "../../../apis/api";
import { fetchUser, likeSolution, removePendingVote } from "../../../actions";
import TimeAgo from "timeago-react";

const PendingVoteItem = ({
  vote,
  rep,
  likeSolution,
  fetchUser,
  removePendingVote,
}) => {
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    fetchUser(vote.rep_id);
    const fetchEntity = async (entityType, entityId) => {
      switch (entityType) {
        case "SOLUTION":
          const response = await api.get(`/solutions/post/${entityId}`);
          setEntity(response.data);
          break;
        default:
          break;
      }
    };

    fetchEntity(vote.entity, vote.entity_id);
  }, []);

  if (entity && rep) {
    return (
      <Card>
        <Row>
          <Space>
            <Col>
              {<Link to={`/user/${rep.user_id}`}>{rep.user_name}</Link>} voted
              on{" "}
              {
                <Link to={`/d/${entity.domain}/posts/${vote.entity_id}`}>
                  {vote.entity}: {entity.title}
                </Link>
              }{" "}
              <i>
                <TimeAgo datetime={vote.created_at} />
              </i>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  switch (vote.entity) {
                    case "SOLUTION":
                      likeSolution(entity.issue_id, vote.entity_id);
                      break;
                    default:
                      return;
                  }
                  removePendingVote(vote.entity, vote.entity_id);
                }}
              >
                <CheckSquareTwoTone twoToneColor="#549E37" />
                Approve
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  removePendingVote(vote.entity, vote.entity_id);
                }}
              >
                <CloseSquareTwoTone twoToneColor="#BA4D36" />
                Reject
              </Button>
            </Col>
          </Space>
        </Row>
      </Card>
    );
  } else {
    return <Card>Could not load content.</Card>;
  }
};

// solutions.issueId.solutionId
const mapStateToProps = (state, ownProps) => {
  return { rep: state.users[ownProps.vote.rep_id] };
};

export default connect(mapStateToProps, {
  fetchUser,
  likeSolution,
  removePendingVote,
})(PendingVoteItem);
