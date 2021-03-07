import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Layout, Col, Row } from "antd";

import history from "../history";
import PostCreate from "./posts/PostCreate";
import PostShow from "./posts/PostShow";
import Home from "./app/Home";
import AdminPanel from "./AdminPanel";
import Showcase from "./Showcase";
import DomainCreate from "./domains/DomainCreate";
import DomainEdit from "./domains/DomainEdit";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SideMenu from "./layout/SideMenu";
import DomainHome from "./domains/DomainHome";
import Search from "./app/Search";
import Explore from "./app/Explore";
import PollCreate from "./polls/PollCreate";
import Settings from "./app/Settings";
import SolutionCreate from "./solutions/SolutionCreate";

const { Content } = Layout;

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row>
            <Col span={3} style={{ padding: "5px" }}>
              <SideMenu />
            </Col>
            <Col span={21} style={{ padding: "5px" }}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin" exact component={AdminPanel} />
                <Route path="/showcase" exact component={Showcase} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />

                <Route path="/search" exact component={Search} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/poll" exact component={PollCreate} />
                <Route path="/settings" exact component={Settings} />

                <Route path="/d/new" exact component={DomainCreate} />
                <Route path="/d/:domain" exact component={DomainHome} />
                <Route path="/d/:domain/edit" exact component={DomainEdit} />
                <Route
                  path="/d/:domain/posts/new"
                  exact
                  component={PostCreate}
                />
                <Route
                  path="/d/:domain/posts/:postId/solutions/new"
                  exact
                  component={SolutionCreate}
                />
                <Route
                  path="/d/:domain/posts/:postId"
                  exact
                  component={PostShow}
                />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
