import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { List, Button, Row, Col, Menu, Dropdown, Radio } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { fetchPosts } from "../../actions";
import PostFeedItem from "./PostFeedItem";

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
        renderItem={(post) => <PostFeedItem post={post} />}
      />
    );
  };

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
              <Radio.Button value="DISCUSSION">Discussions</Radio.Button>
              <Radio.Button value="ISSUE">Issues</Radio.Button>
            </Radio.Group>
          </div>
        </Col>
      </Row>
      <div>{renderList()}</div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.domainName) {
    return {
      posts: Object.values(state.posts),
    };
  } else {
    return {
      posts: Object.values(state.posts).filter(
        (post) => post.domain === ownProps.domainName
      ),
    };
  }
};

export default connect(mapStateToProps, { fetchPosts })(PostFeed);
