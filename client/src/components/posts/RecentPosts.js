import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "antd";

import { fetchLatestPosts } from "../../actions";

const RecentPosts = (props) => {
  useEffect(() => {
    props.fetchLatestPosts(10);
  }, []);

  if (!props.posts) {
    return <div>No posts</div>;
  }
  return (
    <List
      size="small"
      header={<div>Recent Posts</div>}
      itemLayout="horizontal"
      dataSource={props.posts}
      bordered
      renderItem={(post) => (
        <Link to={`/d/${post.domain}/posts/${post.post_id}`}>
          <List.Item>
            <List.Item.Meta title={post.title} />
          </List.Item>
        </Link>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
  };
};

export default connect(mapStateToProps, { fetchLatestPosts })(RecentPosts);
