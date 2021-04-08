import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Row, Col, Card, Button, Space, Tabs, Radio, Tooltip } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { fetchUser } from "../../../actions";

const { TabPane } = Tabs;

const Following = (props) => {
  const [repRanking, setRepRanking] = useState({});

  useEffect(() => {
    props.fetchUser(props.userId);
  }, []);

  useEffect(() => {
    if (props.user) {
      setRepRanking(props.user.following);
    }
  }, [props.user]);

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

  const renderUpdateRankingButton = () => {
    if (!_.isEqual(props.user.following, repRanking)) {
      return <Button>Update</Button>;
    }
  };

  if (_.size(props.user.following) > 0) {
    if (props.user.user_id !== props.currentUserId) {
      return (
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
      );
    } else {
      return (
        <>
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
                      <div {...provided.droppableProps} ref={provided.innerRef}>
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

                                            currentRep.opt_in = e.target.value;
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
        </>
      );
    }
  } else {
    return <div>No representatives followed.</div>;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.userId],
    currentUserId: state.auth.user_id,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUser })(Following);
