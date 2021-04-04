import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Button } from "antd";

import SolutionListItem from "./SolutionListItem";

import { fetchSolutions } from "../../actions";

const SolutionList = (props) => {
  useEffect(() => {
    props.fetchSolutions(props.postId);
  });

  // Use above until fix async likes fetch
  // useEffect(() => {
  //   props.fetchSolutions(props.postId);
  // },[]);

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <Link to={`/d/${props.domain}/posts/${props.postId}/solutions/new`}>
          <Button>Create a Solution</Button>
        </Link>
      );
    }
  };

  const renderList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={props.solutions}
        bordered
        pagination={{
          pageSize: 10,
        }}
        renderItem={(solution) => (
          <SolutionListItem solution={solution} key={solution.solution_id} />
        )}
      />
    );
  };

  return (
    <>
      {renderCreate()}
      {renderList()}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const newProps = { isSignedIn: state.auth.isSignedIn };
  if (state.solutions[ownProps.postId])
    newProps.solutions = Object.values(state.solutions[ownProps.postId]);
  return newProps;
};

export default connect(mapStateToProps, { fetchSolutions })(SolutionList);
