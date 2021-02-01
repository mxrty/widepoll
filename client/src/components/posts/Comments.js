import React from "react";

class Comments extends React.Component {
  render() {
    return <div>Comments for post: {this.props.postId} go here</div>;
  }
}

export default Comments;
