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
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const { Content } = Layout;

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row>
            <Col span={3} style={{ padding: "5px" }}>
              <RecentPosts />
            </Col>
            <Col span={16} style={{ padding: "5px" }}>
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
            <Col span={5} style={{ padding: "5px" }}>
              <RecentPosts />
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
