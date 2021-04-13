import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "antd";
import TimeAgo from "timeago-react";

import { fetchSolution } from "../../actions";
import DomainBlurb from "../domains/DomainBlurb";

const SolutionShow = (props) => {
  useEffect(() => {
    props.fetchSolution(props.match.params.solutionId);
  }, []);

  const renderPostBody = () => {
    if (props.solution) {
      return (
        <>
          <Card type="inner">
            <h2>{props.solution.title}</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {props.solution.post_body.replace(/↵/g, "<br/>")}
            </p>
            <i>
              submitted by {props.solution.author_name}{" "}
              <TimeAgo
                key="solution-created-at"
                datetime={props.solution.created_at}
              />
            </i>
          </Card>
        </>
      );
    }
  };

  if (!props.solution) return <div>Loading...</div>;
  return (
    <Row>
      <Col span={14} style={{ padding: "5px" }}>
        {renderPostBody()}
      </Col>
      <Col span={6} style={{ padding: "5px" }}>
        <DomainBlurb domainName={props.solution.domain} />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    solution: state.solutions[ownProps.match.params.postId]
      ? state.solutions[ownProps.match.params.postId][
          ownProps.match.params.solutionId
        ]
      : null,
  };
};

export default connect(mapStateToProps, { fetchSolution })(SolutionShow);
