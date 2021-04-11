import React from "react";
import { connect } from "react-redux";
import { Card, Tabs } from "antd";

import RecentActivity from "./RecentActivity";
import Following from "./Following";
import PendingVotes from "./PendingVotes";

const { TabPane } = Tabs;

const ProfileFeed = (props) => {
  return (
    <Card style={{ marginTop: "5px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Recent activity" key="1">
          <RecentActivity userId={props.userId} />
        </TabPane>
        <TabPane tab="Following" key="2">
          <Following userId={props.userId} />
        </TabPane>
        {props.userId === props.currentUserId ? (
          <TabPane tab="Pending votes" key="3">
            <PendingVotes userId={props.userId} />
          </TabPane>
        ) : null}
      </Tabs>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(ProfileFeed);
