import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Row, Space } from "antd";
import { CrownTwoTone } from "@ant-design/icons";

import DomainRepresentedItem from "./DomainRepresentedItem";
import { fetchUser } from "../../../actions";

const RepCard = (props) => {
  useEffect(() => {
    props.fetchUser(props.userId);
  }, []);

  if (props.user) {
    return (
      <Card
        title={
          <Space direction="horizontal">
            <CrownTwoTone twoToneColor="#FF9C15" /> <div>Representative</div>
          </Space>
        }
      >
        <Space direction="vertical">
          {props.user.domainsRepresented.map((domain) => {
            //followers for each domain
            const canFollow =
              props.user.user_id !== props.currentUserId &&
              !props.user.followers.includes(props.currentUserId) &&
              props.isSignedIn;

            return (
              <Row key={domain.domain}>
                <DomainRepresentedItem
                  userId={props.user.user_id}
                  domain={domain.domain}
                  disabled={!canFollow}
                />
              </Row>
            );
          })}
        </Space>
      </Card>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.userId],
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUser })(RepCard);
