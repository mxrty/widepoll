import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "antd";

import { fetchPost } from "../../actions";
import PostComments from "./PostComments";
import DomainBlurb from "../domains/DomainBlurb";

class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId);
  }

  renderPostBody() {
    if (this.props.post) {
      return (
        <Card type="inner" title={this.props.post.title}>
          <p>{this.props.post.post_body}</p>
        </Card>
      );
    }
  }

  render() {
    if (!this.props.post) return <div>Loading...</div>;
    return (
      <Row>
        <Col span={18} style={{ padding: "5px" }}>
          {this.renderPostBody()}
          <PostComments postId={this.props.post.post_id} />
        </Col>
        <Col span={6} style={{ padding: "5px" }}>
          <DomainBlurb />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.postId] };
};

export default connect(mapStateToProps, { fetchPost })(PostShow);
