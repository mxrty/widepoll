import React from "react";
import { List, Skeleton } from "antd";

const SolutionListItem = ({ title, post_body }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Skeleton.Image />}
        title={<div>{title}</div>}
        description={post_body}
      />
    </List.Item>
  );
};

export default SolutionListItem;
