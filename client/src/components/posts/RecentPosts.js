import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "antd";
import TimeAgo from "timeago-react";

import { fetchLatestPosts } from "../../actions";

const RecentPosts = (props) => {
  useEffect(() => {
    props.fetchLatestPosts(10);
  }, []);

  const formatText = (title, created_at) => {
    return (
      <>
        {title} <TimeAgo datetime={created_at} />
      </>
    );
  };

  if (!props.posts) {
    return <div>No posts</div>;
  }
  return (
    <List
      size="small"
      header={<strong>Recent Posts</strong>}
      itemLayout="horizontal"
      dataSource={props.posts}
      bordered
      renderItem={(post) => (
        <Link to={`/d/${post.domain}/posts/${post.post_id}`}>
          <List.Item>{formatText(post.title, post.created_at)}</List.Item>
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
