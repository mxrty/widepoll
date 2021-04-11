import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../apis/api";
import { Card } from "antd";
import TimeAgo from "timeago-react";

const RecentActivity = ({ userId }) => {
  const [recentActivity, setRecentActivity] = useState(null);

  useEffect(() => {
    const fetchRecentActivity = async (id) => {
      const response = await api.get(`/users/activity/${id}`);
      setRecentActivity(response.data);
    };
    fetchRecentActivity(userId);
  }, []);

  if (recentActivity) {
    return recentActivity.map((activity) => {
      let cardContent = "";
      if (activity.activity_type === "NEW") {
        cardContent = <div>Created a new {activity.entity}</div>;
      } else if (activity.activity_type === "VOTE") {
        cardContent = <div>Upvoted a {activity.entity}</div>;
      } else if (activity.activity_type === "FOLLOW") {
        cardContent = (
          <div>
            Followed a new{" "}
            <a href={`/user/${activity.entity_id}`}>
              representative for {`/d/${activity.domain}`}
            </a>
          </div>
        );
      } else if (activity.activity_type === "NEW_SENTIMENT") {
        console.log(activity);
        cardContent = <div>Added a sentiment to a {activity.entity}</div>;
      }
      return (
        <Card
          key={`${activity.activity_type}-${activity.entity}-${activity.entity_id}`}
        >
          {cardContent}
          <i>
            <TimeAgo datetime={activity.activity_time} />
          </i>
        </Card>
      );
    });
  } else {
    return <div>No activity for this user.</div>;
  }
};

export default RecentActivity;
