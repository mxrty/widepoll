import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton, Button, Row, Col, Menu, Dropdown, Radio } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { fetchPosts } from "../../actions";

const PostFeed = (props) => {
  useEffect(() => {
    props.fetchPosts();
  }, []);
  const [sort, setSort] = useState("Trending");

  const handleMenuClick = (e) => {
    setSort(e.key);
  };

  const renderList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={props.posts}
        bordered
        pagination={{
          pageSize: 10,
        }}
        renderItem={(post) => (
          <Link to={`/d/${post.domain}/posts/${post.post_id}`}>
            <List.Item>
              <List.Item.Meta
                avatar={<Skeleton.Image />}
                title={
                  <div>
                    {post.post_type}: {post.title}
                  </div>
                }
                description={post.post_body}
              />
            </List.Item>
          </Link>
        )}
      />
    );
  };

  //<h2>{this.props.match.params.domain}</h2>

  return (
    <>
      <Row>
        <Col span={12}>
          <div>
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClick}>
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
                {sort} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ float: "right" }}>
            <Radio.Group defaultValue="ALL" name="postType" buttonStyle="solid">
              <Radio.Button value="ALL">All</Radio.Button>
              <Radio.Button value="DISCUSSION">Discussion</Radio.Button>
              <Radio.Button value="ISSUE">Issue</Radio.Button>
              <Radio.Button value="SOLUTION">Solution</Radio.Button>
            </Radio.Group>
          </div>
        </Col>
      </Row>
      <div>{renderList()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
  };
};

export default connect(mapStateToProps, { fetchPosts })(PostFeed);
