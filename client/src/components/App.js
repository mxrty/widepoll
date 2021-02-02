import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Col, Row } from "antd";

import history from "../history";
import PostCreate from "./posts/PostCreate";
import PostShow from "./posts/PostShow";
import PostFeed from "./posts/PostFeed";
import AdminPanel from "./AdminPanel";
import Showcase from "./Showcase";
import DomainCreate from "./domains/DomainCreate";
import DomainEdit from "./domains/DomainEdit";
import RecentPosts from "./posts/RecentPosts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 9001,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Logo
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white" }}>
              Register
            </Link>
          </div>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row>
            <Col span={18}>
              <Switch>
                <Route path="/" exact component={PostFeed} />
                <Route path="/admin" exact component={AdminPanel} />
                <Route path="/showcase" exact component={Showcase} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/d/new" exact component={DomainCreate} />
                <Route path="/d/:domain" exact component={PostFeed} />
                <Route path="/d/:domain/edit" exact component={DomainEdit} />
                <Route
                  path="/d/:domain/posts/new"
                  exact
                  component={PostCreate}
                />
                <Route
                  path="/d/:domain/posts/:postId"
                  exact
                  component={PostShow}
                />
              </Switch>
            </Col>
            <Col span={6}>
              <RecentPosts />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          widepoll ©2021 created by @mxrty
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
