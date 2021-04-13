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

import PollCreate from "./polls/PollCreate";
import Settings from "./app/Settings";
import SolutionCreate from "./solutions/SolutionCreate";
import PollShow from "./polls/PollShow";
import PollResults from "./polls/PollResults";
import UserProfile from "./accounts/UserProfile";
import DomainList from "./domains/DomainList";
import SolutionShow from "./solutions/SolutionShow";

const { Content } = Layout;

const App = () => {
  return (
    <Router history={history}>
      <Layout style={{ minHeight: "100%", position: "relative" }}>
        <Header />
        <Content
          style={{
            padding: "0 50px",
            marginTop: 64,
            width: "100%",
            paddingBottom: "60px",
            height: "100%",
          }}
        >
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
                <Route path="/user/:userId" exact component={UserProfile} />

                <Route path="/search" exact component={Search} />
                <Route path="/explore" exact component={DomainList} />
                <Route path="/settings" exact component={Settings} />

                <Route path="/polls/new" exact component={PollCreate} />
                <Route path="/polls/:pollId" exact component={PollShow} />
                <Route
                  path="/polls/:pollId/results"
                  exact
                  component={PollResults}
                />

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
                <Route
                  path="/d/:domain/posts/:postId/solution/:solutionId"
                  exact
                  component={SolutionShow}
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
