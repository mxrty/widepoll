import React from "react";
import { connect } from "react-redux";

import { fetchPost } from "../../actions";
import Comments from "./Comments";

class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId);
  }

  renderPostBody() {
    if (this.props.post) {
      return <h5>{this.props.post.body}</h5>;
    }
  }

  render() {
    if (!this.props.post) return <div>Loading...</div>;
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        {this.renderPostBody()}
        <Comments postId={this.props.post.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.postId] };
};

export default connect(mapStateToProps, { fetchPost })(PostShow);
