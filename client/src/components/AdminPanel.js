import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import _ from "lodash";

import { fetchPosts, deletePost } from "../actions";

class AdminPanel extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <h1>Admin Panel</h1>
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Body",
              dataIndex: "body",
              key: "body",
            },
            {
              title: "Domain",
              dataIndex: "domain",
              key: "domain",
            },
            {
              title: "Post Type",
              dataIndex: "postType",
              key: "postType",
            },
            {
              title: "Action",
              key: "action",
              render: (post) => (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    this.props.deletePost(post.post_id);
                  }}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          dataSource={_.map(this.props.posts, (post) => {
            return { ...post, key: post.post_id };
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
  };
};

export default connect(mapStateToProps, { fetchPosts, deletePost })(AdminPanel);
