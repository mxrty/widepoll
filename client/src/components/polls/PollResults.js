import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPoll } from "../../actions";
import { Pie } from "react-chartjs-2";

const PollResults = (props) => {
  useEffect(() => {
    props.fetchPoll(props.match.params.pollId);
  }, []);

  if (props.poll) {
    return (
      <Pie
        data={{
          labels: props.poll.options.map((option) => option.body),
          datasets: [
            {
              label: "Votes",
              data: props.poll.options.map((option) => option.votes),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: props.poll.title,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    );
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  return { poll: state.polls[ownProps.match.params.pollId] };
};

export default connect(mapStateToProps, { fetchPoll })(PollResults);
