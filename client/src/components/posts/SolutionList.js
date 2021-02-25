import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton, Button, Row, Col, Menu, Dropdown, Radio } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import SolutionListItem from "./SolutionListItem";

import { fetchSolutions } from "../../actions";

const SolutionList = (props) => {
  useEffect(() => {
    props.fetchSolutions(props.postId);
  }, []);

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
    console.log(props.solutions);
    return (
      <List
        itemLayout="horizontal"
        dataSource={props.solutions}
        bordered
        pagination={{
          pageSize: 10,
        }}
        renderItem={(solution) => (
          <Link to={`/d/${solution.domain}/posts/${solution.solution_id}`}>
            <SolutionListItem solution={solution} />
          </Link>
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
  return {
    isSignedIn: state.auth.isSignedIn,
    solutions: state.posts[ownProps.postId].solutions,
  };
};

export default connect(mapStateToProps, { fetchSolutions })(SolutionList);
