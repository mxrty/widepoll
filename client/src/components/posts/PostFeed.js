import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  List,
  Skeleton,
  Button,
  Row,
  Col,
  Menu,
  Dropdown,
  Radio,
  Space,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { fetchPosts } from "../../actions";

class PostFeed extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleMenuClick = (e) => {
    this.setState({ sort: e.key });
  };

  constructor(props) {
    super(props);
    // TODO: store sort in redux so it is global
    this.state = { sort: "Trending" };
  }

  //   renderAdmin(stream) {
  //     if (stream.userId === this.props.currentUserId) {
  //       return (
  //         <div className="right floated content">
  //           <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
  //             Edit
  //           </Link>
  //           <Link
  //             to={`/streams/delete/${stream.id}`}
  //             className="ui button negative"
  //           >
  //             Delete
  //           </Link>
  //         </div>
  //       );
  //     }
  //   }

  renderCreate() {
    //if (this.props.isSignedIn) {
    return (
      <Link to={`/d/a/posts/new`}>
        <Button>Create Post</Button>
      </Link>
    );
    //}
  }

  renderList() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.posts}
        bordered
        pagination={{
          pageSize: 5,
        }}
        renderItem={(post) => (
          <Link to={`/d/${post.domain}/posts/${post.post_id}`}>
            <List.Item>
              <List.Item.Meta
                avatar={<Skeleton.Image />}
                title={post.title}
                description={post.body}
              />
            </List.Item>
          </Link>
        )}
      />
    );
  }

  render() {
    return (
      <>
        <h2>{this.props.match.params.domain}</h2>
        <Row>
          <Col span={12}>
            <div>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="Trending" icon={<UserOutlined />}>
                      Trending
                    </Menu.Item>
                    <Menu.Item key="Top" icon={<UserOutlined />}>
                      Top
                    </Menu.Item>
                    <Menu.Item key="New" icon={<UserOutlined />}>
                      New
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  {this.state.sort} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ float: "right" }}>
              <Radio.Group
                defaultValue="ALL"
                name="postType"
                buttonStyle="solid"
              >
                <Radio.Button value="ALL">All</Radio.Button>
                <Radio.Button value="DISCUSSION">Discussion</Radio.Button>
                <Radio.Button value="ISSUE">Issue</Radio.Button>
                <Radio.Button value="SOLUTION">Solution</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <div>{this.renderList()}</div>
        {this.renderCreate()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
    // currentUserId: state.auth.userId,
    // isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchPosts })(PostFeed);
