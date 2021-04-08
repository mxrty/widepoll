import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../actions";
import {
  Avatar,
  Skeleton,
  Row,
  Col,
  Card,
  Button,
  Space,
  Tabs,
  Radio,
  Tooltip,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import DomainRepresentedItem from "./DomainRepresentedItem";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import _ from "lodash";

const UserProfile = (props) => {
  const [repRanking, setRepRanking] = useState({});

  useEffect(() => {
    props.fetchUser(props.match.params.userId);
  }, []);

  useEffect(() => {
    if (props.user) {
      setRepRanking(props.user.following);
    }
  }, [props.user]);

  const renderFollowers = () => {
    if (props.user.followers.length > 0)
      return (
        <>
          <h3>Followers</h3>
          {props.user.followers.map((follower) => {
            return <div key={follower.follower_id}>{follower.user_name}</div>;
          })}
        </>
      );
  };

  const renderUpdateRankingButton = () => {
    if (!_.isEqual(props.user.following, repRanking)) {
      return <Button>Update</Button>;
    }
  };

  const { TabPane } = Tabs;

  const onDragEnd = (result) => {
    if (!result) return;
    if (!result.destination) return;

    const domain = result.destination.droppableId;
    const from = result.source.index;
    const to = result.destination.index;

    // Clone current ranking
    const newRepRanking = _.cloneDeep(repRanking);

    const items = newRepRanking[domain];

    // Swap ranking
    const rankFrom = items[from].rank;
    const rankTo = items[to].rank;
    items[from].rank = rankTo;
    items[to].rank = rankFrom;

    // Sort by rank
    items.sort((a, b) => {
      return a.rank - b.rank;
    });

    newRepRanking[domain] = items;

    setRepRanking(newRepRanking);
  };

  const renderFollowing = () => {
    if (_.size(props.user.following) > 0)
      if (props.user.user_id !== props.currentUserId) {
        return (
          <Card title="Following">
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              style={{ maxHeight: 300 }}
            >
              {Object.keys(repRanking).map((domain) => (
                <TabPane tab={`/d/${domain}`} key={domain}>
                  <div>
                    {repRanking[domain].map((rep, index) => {
                      return (
                        <div>
                          <Card>
                            {rep.rank + 1} : {rep.user_name}
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        );
      } else {
        return (
          <Card title="Following">
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              style={{ maxHeight: 300 }}
            >
              {Object.keys(repRanking).map((domain) => (
                <TabPane tab={`/d/${domain}`} key={domain}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={domain}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {repRanking[domain].map((rep, index) => (
                            <Draggable
                              key={rep.rep_id}
                              draggableId={`${rep.rep_id}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card>
                                    <Row>
                                      <Space>
                                        <Col>
                                          {rep.rank + 1} : {rep.user_name}
                                        </Col>
                                        <Col>
                                          <Radio.Group
                                            value={rep.opt_in}
                                            name={rep.domain}
                                            onChange={(e) => {
                                              // Clone current ranking
                                              const newRepRanking = _.cloneDeep(
                                                repRanking
                                              );

                                              let currentRep = newRepRanking[
                                                rep.domain
                                              ].find(
                                                (f) => f.rep_id === rep.rep_id
                                              );

                                              currentRep.opt_in =
                                                e.target.value;
                                              setRepRanking(newRepRanking);
                                            }}
                                            buttonStyle="solid"
                                          >
                                            <Tooltip title="The representative will vote on your behalf">
                                              <Radio.Button value={true}>
                                                Auto
                                              </Radio.Button>
                                            </Tooltip>
                                            <Tooltip title="The representative's votes will be queued, and can be approved or rejected later">
                                              <Radio.Button value={false}>
                                                Manual
                                              </Radio.Button>
                                            </Tooltip>
                                          </Radio.Group>
                                        </Col>
                                      </Space>
                                    </Row>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </TabPane>
              ))}
            </Tabs>
            {renderUpdateRankingButton()}
          </Card>
        );
      }
  };

  const renderDomainsRepresented = () => {
    return (
      <>
        <h3>Domains represented</h3>
        {props.user.domainsRepresented.map((domain) => {
          //followers for each domain
          const canFollow =
            props.user.user_id !== props.currentUserId &&
            !props.user.followers.includes(props.currentUserId);

          return (
            <DomainRepresentedItem
              userId={props.user.user_id}
              domain={domain.domain}
              disabled={!canFollow}
            />
          );
        })}
      </>
    );
  };

  const renderRepSection = () => {
    if (props.user.isRep) {
      return (
        <Card title={`${props.user.user_name} is a representative`}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {renderDomainsRepresented()}
            {renderFollowers()}
          </Space>
        </Card>
      );
    }
  };

  if (props.user) {
    return (
      <div>
        <h1>{props.user.user_name}'s profile</h1>
        <Row>
          <Col flex="80px">
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <Skeleton />
          </Col>
        </Row>
        {renderFollowing()}
        {renderRepSection()}
        <ul>
          <li>Recent Votes/Activity</li>
        </ul>
      </div>
    );
  }
  return <div data-testid="default">No user for this id.</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.userId],
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUser })(UserProfile);
