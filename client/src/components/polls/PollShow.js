import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Radio } from "antd";

import { fetchPoll, votePoll } from "../../actions";

const PollShow = (props) => {
  useEffect(() => {
    props.fetchPoll(props.match.params.pollId);
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const renderOptions = () => {
    return props.poll.options.map((option) => {
      return (
        <Radio
          style={{
            display: "block",
            height: "30px",
            lineHeight: "30px",
          }}
          value={option.option_id}
        >
          {option.body}
        </Radio>
      );
    });
  };

  if (props.poll) {
    return (
      <>
        <h1>{props.poll.title}</h1>
        <Radio.Group
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
          value={selectedOption}
        >
          {renderOptions()}
        </Radio.Group>
        <br />
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            props.votePoll(selectedOption, props.poll.poll_id);
          }}
        >
          Submit answer
        </Button>
      </>
    );
  }
  return null;
};
const mapStateToProps = (state, ownProps) => {
  return { poll: state.polls[ownProps.match.params.pollId] };
};

export default connect(mapStateToProps, { fetchPoll, votePoll })(PollShow);
