import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "antd";

import { fetchPosts } from "../../actions";

class RecentPosts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (!this.props.posts) {
      return <div>No posts</div>;
    }
    return (
      <List
        size="small"
        header={<div>Recent Posts</div>}
        itemLayout="horizontal"
        dataSource={this.props.posts}
        bordered
        renderItem={(post) => (
          <Link to={`/d/${post.domain}/posts/${post.id}`}>
            <List.Item>
              <List.Item.Meta title={post.title} />
            </List.Item>
          </Link>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
  };
};

export default connect(mapStateToProps, { fetchPosts })(RecentPosts);
