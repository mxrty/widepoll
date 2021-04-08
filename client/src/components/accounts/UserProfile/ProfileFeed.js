import React from "react";
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
          <RecentActivity />
        </TabPane>
        <TabPane tab="Following" key="2">
          <Following userId={props.userId} />
        </TabPane>
        <TabPane tab="Pending votes" key="3">
          <PendingVotes />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ProfileFeed;
