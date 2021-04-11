import React, { useEffect } from "react";
import { connect } from "react-redux";

import PendingVoteItem from "./PendingVoteItem";
import { fetchPendingVotes } from "../../../actions";

const PendingVotes = (props) => {
  useEffect(() => {
    props.fetchPendingVotes();
  }, []);

  if (props.pendingVotes && props.pendingVotes.length > 0) {
    return props.pendingVotes.map((vote) => {
      return (
        <PendingVoteItem key={`${vote.entity}-${vote.entity_id}`} vote={vote} />
      );
    });
  } else {
    return <div>You have no votes to review.</div>;
  }
};

const mapStateToProps = (state, ownProps) => {
  return { pendingVotes: state.pendingVotes[ownProps.userId] };
};

export default connect(mapStateToProps, { fetchPendingVotes })(PendingVotes);
