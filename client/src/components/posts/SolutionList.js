import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton, Button, Row, Col, Menu, Dropdown, Radio } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { fetchPosts } from "../../actions";

const SolutionList = ({ solutions }) => {
  const renderList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={solutions}
        bordered
        pagination={{
          pageSize: 10,
        }}
        renderItem={(solution) => (
          <Link to={`/d/${solution.domain}/posts/${solution.solution_id}`}>
            <List.Item>
              <List.Item.Meta
                avatar={<Skeleton.Image />}
                title={<div>{solution.title}</div>}
                description={solution.post_body}
              />
            </List.Item>
          </Link>
        )}
      />
    );
  };

  //<h2>{this.props.match.params.domain}</h2>

  return <div>{renderList()}</div>;
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
  };
};

export default SolutionList;
